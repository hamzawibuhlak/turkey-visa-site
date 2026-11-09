// قالب عامل الخدمة. تملأ scripts/sw-builder.mjs القيم عند البناء.
// يخزّن ملفات التطبيق العامة من الأصل نفسه فقط: لا خرائط ولا صور خارجية ولا /auth/ ولا Drive.
const CACHE = "turkey-v2-2c97791b42c8";
const CORE = ["./","./index.html","./explore.html","./trips.html","./expenses.html","./reports.html","./expense-settings.html","./visa.html","./translate.html","./settings.html","./assets/AppModal-Cmm5EzTV.js","./assets/AppModal-DXU4gjDB.css","./assets/ArrowRight.es-CuS4hyxN.js","./assets/ArrowUp.es-C8tvHTPF.js","./assets/Bed.es-DWIvqeeY.js","./assets/Camera.es-D78yS0OH.js","./assets/ConfirmAction-CL4TYvO5.js","./assets/Copy.es-CQb9c_92.js","./assets/DownloadSimple.es-C-0tF1Nn.js","./assets/Expenses-D4zPI3rt.css","./assets/Expenses-VNyILXKg.js","./assets/Explore-DM7KiFNX.js","./assets/Explore-lELCXKZG.css","./assets/Map-CXj_FFHH.css","./assets/Map-_pXUtge8.js","./assets/MapTrifold.es-DQlsp0Sh.js","./assets/Plus.es-CBRo2K1-.js","./assets/ReportsPage-3JrsOTJv.js","./assets/ReportsPage-DMh7Nv5o.css","./assets/SettingsPage-CCWk4EiL.js","./assets/SettingsPage-USvZJs61.css","./assets/TaxiFare-DReFwx-h.js","./assets/Transit-C0EE7dVh.js","./assets/Transit-DhfgU6NH.css","./assets/Translation-B6kfMUd6.js","./assets/Translation-CIVum5wK.css","./assets/TripPage-Dc9lQo7a.js","./assets/TripPage-qigkXmXe.css","./assets/VisaForm-LNUT5R1c.js","./assets/VisaPage-B_VQZD2U.js","./assets/VisaPage-rjQyOYp8.css","./assets/boot.css","./assets/category-colors-CfrHzOVS.js","./assets/ferries-Brs3ybet.js","./assets/ferries-DWc53KF_.js","./assets/ics-BNHBqUUB.js","./assets/index-C0jFFKxq.js","./assets/index-C6xHUsg2.js","./assets/index-DC7MlxDq.css","./assets/index-egxAVAOV.js","./assets/lazy-parts-1vQjEu9A.js","./assets/ocr-BeBSvmf8.js","./assets/privacy.css","./assets/report-pdf-C1wDZGZs.js","./assets/theme-init.js","./assets/transit-KKfmWmB1.js","./assets/trip-details-BiOSAXFl.js","./assets/trip-details-D_dzfAjK.css","./assets/tts-arabic.js","./assets/tts-phonemes.js","./assets/tts-pool.js","./assets/tts-worker.js","./assets/whatsapp-DAPRVKt3.js"];
const EXTRA = ["./assets/app-mark.svg","./assets/baklava.webp","./assets/content-pack.json","./assets/hamza-logo-clear.png","./assets/hamza-logo-header.webp","./assets/hamza.webp","./assets/icon-180.png","./assets/icon-192.png","./assets/icon-48.png","./assets/icon-512.png","./assets/icon-maskable-512.png","./assets/icon-monochrome-512.png","./assets/istanbul-B581LxNd.webp","./assets/istanbul-sunrise-N8vxD-H1.webp","./assets/istanbul-sunrise.webp","./assets/istanbul.webp","./assets/manifest.json","./assets/place-placeholder.svg","./assets/readex-arabic.woff2","./assets/readex-latin-ext.woff2","./assets/readex-latin.woff2","./assets/silence.wav","./assets/visa-official.pdf"];
const NETWORK_FIRST = ["./config.json","./assets/content-pack.json"];
// بصمة محتوى كل ملف مخزَّن مسبقًا (CODE-09): الملف الذي لم تتغيّر بصمته يُنسخ من ذاكرة الإصدار السابق
// بدل تنزيله من جديد، فالتحديث ينزّل ما تغيّر وحده.
const DIGESTS = {"./":"5b803216cfca1b46","./index.html":"5b803216cfca1b46","./explore.html":"26c7e7ba15575084","./trips.html":"176346a4e6e9459d","./expenses.html":"766705c3a2246a13","./reports.html":"1a12456434ef3568","./expense-settings.html":"3b5c04b49493d765","./visa.html":"821c141a6d9b23b1","./translate.html":"c2ed0e9b0f0e52e7","./settings.html":"e7af46ae5be397c4","./assets/AppModal-Cmm5EzTV.js":"7169e0895e8505ba","./assets/AppModal-DXU4gjDB.css":"00053e017b83d07b","./assets/ArrowRight.es-CuS4hyxN.js":"ef26cb3ba0684344","./assets/ArrowUp.es-C8tvHTPF.js":"732b3b3335b24e0c","./assets/Bed.es-DWIvqeeY.js":"644b55043d6de5af","./assets/Camera.es-D78yS0OH.js":"ba313e190a072f7b","./assets/ConfirmAction-CL4TYvO5.js":"6de5a9bb08fd3154","./assets/Copy.es-CQb9c_92.js":"c99a66568365bebf","./assets/DownloadSimple.es-C-0tF1Nn.js":"9fb4093a15c9df3a","./assets/Expenses-D4zPI3rt.css":"d6209b24b00c5913","./assets/Expenses-VNyILXKg.js":"ce7a7a5a1f978b36","./assets/Explore-DM7KiFNX.js":"1de74f8d513ae669","./assets/Explore-lELCXKZG.css":"47cd92470141562d","./assets/Map-CXj_FFHH.css":"7f52547e5cb3a121","./assets/Map-_pXUtge8.js":"e12adfe813157d76","./assets/MapTrifold.es-DQlsp0Sh.js":"150d45d5a67cda05","./assets/Plus.es-CBRo2K1-.js":"e42366b391e9d8aa","./assets/ReportsPage-3JrsOTJv.js":"c197aaa6650b1f4d","./assets/ReportsPage-DMh7Nv5o.css":"e09fe4f6c5d7c656","./assets/SettingsPage-CCWk4EiL.js":"431e2a6d6e6bf557","./assets/SettingsPage-USvZJs61.css":"b94cc16f37052f16","./assets/TaxiFare-DReFwx-h.js":"4fcae2bfec0f76b9","./assets/Transit-C0EE7dVh.js":"7484c909063c84bc","./assets/Transit-DhfgU6NH.css":"6feae227bb7293ec","./assets/Translation-B6kfMUd6.js":"1faf4587d0358339","./assets/Translation-CIVum5wK.css":"a35664f419ae3042","./assets/TripPage-Dc9lQo7a.js":"66e55303b7d48f68","./assets/TripPage-qigkXmXe.css":"96e31b688e85e81e","./assets/VisaForm-LNUT5R1c.js":"ed71fb386d3b8e38","./assets/VisaPage-B_VQZD2U.js":"32c4c8483e8da9f1","./assets/VisaPage-rjQyOYp8.css":"324d32d7d81c4e5c","./assets/boot.css":"3c7585cf9a12e1b0","./assets/category-colors-CfrHzOVS.js":"898c4d7a5a5b8d8a","./assets/ferries-Brs3ybet.js":"4141df0c2bf384e8","./assets/ferries-DWc53KF_.js":"75b273414651d807","./assets/ics-BNHBqUUB.js":"5d2d7d03b6a8bc46","./assets/index-C0jFFKxq.js":"69b3336fb813a6f1","./assets/index-C6xHUsg2.js":"c8b748e5accdfebe","./assets/index-DC7MlxDq.css":"2ae29816d3c4473f","./assets/index-egxAVAOV.js":"259c5c543831c4c5","./assets/lazy-parts-1vQjEu9A.js":"df409ec09da07e21","./assets/ocr-BeBSvmf8.js":"e049948bd92b8a16","./assets/privacy.css":"cb44173533eca679","./assets/report-pdf-C1wDZGZs.js":"53f261c96c945d9f","./assets/theme-init.js":"b7b5966b5a764913","./assets/transit-KKfmWmB1.js":"c2fb2dd132b8ba7b","./assets/trip-details-BiOSAXFl.js":"71a63abe3781dcb9","./assets/trip-details-D_dzfAjK.css":"b4fa517600d63ec6","./assets/tts-arabic.js":"612fddcc97ee6d8e","./assets/tts-phonemes.js":"21d4a9b35ab7e8d4","./assets/tts-pool.js":"9a274afba002ee22","./assets/tts-worker.js":"9c3cecb7e548e33e","./assets/whatsapp-DAPRVKt3.js":"e581580e12846481","./assets/app-mark.svg":"063f14f52e45cad8","./assets/baklava.webp":"e68a2be137641c38","./assets/content-pack.json":"23a41c56ee5d9ae0","./assets/hamza-logo-clear.png":"ddd9d7465cbda0ba","./assets/hamza-logo-header.webp":"68a6df733beeb1b1","./assets/hamza.webp":"aea2501f1147ad96","./assets/icon-180.png":"68a03439f8c18a14","./assets/icon-192.png":"0d6bbc2f6aa55617","./assets/icon-48.png":"81ed061f1c322872","./assets/icon-512.png":"20d1ad5cf673534d","./assets/icon-maskable-512.png":"d5eda75fdfaa3e26","./assets/icon-monochrome-512.png":"da82d7a148b2026d","./assets/istanbul-B581LxNd.webp":"dda52f03eee0dd63","./assets/istanbul-sunrise-N8vxD-H1.webp":"3ade9ef893cdc76f","./assets/istanbul-sunrise.webp":"3ade9ef893cdc76f","./assets/istanbul.webp":"dda52f03eee0dd63","./assets/manifest.json":"7adf240da13ce18d","./assets/place-placeholder.svg":"1f5a112d3baecb5e","./assets/readex-arabic.woff2":"1a432d26fc51264a","./assets/readex-latin-ext.woff2":"fd95c16683e2018b","./assets/readex-latin.woff2":"87022255400cd42a","./assets/silence.wav":"56d4af65701c26df","./assets/visa-official.pdf":"0f8599d32b37518a"};
const DIGEST_KEY = './__digests';
// قراءة الصور (ت١١): ملفاتها تُحفظ عند أول استعمال لا عند التثبيت، في ذاكرة باسم نسخة المكتبة تبقى بين الإصدارات.
const OCR_CACHE = "turkey-ocr-7.0.0";
const OCR_FILE = /^\.\/assets\/(ocr-worker\.|tesseract-core-|tur\.traineddata)/;
// النطق داخل الجهاز (بايبر): المحرك في ذاكرة باسم نسخته، والأصوات (٦٣ ميغابايت لكل لغة) في ذاكرة ثابتة لا
// يمسحها أي تحديث؛ يحذفها المستخدم من الإعدادات. كلاهما يُحفظ عند التنزيل أو أول استعمال.
const TTS_CACHE = "turkey-tts-1.30.0-d668e6da";
const VOICE_CACHE = 'turkey-voices-v1';
const TTS_FILE = /^\.\/assets\/(ort\.wasm\.min\.js|ort-wasm-simd-threaded\.|piper_phonemize\.)/;
const VOICE_FILE = /^\.\/voices\/[\w.-]+$/;
const OWNED = new Set([...CORE, ...EXTRA, ...NETWORK_FIRST]);
const NETWORK_TIMEOUT_MS = 8000;

