/* عامل الترجمة دون اتصال (سكربت كلاسيكي يُنسخ إلى assets/mt-worker.js): محرك Bergamot الذي يشحنه Firefox
   (bergamot-translator v0.6.0، MPL-2.0) ونموذجا Firefox Translations للتركية ← الإنجليزية ← العربية.
   الملفات تُقرأ من ذاكرة الحزمة التي ملأها التنزيل بعد التحقق من بصماتها (src/offline-mt/pack.js)، وملف الربط
   يُستورد من ../mt/ فيخدمه عامل الخدمة من الذاكرة نفسها. الصفحة تغلق هذا العامل بعد خمول قصير، لأن ذاكرة
   WebAssembly لا تتقلص إلا بإغلاقه (نحو 282 ميغابايت لاتجاه واحد). إعدادات النموذج كما في Firefox
   (translations-engine.worker.js). البروتوكول: { id, name, args } ← { id, result } أو { id, error }. */
'use strict';

/* global loadBergamot */
const MT_CACHE = 'turkey-mt-v1';
const fileUrl = (name) => new URL('../mt/' + name, self.location.href).href;
self.importScripts(fileUrl('bergamot-translator.js'));

const ALIGN = { model: 256, lex: 64, vocab: 64 };
const CONFIG = {
  'beam-size': '1',
  normalize: '1.0',
  'word-penalty': '0',
  'max-length-break': '128',
  'mini-batch-words': '1024',
  workspace: '128',
  'max-length-factor': '2.0',
  'skip-cost': 'true',
  'cpu-threads': '0',
  quiet: 'true',
  'quiet-translation': 'true',
  'gemm-precision': 'int8shiftAlphaAll',
  alignment: 'soft',
};
// يبدأ صغيرًا وينمو، كما يفعل Firefox.
const INITIAL_MEMORY = 41_943_040;

const state = { bergamot: null, service: null, models: [] };

async function readCached(name) {
  const cache = await caches.open(MT_CACHE);
  const hit = await cache.match(fileUrl(name));
  if (!hit) throw new Error('missing:' + name);
  return hit.arrayBuffer();
}

function textConfig(config) {
  const indent = '            ';
  return (
    '\n' +
    Object.entries(config)
      .map(([k, v]) => `${indent}${k}: ${v}\n`)
      .join('') +
    indent
  );
}

function aligned(buffer, alignment) {
  const memory = new state.bergamot.AlignedMemory(buffer.byteLength, alignment);
  memory.getByteArrayView().set(new Uint8Array(buffer));
  return memory;
}

async function initialize() {
  if (state.service) return true;
  const wasmBinary = await readCached('bergamot-translator.wasm');
  state.bergamot = await new Promise((resolve, reject) => {
    const module = loadBergamot({
      INITIAL_MEMORY,
      print: () => {},
      onAbort: () => reject(new Error('bergamot wasm aborted')),
      onRuntimeInitialized: async () => {
        await Promise.resolve();
        resolve(module);
      },
      wasmBinary,
    });
  });
  state.service = new state.bergamot.BlockingService({ cacheSize: 0 });
  return true;
}

async function loadModel({ from, to, model, lex, vocab }) {
  const [modelBuffer, lexBuffer, vocabBuffer] = await Promise.all([
    readCached(model),
    readCached(lex),
    readCached(vocab),
  ]);
  const vocabs = new state.bergamot.AlignedMemoryList();
  vocabs.push_back(aligned(vocabBuffer, ALIGN.vocab));
  return new state.bergamot.TranslationModel(
    from,
    to,
    textConfig(CONFIG),
    aligned(modelBuffer, ALIGN.model),
    aligned(lexBuffer, ALIGN.lex),
    vocabs,
    null,
  );
}

const api = {
  // models: نموذجا المرور بالترتيب ({ from, to, model, lex, vocab }).
  async load(models) {
    await initialize();
    if (state.models.length) return true;
    const loaded = [];
    for (const spec of models) loaded.push(await loadModel(spec));
    state.models = loaded;
    return true;
  },

  translate(texts) {
    if (state.models.length !== 2) throw new Error('model not loaded');
    const messages = new state.bergamot.VectorString();
    const options = new state.bergamot.VectorResponseOptions();
    for (const text of texts) {
      messages.push_back(String(text));
      options.push_back({ qualityScores: false, alignment: false, html: false });
    }
    const responses = state.service.translateViaPivoting(state.models[0], state.models[1], messages, options);
    const out = texts.map((_, i) => responses.get(i).getTranslatedText());
    messages.delete();
    options.delete();
    responses.delete();
    return out;
  },

  memory() {
    return { wasmHeapBytes: state.bergamot?.HEAP8 ? state.bergamot.HEAP8.byteLength : null };
  },
};

self.addEventListener('message', async ({ data: { id, name, args } }) => {
  try {
    if (!Object.hasOwn(api, name)) throw new TypeError('unknown method ' + name);
    const result = await api[name](...(args || []));
    self.postMessage({ id, result });
  } catch (error) {
    self.postMessage({ id, error: { name: error?.name || 'Error', message: String(error?.message || error) } });
  }
});
