/* global ort, createPiperPhonemize, importScripts, ArabicVoice */
// عامل النطق داخل الجهاز (بايبر): نص ← رموز أصوات (eSpeak) ← شبكة عصبية (onnxruntime) ← WAV.
// العربية تُشكَّل أولًا (libtashkeel)، ولها صوتان: «كريم» من بايبر، و«نبرة» (Kokoro، 24 كيلوهرتز) إن نُزّل.
// عامل كلاسيكي يُنسخ كما هو عند البناء (scripts/copy-tts.mjs)؛ الملفات تُخدم بلا سياسة أمان للصفحة،
// فيُسمح فيه بتشغيل WebAssembly. الأصوات من ‎/voices/‎ في البوابة، وعامل الخدمة يخزّنها بعد أول تنزيل.
const BASE = new URL('./', self.location.href).href;
importScripts(BASE + 'ort.wasm.min.js', BASE + 'piper_phonemize.js', BASE + 'tts-arabic.js');
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

// رموز eSpeak للنص: phoneme_ids لبايبر، وphonemes (IPA) لـ«نبرة».
function phonemize(text, espeakVoice) {
  return new Promise((resolve, reject) => {
    createPiperPhonemize({
      print: (line) => resolve(JSON.parse(line)),
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

// التشكيل: نموذج صغير (نحو ٥ ميغابايت) يُحمَّل عند أول نطق عربي. أي فشل يعيد النص كما هو فلا يتوقف النطق.
let tashkeel = null;
async function diacritize(text) {
  try {
    tashkeel ??= ort.InferenceSession.create(await fetchModel(voiceUrl('libtashkeel', '.onnx'), () => {}), { executionProviders: ['wasm'] });
    const session = await tashkeel;
    const { charIds, hintIds } = ArabicVoice.prepareTashkeel(text);
    if (!charIds.length) return text;
    const tensor = (values) => new ort.Tensor('int64', BigInt64Array.from(values.map(BigInt)), [1, values.length]);
    const { predictions } = await session.run({
      char_inputs: tensor(charIds),
      diac_inputs: tensor(hintIds),
      input_lengths: new ort.Tensor('int64', BigInt64Array.from([BigInt(charIds.length)]), [1]),
    });
    return ArabicVoice.applyTashkeel(text, predictions.data);
  } catch {
    tashkeel = null;
    return text;
  }
}

// «نبرة»: النموذج (83 ميغابايت، int8) ومتجهات الأسلوب من ‎/voices/‎، والصوت بقطع لا تتجاوز حد النموذج.
const NABRA_RATE = 24000;
const NABRA_GAP = Math.round(NABRA_RATE * 0.15);
let nabra = null;
async function nabraVoice(report) {
  nabra ??= (async () => {
    const model = await fetchModel(voiceUrl('nabra-82m.int8', '.onnx'), report);
    const voices = new Float32Array(await (await fetch(voiceUrl('nabra-voices', '.bin'))).arrayBuffer());
    const session = await ort.InferenceSession.create(model, { executionProviders: ['wasm'] });
    return { session, voices };
  })().catch((e) => {
    nabra = null;
    throw e;
  });
  return nabra;
}

async function speakNabra(text, rate, report) {
  const { session, voices } = await nabraVoice(report);
  const { phonemes = [] } = await phonemize(text, 'ar');
  const parts = [];
  for (const chunk of ArabicVoice.nabraChunks(phonemes.join(''))) {
    const { ids, style } = ArabicVoice.nabraInput(chunk, voices);
    const { audio } = await session.run({
      input_ids: new ort.Tensor('int64', BigInt64Array.from(ids.map(BigInt)), [1, ids.length]),
      ref_s: new ort.Tensor('float32', Float32Array.from(style), [1, style.length]),
      speed: new ort.Tensor('float32', Float32Array.from([rate || 1]), [1]),
    });
    if (parts.length) parts.push(new Float32Array(NABRA_GAP));
    parts.push(audio.data);
  }
  const samples = new Float32Array(parts.reduce((n, p) => n + p.length, 0));
  parts.reduce((offset, p) => (samples.set(p, offset), offset + p.length), 0);
  return wav(samples, NABRA_RATE);
}

async function speak({ text, language, rate, voice: choice }, report) {
  const spoken = language === 'ar' ? await diacritize(text.trim()) : text.trim();
  if (language === 'ar' && choice === 'nabra') return speakNabra(spoken, rate, report);
  const { config, session } = await voice(language, report);
  const ids = (await phonemize(spoken, config.espeak.voice)).phoneme_ids;
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
      await (data.voice === 'nabra' ? nabraVoice(report) : voice(data.language, report));
      self.postMessage({ id, type: 'done' });
      return;
    }
    const audio = await speak(data, report);
    self.postMessage({ id, type: 'done', audio }, [audio]);
  } catch (e) {
    self.postMessage({ id, type: 'error', message: String(e?.message || e) });
  }
};
