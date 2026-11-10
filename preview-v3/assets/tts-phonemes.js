/* global createPiperPhonemize, importScripts */
// عامل صغير يعطي رموز النطق (IPA) لجملة إنجليزية من محلل eSpeak نفسه الذي يستعمله عامل النطق، لتُكتب بحروف
// عربية (src/en-pronounce.js). منفصل عن tts-worker.js كي لا تتغير بصمته فيُعاد تنزيل المحرك على الأجهزة،
// ويُحفظ مع ملفات التطبيق. محلل eSpeak يأتي من ذاكرة المحرك، فلا يعمل إلا بعد تنزيل أصوات الجهاز.
const BASE = new URL('./', self.location.href).href;
importScripts(BASE + 'piper_phonemize.js');

const VOICE = { en: 'en-us' };

function phonemes(text, language) {
  return new Promise((resolve, reject) => {
    createPiperPhonemize({
      print: (line) => resolve((JSON.parse(line).phonemes ?? []).join('')),
      printErr: (message) => reject(new Error(message)),
      locateFile: (file) => BASE + file,
    })
      .then((module) =>
        module.callMain([
          '-l',
          VOICE[language],
          '--input',
          JSON.stringify([{ text }]),
          '--espeak_data',
          '/espeak-ng-data',
        ]),
      )
      .catch(reject);
  });
}

self.onmessage = async ({ data }) => {
  const { id, text, language } = data;
  try {
    if (!VOICE[language]) throw new Error('language-unavailable');
    self.postMessage({ id, type: 'done', phonemes: await phonemes(String(text).trim(), language) });
  } catch (e) {
    self.postMessage({ id, type: 'error', message: String(e?.message || e) });
  }
};