const root = new URL('./', self.location.href);
const relativePath = (url) => './' + url.pathname.slice(root.pathname.length);

// cache: "reload" يتجاوز ذاكرة المتصفح المؤقتة، فلا تدخل ملفات قديمة (مثل الأيقونات) إلى التخزين الجديد.
const fresh = (file) => new Request(new URL(file, self.location.href), { cache: 'reload' });

async function readJson(cache, key) {
  try {
    const saved = await cache.match(key);
    return saved ? await saved.json() : null;
  } catch {
    return null;
  }
}

// ذاكرة إصدار سابق لكل ملف بصمته فيه مطابقة لبصمته الآن. السجل لا يحوي إلا ما خُزّن عند التثبيت،
// فما أُضيف لاحقًا من الشبكة أثناء العمل لا يُنسخ أبدًا. الإصدار الأقدم بلا سجل لا يُنسخ منه شيء.
async function unchangedCopies() {
  const copies = new Map();
  for (const key of await caches.keys()) {
    if (!key.startsWith('turkey-v2-') || key === CACHE) continue;
    const cache = await caches.open(key);
    const saved = (await readJson(cache, DIGEST_KEY)) || {};
    for (const [file, digest] of Object.entries(saved))
      if (DIGESTS[file] === digest && !copies.has(file)) copies.set(file, cache);
  }
  return copies;
}

