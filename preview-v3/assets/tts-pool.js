// ذاكرة نماذج النطق في العامل (CODE-10): كل صوت (كريم، والتركي، والإنجليزي، و«نبرة») جلسة onnxruntime بعشرات
// الميغابايتات في كومة wasm، وكان العامل يُبقيها كلها إلى الأبد. على الآيفون قد يُنهي سفاري الصفحة إن كبرت.
// هنا تبقى جلستان على الأكثر، والأقدم استعمالًا تُحرَّر (session.release) حين تُحمَّل ثالثة.
// جلسة قيد التحميل أو النطق لا تُحرَّر أبدًا، فلا يُقطع نطق جارٍ. تحرير الجلسة لا يصغّر كومة wasm نفسها
// (لا تنكمش)، لكنه يعيد مساحتها للنموذج التالي بدل أن تكبر الكومة بكل لغة.
// سكربت كلاسيكي يُنسخ إلى assets/tts-pool.js ويحمّله tts-worker.js بـ importScripts، والاختبارات تشغّله في سياق معزول.
(function (root) {
  const DEFAULT_LIMIT = 2;

  async function releaseValue(value) {
    try {
      await value?.session?.release?.();
    } catch {
      // تحرير فاشل لا يوقف النطق؛ الجلسة خرجت من الذاكرة على أي حال.
    }
  }

  // load(key, context) يعيد وعدًا بقيمة فيها session؛ use(key, run, context) يحمّلها مرة واحدة ويشغّل run عليها.
  // context (مثل دالة تقدّم التنزيل) لمن طلب التحميل أولًا؛ من يصل أثناءه ينتظر التحميل نفسه.
  function createSessionPool({ load, limit = DEFAULT_LIMIT }) {
    const entries = new Map();
    let clock = 0;

    // يُبقي keep جلسة على الأكثر، بتحرير الأقدم استعمالًا من الجلسات الخاملة.
    async function trim(keep) {
      const idle = [...entries]
        .filter(([, entry]) => entry.ready && entry.users === 0)
        .sort((a, b) => a[1].used - b[1].used);
      const extra = Math.max(0, entries.size - keep);
      for (const [key, entry] of idle.slice(0, extra)) {
        entries.delete(key);
        await releaseValue(entry.value);
      }
    }

    function entryFor(key, context) {
      const existing = entries.get(key);
      if (existing) return existing;
      const entry = { users: 0, used: 0, ready: false, value: null };
      entry.promise = Promise.resolve()
        .then(() => load(key, context))
        .then((value) => {
          entry.value = value;
          entry.ready = true;
          return value;
        })
        .catch((error) => {
          if (entries.get(key) === entry) entries.delete(key);
          throw error;
        });
      entries.set(key, entry);
      return entry;
    }

    async function use(key, run = () => undefined, context) {
      // يُفرَغ مكان قبل تحميل نموذج جديد، فلا تجتمع في الكومة ثلاث جلسات ولو لحظة.
      if (!entries.has(key)) await trim(limit - 1);
      const entry = entryFor(key, context);
      entry.users += 1;
      entry.used = ++clock;
      try {
        return await run(await entry.promise);
      } finally {
        entry.users -= 1;
        await trim(limit);
      }
    }

    return { use, keys: () => [...entries.keys()], limit };
  }

  root.SessionPool = { createSessionPool, DEFAULT_LIMIT };
})(typeof self !== 'undefined' ? self : globalThis);
