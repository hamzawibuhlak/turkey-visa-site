/* global ort, createPiperPhonemize, importScripts */
// عامل النطق داخل الجهاز (بايبر): نص ← رموز أصوات (eSpeak) ← شبكة عصبية (onnxruntime) ← WAV.
// عامل كلاسيكي يُنسخ كما هو عند البناء (scripts/copy-tts.mjs)؛ الملفات تُخدم بلا سياسة أمان للصفحة،
// فيُسمح فيه بتشغيل WebAssembly. الأصوات من ‎/voices/‎ في البوابة، وعامل الخدمة يخزّنها بعد أول تنزيل.
const BASE = new URL('./', self.location.href).href;
importScripts(BASE + 'ort.wasm.min.js', BASE + 'piper_phonemize.js');
ort.env.wasm.numThreads = 1;
ort.env.wasm.wasmPaths = BASE;

const VOICES = { ar: 'ar_JO-kareem-medium', tr: 'tr_TR-dfki-medium', en: 'en_US-lessac-medium' };
const voiceUrl = (name, ext) => new URL(`../voices/${name}${ext}`, BASE).href;
const loaded = {};

async function fetchModel(url, report) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('voice-unavailable');
  const total = Number(response.headers.get('Content-Length')) || 0;
  if (!response.body || !total) return new Uint8Array(await response.arrayBuffer());
  const reader = response.body.getReader();
  const data = new Uint8Array(total);
  let offset = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    data.set(value, offset);
    offset += value.length;
    report(offset / total);
  }
  return data;
}

async function voice(language, report) {
  if (loaded[language]) return loaded[language];
  const name = VOICES[language];
  if (!name) throw new Error('language-unavailable');
  const config = await (await fetch(voiceUrl(name, '.onnx.json'))).json();
  const model = await fetchModel(voiceUrl(name, '.onnx'), report);
  const session = await ort.InferenceSession.create(model, { executionProviders: ['wasm'] });
  loaded[language] = { config, session };
  return loaded[language];
}

function phonemeIds(text, espeakVoice) {
  return new Promise((resolve, reject) => {
    createPiperPhonemize({
      print: (line) => resolve(JSON.parse(line).phoneme_ids),
      printErr: (message) => reject(new Error(message)),
      locateFile: (file) => BASE + file,
    })
      .then((module) => module.callMain(['-l', espeakVoice, '--input', JSON.stringify([{ text }]), '--espeak_data', '/espeak-ng-data']))
      .catch(reject);
  });
}

function wav(samples, rate) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const text = (offset, value) => [...value].forEach((c, i) => view.setUint8(offset + i, c.charCodeAt(0)));
  text(0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  text(8, 'WAVE');
  text(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, rate, true);
  view.setUint32(28, rate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  text(36, 'data');
  view.setUint32(40, samples.length * 2, true);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}

async function speak({ text, language, rate }, report) {
  const { config, session } = await voice(language, report);
  const ids = await phonemeIds(text.trim(), config.espeak.voice);
  const { noise_scale: noise, length_scale: length, noise_w: noiseW } = config.inference;
  const feeds = {
    input: new ort.Tensor('int64', BigInt64Array.from(ids.map(BigInt)), [1, ids.length]),
    input_lengths: new ort.Tensor('int64', BigInt64Array.from([BigInt(ids.length)]), [1]),
    scales: new ort.Tensor('float32', Float32Array.from([noise, length / (rate || 1), noiseW]), [3]),
  };
  if (config.num_speakers > 1) feeds.sid = new ort.Tensor('int64', BigInt64Array.from([0n]), [1]);
  const { output } = await session.run(feeds);
  return wav(output.data, config.audio.sample_rate);
}

self.onmessage = async ({ data }) => {
  const { id, type } = data;
  const report = (progress) => self.postMessage({ id, type: 'progress', progress });
  try {
    if (type === 'prepare') {
      await voice(data.language, report);
      self.postMessage({ id, type: 'done' });
      return;
    }
    const audio = await speak(data, report);
    self.postMessage({ id, type: 'done', audio }, [audio]);
  } catch (e) {
    self.postMessage({ id, type: 'error', message: String(e?.message || e) });
  }
};
