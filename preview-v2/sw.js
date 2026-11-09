// قالب عامل الخدمة. تملأ scripts/sw-builder.mjs القيم عند البناء.
// يخزّن ملفات التطبيق العامة من الأصل نفسه فقط: لا خرائط ولا صور خارجية ولا /auth/ ولا Drive.
const CACHE = "turkey-v2-2d0bc625aee8";
const CORE = ["./","./index.html","./explore.html","./trips.html","./expenses.html","./reports.html","./expense-settings.html","./visa.html","./translate.html","./settings.html","./assets/AppModal-DXU4gjDB.css","./assets/AppModal-zCJilSh8.js","./assets/ArrowRight.es-B442NyW9.js","./assets/ArrowUp.es-DTsJdzo2.js","./assets/ArrowsDownUp.es-CS6uuSwc.js","./assets/Bed.es-Tm1H2jxw.js","./assets/Camera.es-kGhEfRHb.js","./assets/CaretDown.es-B0t8fsRr.js","./assets/ConfirmAction-CWvGuoHv.js","./assets/Copy.es-DKWfgcjd.js","./assets/Crosshair.es-CX3wlyS3.js","./assets/DownloadSimple.es-BmZjHcnz.js","./assets/Expenses-BguqRybV.js","./assets/Expenses-D4zPI3rt.css","./assets/Explore-B8aJLU0_.js","./assets/Explore-lELCXKZG.css","./assets/FilePdf.es-D6zz9q4W.js","./assets/Map-CXj_FFHH.css","./assets/Map-GwHYwRpb.js","./assets/MapTrifold.es-6PbA5XwF.js","./assets/PencilSimple.es-SM7VOZvR.js","./assets/PhotoCollection-CA5TZbdF.js","./assets/PhotoCollection-TeNGP6hQ.css","./assets/PlacePage-C213CwFo.js","./assets/Plus.es-QosAWZ20.js","./assets/ReportsPage-CPdJgP9v.js","./assets/ReportsPage-DMh7Nv5o.css","./assets/Scan.es-DmhnQZHJ.js","./assets/SettingsPage-BkuXxivD.js","./assets/SettingsPage-Ie8qJIKg.css","./assets/ShareNetwork.es-BivQXqI3.js","./assets/TaxiFare-Ck4SiOJW.js","./assets/Transit-BnPVUD7D.css","./assets/Transit-BtDAX1cS.js","./assets/Translation-CvHKnwr8.js","./assets/Translation-z0Aw6_go.css","./assets/TripBudgetSplit-DkZ3KmtQ.js","./assets/TripPage-qigkXmXe.css","./assets/TripPage-tLA97IY8.js","./assets/VisaForm-Pf9hudq-.js","./assets/VisaPage-Mv9Yo2OD.js","./assets/VisaPage-rjQyOYp8.css","./assets/boot.css","./assets/budget-split-CCzRFwAy.js","./assets/budget-split-CwAMgBWQ.css","./assets/ferries-BqQFHXIc.js","./assets/ferries-Brs3ybet.js","./assets/ics-BqQY-f5M.js","./assets/index-B1WCJkZi.js","./assets/index-C6xHUsg2.js","./assets/index-DC7MlxDq.css","./assets/index-ba8v7oO4.js","./assets/lazy-parts-CG8_Ne50.js","./assets/mt-worker.js","./assets/ocr-8eBQCuXN.js","./assets/ors-key-DDVoO-7Z.js","./assets/pack-28vZOmfS.js","./assets/photo-ocr-B50gWRex.js","./assets/photo-pdf-DGKgv9pN.js","./assets/privacy.css","./assets/report-pdf-CQr2vhw0.js","./assets/theme-init.js","./assets/transit-Cw5aJeNL.js","./assets/trip-details-D_dzfAjK.css","./assets/trip-details-ZXGZ78x5.js","./assets/tts-arabic.js","./assets/tts-phonemes.js","./assets/tts-pool.js","./assets/tts-worker.js","./assets/use-drag-reorder-C0F7O3j3.js"];
const EXTRA = ["./assets/app-mark.svg","./assets/baklava.webp","./assets/content-pack.json","./assets/hamza-logo-clear.png","./assets/hamza-logo-header.webp","./assets/hamza.webp","./assets/icon-180.png","./assets/icon-192.png","./assets/icon-48.png","./assets/icon-512.png","./assets/icon-maskable-512.png","./assets/icon-monochrome-512.png","./assets/istanbul-B581LxNd.webp","./assets/istanbul-sunrise-N8vxD-H1.webp","./assets/istanbul-sunrise.webp","./assets/istanbul.webp","./assets/manifest.json","./assets/place-placeholder.svg","./assets/readex-arabic.woff2","./assets/readex-latin-ext.woff2","./assets/readex-latin.woff2","./assets/silence.wav","./assets/visa-official.pdf"];
const NETWORK_FIRST = ["./config.json","./assets/content-pack.json"];
// بصمة محتوى كل ملف مخزَّن مسبقًا (CODE-09): الملف الذي لم تتغيّر بصمته يُنسخ من ذاكرة الإصدار السابق
// بدل تنزيله من جديد، فالتحديث ينزّل ما تغيّر وحده.
const DIGESTS = {"./":"8e9ddcfb23d76570","./index.html":"8e9ddcfb23d76570","./explore.html":"746aeaedcceef1e6","./trips.html":"5c5e595c3c9464bf","./expenses.html":"4479735ef771e2d9","./reports.html":"5db1367e619cf3c6","./expense-settings.html":"e232bb3b7c87f9ff","./visa.html":"75eb206236d9c10a","./translate.html":"5eb2d0c951ce0e8c","./settings.html":"28d090c1c0194843","./assets/AppModal-DXU4gjDB.css":"00053e017b83d07b","./assets/AppModal-zCJilSh8.js":"ca3f555e42021612","./assets/ArrowRight.es-B442NyW9.js":"821eeb099dcca65b","./assets/ArrowUp.es-DTsJdzo2.js":"ea1de814fee33bb6","./assets/ArrowsDownUp.es-CS6uuSwc.js":"618eca01bb98872c","./assets/Bed.es-Tm1H2jxw.js":"a6a3f5b0931835ed","./assets/Camera.es-kGhEfRHb.js":"907b129991ab19b5","./assets/CaretDown.es-B0t8fsRr.js":"839aa04294bbcfde","./assets/ConfirmAction-CWvGuoHv.js":"cae993b4d8caa587","./assets/Copy.es-DKWfgcjd.js":"e270d3a902525b4f","./assets/Crosshair.es-CX3wlyS3.js":"e89f90ee9f259f0d","./assets/DownloadSimple.es-BmZjHcnz.js":"7031015739606e23","./assets/Expenses-BguqRybV.js":"ec5093db73ac6280","./assets/Expenses-D4zPI3rt.css":"d6209b24b00c5913","./assets/Explore-B8aJLU0_.js":"4e791fa9e75b5f49","./assets/Explore-lELCXKZG.css":"47cd92470141562d","./assets/FilePdf.es-D6zz9q4W.js":"031e9902198be08f","./assets/Map-CXj_FFHH.css":"7f52547e5cb3a121","./assets/Map-GwHYwRpb.js":"0343d7db0ef614e0","./assets/MapTrifold.es-6PbA5XwF.js":"5946e40f179e46ef","./assets/PencilSimple.es-SM7VOZvR.js":"2fa3f1a89b262638","./assets/PhotoCollection-CA5TZbdF.js":"4a568ec50e52faed","./assets/PhotoCollection-TeNGP6hQ.css":"f7880baa3c934708","./assets/PlacePage-C213CwFo.js":"fd56a28f6d877474","./assets/Plus.es-QosAWZ20.js":"c332c7cad52ca195","./assets/ReportsPage-CPdJgP9v.js":"7b6510e68441580a","./assets/ReportsPage-DMh7Nv5o.css":"e09fe4f6c5d7c656","./assets/Scan.es-DmhnQZHJ.js":"1d9d4782b5da6411","./assets/SettingsPage-BkuXxivD.js":"40e7cc2023dd2041","./assets/SettingsPage-Ie8qJIKg.css":"2a7334b19f50a13f","./assets/ShareNetwork.es-BivQXqI3.js":"169823c4545912dc","./assets/TaxiFare-Ck4SiOJW.js":"af36821461e00627","./assets/Transit-BnPVUD7D.css":"bff928318e8719d5","./assets/Transit-BtDAX1cS.js":"d94bee3a323860fe","./assets/Translation-CvHKnwr8.js":"f313174e55f52e57","./assets/Translation-z0Aw6_go.css":"026c5c328d30a7d4","./assets/TripBudgetSplit-DkZ3KmtQ.js":"e51dabc1d47064a7","./assets/TripPage-qigkXmXe.css":"96e31b688e85e81e","./assets/TripPage-tLA97IY8.js":"0e9213807e78916d","./assets/VisaForm-Pf9hudq-.js":"fac2b24d29087248","./assets/VisaPage-Mv9Yo2OD.js":"47324785cad24606","./assets/VisaPage-rjQyOYp8.css":"324d32d7d81c4e5c","./assets/boot.css":"3c7585cf9a12e1b0","./assets/budget-split-CCzRFwAy.js":"c15dec01f5934c37","./assets/budget-split-CwAMgBWQ.css":"1d85a0f4f6007f01","./assets/ferries-BqQFHXIc.js":"0aa48d658135c9a7","./assets/ferries-Brs3ybet.js":"4141df0c2bf384e8","./assets/ics-BqQY-f5M.js":"fa9db370fb158a5e","./assets/index-B1WCJkZi.js":"7f52d625ca88e696","./assets/index-C6xHUsg2.js":"c8b748e5accdfebe","./assets/index-DC7MlxDq.css":"2ae29816d3c4473f","./assets/index-ba8v7oO4.js":"be6789ba807cacc3","./assets/lazy-parts-CG8_Ne50.js":"f766bf598ad649c6","./assets/mt-worker.js":"efc5207cd04c954b","./assets/ocr-8eBQCuXN.js":"4ceda8ea852b1131","./assets/ors-key-DDVoO-7Z.js":"274ac5435a1ff3f8","./assets/pack-28vZOmfS.js":"0ab4f54e11127595","./assets/photo-ocr-B50gWRex.js":"16ca5cbb850d0936","./assets/photo-pdf-DGKgv9pN.js":"99ae747aa4d769e1","./assets/privacy.css":"cb44173533eca679","./assets/report-pdf-CQr2vhw0.js":"af18b9539081d83f","./assets/theme-init.js":"b7b5966b5a764913","./assets/transit-Cw5aJeNL.js":"a5992b1e2c83ba27","./assets/trip-details-D_dzfAjK.css":"b4fa517600d63ec6","./assets/trip-details-ZXGZ78x5.js":"0c5db3e12e17b1e2","./assets/tts-arabic.js":"612fddcc97ee6d8e","./assets/tts-phonemes.js":"21d4a9b35ab7e8d4","./assets/tts-pool.js":"9a274afba002ee22","./assets/tts-worker.js":"9c3cecb7e548e33e","./assets/use-drag-reorder-C0F7O3j3.js":"d6d5c5c893f0243b","./assets/app-mark.svg":"063f14f52e45cad8","./assets/baklava.webp":"e68a2be137641c38","./assets/content-pack.json":"23a41c56ee5d9ae0","./assets/hamza-logo-clear.png":"ddd9d7465cbda0ba","./assets/hamza-logo-header.webp":"68a6df733beeb1b1","./assets/hamza.webp":"aea2501f1147ad96","./assets/icon-180.png":"68a03439f8c18a14","./assets/icon-192.png":"0d6bbc2f6aa55617","./assets/icon-48.png":"81ed061f1c322872","./assets/icon-512.png":"20d1ad5cf673534d","./assets/icon-maskable-512.png":"d5eda75fdfaa3e26","./assets/icon-monochrome-512.png":"da82d7a148b2026d","./assets/istanbul-B581LxNd.webp":"dda52f03eee0dd63","./assets/istanbul-sunrise-N8vxD-H1.webp":"3ade9ef893cdc76f","./assets/istanbul-sunrise.webp":"3ade9ef893cdc76f","./assets/istanbul.webp":"dda52f03eee0dd63","./assets/manifest.json":"7adf240da13ce18d","./assets/place-placeholder.svg":"1f5a112d3baecb5e","./assets/readex-arabic.woff2":"1a432d26fc51264a","./assets/readex-latin-ext.woff2":"fd95c16683e2018b","./assets/readex-latin.woff2":"87022255400cd42a","./assets/silence.wav":"56d4af65701c26df","./assets/visa-official.pdf":"0f8599d32b37518a"};
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
// حزمة الترجمة دون اتصال (نحو 63 ميغابايت): التطبيق يحفظها بعد التحقق من بصماتها في ذاكرة ثابتة لا يمسحها أي
// تحديث، وتحذفها الإعدادات. هنا تُخدم منها أولًا (ملف الربط الذي يستورده عامل المحرك)، وما ليس فيها يمر إلى الشبكة
// دون أن يُحفظ: التنزيل نفسه يمر بالتحقق في الصفحة لا هنا.
const MT_CACHE = 'turkey-mt-v1';
const MT_FILE = /^\.\/mt\/[\w.-]+$/;
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
  if (MT_FILE.test(path)) {
    event.respondWith(fromPackCache(request));
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

async function fromPackCache(request) {
  const cache = await caches.open(MT_CACHE);
  return (await cache.match(request, { ignoreSearch: true })) || fetch(request);
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