// يعيد اسم الملف بعد تخزينه: نسخة محلية إن بقيت كما هي، وإلا تنزيل يتجاوز ذاكرة المتصفح.
async function store(cache, file, copies) {
  const request = new Request(new URL(file, self.location.href));
  const kept = await copies.get(file)?.match(request);
  if (kept) await cache.put(request, kept);
  else await cache.add(fresh(file));
  return file;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      const copies = await unchangedCopies();
      const core = await Promise.all(CORE.map((file) => store(cache, file, copies)));
      const extra = (await Promise.allSettled(EXTRA.map((file) => store(cache, file, copies))))
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value);
      const stored = [...core, ...extra].filter((file) => DIGESTS[file]);
      await cache.put(DIGEST_KEY, new Response(JSON.stringify(Object.fromEntries(stored.map((f) => [f, DIGESTS[f]])))));
      // No skipWaiting here: a new worker waits while the old one serves open pages, and the page
      // offers "update now" (below). With no earlier worker on the device the browser activates
      // this one at once, so the first install needs no prompt.
    })(),
  );
});

// The page asks a waiting worker to take over once the user taps "update now" and the app has saved.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') event.waitUntil(self.skipWaiting());
});

// A page opened before an update keeps asking for its own release's chunks after the new worker
// takes over, and the site no longer has them. So the release right before this one stays cached
// (recorded in a separate cache), and every older one is removed.
const META = 'turkey-sw-meta';
const META_KEY = './__releases';

