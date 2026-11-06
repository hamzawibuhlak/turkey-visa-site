// الصوت العربي على الجهاز: تشكيل النص قبل النطق (libtashkeel، رخصة MIT، Musharraf Omer) لأن eSpeak يخطئ قراءة
// العربية دون حركات، ورموز صوت «نبرة» (Nabra-82M، رخصة Apache-2.0، على بنية Kokoro). دوال نقية بلا شبكة ولا نموذج:
// عامل النطق يشغّل النموذجين، وهنا تحضير المدخلات وقراءة المخرجات. سكربت كلاسيكي يُنسخ إلى assets/tts-arabic.js
// ويحمّله tts-worker.js بـ importScripts، والاختبارات تشغّله في سياق معزول.
(function (root) {
  // خرائط libtashkeel كما في libtashkeel.maps.json: رقم الحرف موضعه في السلسلة.
  const TASHKEEL_INPUT = '_ #!"()-./:[]«»،؛؟ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىي';
  const TASHKEEL_HINTS = ['_', '', 'ً', 'ٌ', 'ٍ', 'َ', 'ُ', 'ِ', 'ًّ', 'ٌّ', 'ٍّ', 'َّ', 'ُّ', 'ِّ', 'ْ', 'ّ'];
  const TASHKEEL_TARGETS = ['_', '', 'ً', 'ٌ', 'ٍ', 'َ', 'ُ', 'ِ', 'ًّ', 'ٌّ', 'ٍّ', 'َّ', 'ُّ', 'ِّ', 'ْ'];
  const DIACRITICS = new Set(['\u064b', '\u064c', '\u064d', '\u064e', '\u064f', '\u0650', '\u0651', '\u0652']);
  const NUMERAL = /[0-9\u0660-\u0669]/;
  // رموز «نبرة» من tokens.txt (eSpeak IPA، ومعها ʕ وħ للعربية).
  const NABRA_TOKENS = {
    ';': 1,
    ':': 2,
    ',': 3,
    '.': 4,
    '!': 5,
    '?': 6,
    '—': 9,
    '…': 10,
    '"': 11,
    '(': 12,
    ')': 13,
    '“': 14,
    '”': 15,
    ' ': 16,
    '̃': 17,
    ʣ: 18,
    ʥ: 19,
    ʦ: 20,
    ʨ: 21,
    ᵝ: 22,
    'ꭧ': 23,
    A: 24,
    I: 25,
    O: 31,
    Q: 33,
    S: 35,
    T: 36,
    W: 39,
    Y: 41,
    ᵊ: 42,
    a: 43,
    b: 44,
    c: 45,
    d: 46,
    e: 47,
    f: 48,
    h: 50,
    i: 51,
    j: 52,
    k: 53,
    l: 54,
    m: 55,
    n: 56,
    o: 57,
    p: 58,
    q: 59,
    r: 60,
    s: 61,
    t: 62,
    u: 63,
    v: 64,
    w: 65,
    x: 66,
    y: 67,
    z: 68,
    ɑ: 69,
    ɐ: 70,
    ɒ: 71,
    æ: 72,
    β: 75,
    ɔ: 76,
    ɕ: 77,
    ç: 78,
    ɖ: 80,
    ð: 81,
    ʤ: 82,
    ə: 83,
    ɚ: 85,
    ɛ: 86,
    ɜ: 87,
    ɟ: 90,
    ɡ: 92,
    ɥ: 99,
    ɨ: 101,
    ɪ: 102,
    ʝ: 103,
    ɯ: 110,
    ɰ: 111,
    ŋ: 112,
    ɳ: 113,
    ɲ: 114,
    ɴ: 115,
    ø: 116,
    ɸ: 118,
    θ: 119,
    œ: 120,
    ɹ: 123,
    ɾ: 125,
    ɻ: 126,
    ʁ: 128,
    ɽ: 129,
    ʂ: 130,
    ʃ: 131,
    ʈ: 132,
    ʧ: 133,
    ʊ: 135,
    ʋ: 136,
    ʌ: 138,
    ɣ: 139,
    ɤ: 140,
    χ: 142,
    ʎ: 143,
    ʒ: 147,
    ʔ: 148,
    ˈ: 156,
    ˌ: 157,
    ː: 158,
    ʰ: 162,
    ʲ: 164,
    '↓': 169,
    '→': 171,
    '↗': 172,
    '↘': 173,
    ᵻ: 177,
    ʕ: 7,
    ħ: 8,
  };
  const PAD = 0;
  const MAX_TOKENS = 500;
  const BREAKS = ['.', '?', '!', ';', ':', ',', '…', '—'];

  const inputIndex = new Map([...TASHKEEL_INPUT].map((c, i) => [c, i]));
  const hintIndex = new Map(TASHKEEL_HINTS.map((h, i) => [h, i]));

  // النص ← معرّفات الحروف والحركات الموجودة. ما ليس من الحروف العربية (لاتيني، رموز) يُترك ويُعاد كما هو.
  function prepareTashkeel(text) {
    const chars = [];
    const hints = [];
    for (const c of String(text ?? '')) {
      if (DIACRITICS.has(c)) {
        if (chars.length) hints[hints.length - 1] += c;
        continue;
      }
      const id = inputIndex.has(c) ? inputIndex.get(c) : NUMERAL.test(c) ? inputIndex.get('#') : -1;
      if (id < 0) continue;
      chars.push(id);
      hints.push('');
    }
    return { charIds: chars, hintIds: hints.map((h) => (hintIndex.has(h) ? hintIndex.get(h) : 1)) };
  }

  // يعيد النص الأصلي بعد إسقاط حركاته وكتابة حركة كل حرف من توقعات النموذج.
  function applyTashkeel(text, predictions) {
    const marks = Array.from(predictions, (id) => TASHKEEL_TARGETS[id] ?? '').filter((_, i) => predictions[i] !== PAD);
    let index = 0;
    let out = '';
    for (const c of String(text ?? '')) {
      if (DIACRITICS.has(c)) continue;
      out += c;
      if (inputIndex.has(c) || NUMERAL.test(c)) out += marks[index++] ?? '';
    }
    return out;
  }

  // رموز النطق ← معرّفات «نبرة»، مقسّمة على حدود الجمل ثم المسافات كي لا تتجاوز قطعةٌ حدّ النموذج.
  function nabraChunks(phonemes, max = MAX_TOKENS) {
    const ids = [];
    for (const c of String(phonemes ?? '')) if (Object.hasOwn(NABRA_TOKENS, c)) ids.push(NABRA_TOKENS[c]);
    const breaks = new Set(BREAKS.map((c) => NABRA_TOKENS[c]));
    const space = NABRA_TOKENS[' '];
    const chunks = [];
    let start = 0;
    while (start < ids.length) {
      let end = Math.min(ids.length, start + max);
      if (end < ids.length) {
        let cut = -1;
        for (let i = end - 1; i > start; i--)
          if (breaks.has(ids[i])) {
            cut = i + 1;
            break;
          }
        if (cut < 0)
          for (let i = end - 1; i > start; i--)
            if (ids[i] === space) {
              cut = i + 1;
              break;
            }
        if (cut > start) end = cut;
      }
      const chunk = ids.slice(start, end);
      while (chunk.length && chunk[0] === space) chunk.shift();
      if (chunk.length) chunks.push(chunk);
      start = end;
    }
    return chunks;
  }

  // مدخلات النموذج: حشو في الطرفين، ومتجه الأسلوب حسب طول القطعة (voices.bin بشكل [510, 1, 256]).
  function nabraInput(chunk, voices, width = 256) {
    const rows = voices.length / width;
    const row = Math.min(chunk.length, rows - 1);
    return { ids: [PAD, ...chunk, PAD], style: voices.subarray(row * width, (row + 1) * width) };
  }

  const api = { prepareTashkeel, applyTashkeel, nabraChunks, nabraInput, MAX_TOKENS };
  root.ArabicVoice = api;
})(typeof self !== 'undefined' ? self : globalThis);