const readReleases = (meta) => readJson(meta, META_KEY);

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const meta = await caches.open(META);
      const saved = await readReleases(meta);
      const previous = !saved ? null : saved.current !== CACHE ? saved.current : saved.previous;
      // Without a record (a worker from before this rule) the old caches are kept once.
      const keep = (key) => key === CACHE || !saved || key === previous;
      for (const key of await caches.keys()) {
        if (key.startsWith('turkey-v2-') && !keep(key)) await caches.delete(key);
        if (key.startsWith('turkey-ocr-') && key !== OCR_CACHE) await caches.delete(key);
        if (key.startsWith('turkey-tts-') && key !== TTS_CACHE) await caches.delete(key);
      }
      await meta.put(META_KEY, new Response(JSON.stringify({ current: CACHE, previous })));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  const path = relativePath(url);
  if (OCR_FILE.test(path)) {
    event.respondWith(fromLazyCache(OCR_CACHE, request));
    return;
  }
  if (TTS_FILE.test(path) || VOICE_FILE.test(path)) {
    event.respondWith(fromLazyCache(VOICE_FILE.test(path) ? VOICE_CACHE : TTS_CACHE, request));
    return;
  }
  if (!OWNED.has(path)) {
    if (path.startsWith('./assets/')) event.respondWith(fromAnyRelease(request));
    return;
  }
  event.respondWith(NETWORK_FIRST.includes(path) ? networkFirst(event) : cacheFirst(event));
});

// تُنزَّل مرة واحدة ثم تعمل دون إنترنت؛ الفشل يصل إلى الصفحة فتقول إن أول استعمال يحتاج اتصالًا.
async function fromLazyCache(name, request) {
  const cache = await caches.open(name);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone());
  return response;
}

// An asset this release does not own may belong to the previous release a page still runs.
// It is served from whichever cache has it, otherwise from the network, and never stored.
async function fromAnyRelease(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  return cached || fetch(request);
}

// التخزين المسبق ثابت: أي نسخة جديدة تصل كاملة عبر تثبيت عامل خدمة جديد،
// فلا تشير صفحة جديدة إلى ملف جافاسكربت لم يُخزَّن بعد.
async function cacheFirst(event) {
  const { request } = event;
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) event.waitUntil(cache.put(request, response.clone()));
    return response;
  } catch (error) {
    if (request.mode === 'navigate') {
      const shell = await cache.match('./index.html');
      if (shell) return shell;
    }
    throw error;
  }
}

async function networkFirst(event) {
  const { request } = event;
  const cache = await caches.open(CACHE);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), NETWORK_TIMEOUT_MS);
  try {
    const response = await fetch(request, { signal: controller.signal });
    if (response.ok) event.waitUntil(cache.put(request, response.clone()));
    return response;
  } catch (error) {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
