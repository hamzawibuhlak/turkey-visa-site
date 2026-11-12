// قالب عامل الخدمة. تملأ scripts/sw-builder.mjs القيم عند البناء.
// يخزّن ملفات التطبيق العامة من الأصل نفسه فقط: لا خرائط ولا صور خارجية ولا /auth/ ولا Drive.
const CACHE = "turkey-v2-4a50fd6a2b35";
const CORE = ["./","./index.html","./explore.html","./trips.html","./expenses.html","./reports.html","./expense-settings.html","./visa.html","./translate.html","./settings.html","./assets/AppModal-DiTqWOWV.css","./assets/AppModal-G2RhLAZu.js","./assets/ConfirmAction-DsraXa2J.js","./assets/DayShare-BAnCDJnQ.js","./assets/DayShare-CkhYp8wF.css","./assets/ExpenseSummary-Bgwz-pr-.js","./assets/Expenses-Dysw3iFs.js","./assets/Explore-C3TlOiin.js","./assets/Explore-C3lLiauQ.css","./assets/Map-C8MsKaj1.js","./assets/Map-CXj_FFHH.css","./assets/PhotoCollection-BgLZbwYf.css","./assets/PhotoCollection-DCD4ECgL.js","./assets/PlacePage-J0Fg1DQG.js","./assets/ReceiptGallery-CoGqFWET.js","./assets/ReceiptGallery-hj0oPUzc.css","./assets/ReportsPage-DNjoP3Wd.css","./assets/ReportsPage-DqO0ZK08.js","./assets/SettingsPage-B2JaNG18.css","./assets/SettingsPage-DkXN-vcT.js","./assets/TaxFree-Sp3V5nbS.js","./assets/TaxiFare-DAUbrxkF.js","./assets/Transit-CtfyjyZa.css","./assets/Transit-DUQaAdHM.js","./assets/Translation-0TjAyidF.js","./assets/Translation-VqFjnxbK.css","./assets/TripBudgetSplit-BQxy-tDA.js","./assets/TripPage-ByFrnCXC.js","./assets/TripPage-ew_FR8iZ.css","./assets/VisaForm-Dbl-qWAY.js","./assets/VisaPage-DaMO62fw.css","./assets/VisaPage-MW3GbzUA.js","./assets/VisaRows-C4Awk9fo.js","./assets/boot.css","./assets/budget-split-CwAMgBWQ.css","./assets/budget-split-DuOVQd5B.js","./assets/expense-pages-DbL7CqjT.css","./assets/expense-pages-DyR41HAC.js","./assets/ferries-10Gq4HoJ.js","./assets/ferries-Brs3ybet.js","./assets/ics-D-5Zwvc5.js","./assets/index-3D9q4Mkj.js","./assets/index-C6xHUsg2.js","./assets/index-lhQVkMi2.css","./assets/index-skmpTHT3.js","./assets/lazy-parts-BldBlnNP.js","./assets/mt-worker.js","./assets/ocr-VtQGK5cJ.js","./assets/ors-key-DUbI3r1d.js","./assets/pack-B4efVLnR.js","./assets/photo-ocr-Bq8atURT.js","./assets/photo-pdf-DEy5Q0Xb.js","./assets/privacy.css","./assets/report-pdf-DVd4bIBO.js","./assets/theme-init.js","./assets/transit-BlEF01At.js","./assets/tts-arabic.js","./assets/tts-phonemes.js","./assets/tts-pool.js","./assets/tts-worker.js","./assets/use-drag-reorder-B1lSUDf-.js"];
const EXTRA = ["./assets/app-mark.svg","./assets/baklava.webp","./assets/content-pack.json","./assets/hamza-logo-clear.png","./assets/hamza-logo-header.webp","./assets/hamza.webp","./assets/icon-180.png","./assets/icon-192.png","./assets/icon-48.png","./assets/icon-512.png","./assets/icon-maskable-512.png","./assets/icon-monochrome-512.png","./assets/istanbul-B581LxNd.webp","./assets/istanbul-sunrise-N8vxD-H1.webp","./assets/istanbul-sunrise.webp","./assets/istanbul.webp","./assets/manifest.json","./assets/place-placeholder.svg","./assets/readex-arabic.woff2","./assets/readex-latin-ext.woff2","./assets/readex-latin.woff2","./assets/silence.wav","./assets/stitch-home-day.webp","./assets/stitch-home-night.webp","./assets/stitch-istanbul-tram.webp","./assets/visa-official.pdf"];
const NETWORK_FIRST = ["./config.json","./assets/content-pack.json"];
// بصمة محتوى كل ملف مخزَّن مسبقًا (CODE-09): الملف الذي لم تتغيّر بصمته يُنسخ من ذاكرة الإصدار السابق
// بدل تنزيله من جديد، فالتحديث ينزّل ما تغيّر وحده.
const DIGESTS = {"./":"a4b799ca15500e1d","./index.html":"a4b799ca15500e1d","./explore.html":"4372cb691cbdcf92","./trips.html":"f7f4320f4bfe3cd9","./expenses.html":"ba9726586f4f24fb","./reports.html":"f8de806689208b28","./expense-settings.html":"61c58cb0d296dac6","./visa.html":"ee337840092e68d9","./translate.html":"2a72cfa3e8898e3f","./settings.html":"8274236ae8ccbdaa","./assets/AppModal-DiTqWOWV.css":"99dc16f1aead47a6","./assets/AppModal-G2RhLAZu.js":"e22d944ae11a6da0","./assets/ConfirmAction-DsraXa2J.js":"aa8d411fdec824e3","./assets/DayShare-BAnCDJnQ.js":"589b8c2f5374a859","./assets/DayShare-CkhYp8wF.css":"cc19d6e77d03afcf","./assets/ExpenseSummary-Bgwz-pr-.js":"8175866968b50ec1","./assets/Expenses-Dysw3iFs.js":"5b8d8fab013375f9","./assets/Explore-C3TlOiin.js":"c9ae3aa1afbe4177","./assets/Explore-C3lLiauQ.css":"89082ea411ffbb10","./assets/Map-C8MsKaj1.js":"86717c4bf5f2590b","./assets/Map-CXj_FFHH.css":"7f52547e5cb3a121","./assets/PhotoCollection-BgLZbwYf.css":"cd19d7c98ec51783","./assets/PhotoCollection-DCD4ECgL.js":"c80dc6c3dd372b5c","./assets/PlacePage-J0Fg1DQG.js":"af0d0e65b9109e4f","./assets/ReceiptGallery-CoGqFWET.js":"ff3cac8e260ff489","./assets/ReceiptGallery-hj0oPUzc.css":"3cd4491e8d534253","./assets/ReportsPage-DNjoP3Wd.css":"3e5e9ea7a9a385bb","./assets/ReportsPage-DqO0ZK08.js":"90bb558c1dcfc23d","./assets/SettingsPage-B2JaNG18.css":"fad223e2df3eb840","./assets/SettingsPage-DkXN-vcT.js":"d6fc57616c12b1c0","./assets/TaxFree-Sp3V5nbS.js":"73e4e73f631afeb0","./assets/TaxiFare-DAUbrxkF.js":"db7f8e142aac69e7","./assets/Transit-CtfyjyZa.css":"89c101d3a5d344a4","./assets/Transit-DUQaAdHM.js":"8bd17f8ea4d1dd35","./assets/Translation-0TjAyidF.js":"1d2b8ca96970fb27","./assets/Translation-VqFjnxbK.css":"dea3dd10f45e822e","./assets/TripBudgetSplit-BQxy-tDA.js":"682c4df7b4f413b7","./assets/TripPage-ByFrnCXC.js":"8622287dd48bf42c","./assets/TripPage-ew_FR8iZ.css":"f7ad8019a38e9978","./assets/VisaForm-Dbl-qWAY.js":"5e707284bbb8d741","./assets/VisaPage-DaMO62fw.css":"f2a4fe517d91cd3b","./assets/VisaPage-MW3GbzUA.js":"88a3ce38d966b01d","./assets/VisaRows-C4Awk9fo.js":"d52c362a96449ab2","./assets/boot.css":"3c7585cf9a12e1b0","./assets/budget-split-CwAMgBWQ.css":"1d85a0f4f6007f01","./assets/budget-split-DuOVQd5B.js":"401b47019afd0ed4","./assets/expense-pages-DbL7CqjT.css":"9d1f03a195950b8d","./assets/expense-pages-DyR41HAC.js":"b07aa4b18fcfb218","./assets/ferries-10Gq4HoJ.js":"3d7abefb8230320c","./assets/ferries-Brs3ybet.js":"4141df0c2bf384e8","./assets/ics-D-5Zwvc5.js":"717c41f74e0dcca2","./assets/index-3D9q4Mkj.js":"093a94360eb3d359","./assets/index-C6xHUsg2.js":"c8b748e5accdfebe","./assets/index-lhQVkMi2.css":"4aeb92746a192938","./assets/index-skmpTHT3.js":"7e6d659cc160172b","./assets/lazy-parts-BldBlnNP.js":"b6f801cdc9a9c71f","./assets/mt-worker.js":"efc5207cd04c954b","./assets/ocr-VtQGK5cJ.js":"9f3f47e23a099c5f","./assets/ors-key-DUbI3r1d.js":"f4dd6b55dad4f3a1","./assets/pack-B4efVLnR.js":"57453a121c523465","./assets/photo-ocr-Bq8atURT.js":"8f9abc0bf07c0d56","./assets/photo-pdf-DEy5Q0Xb.js":"cb551fcc7fcfc4f2","./assets/privacy.css":"cb44173533eca679","./assets/report-pdf-DVd4bIBO.js":"475e26ef027b18a7","./assets/theme-init.js":"a5c39e81359e77ef","./assets/transit-BlEF01At.js":"95b1cc3c638f5861","./assets/tts-arabic.js":"612fddcc97ee6d8e","./assets/tts-phonemes.js":"21d4a9b35ab7e8d4","./assets/tts-pool.js":"9a274afba002ee22","./assets/tts-worker.js":"9c3cecb7e548e33e","./assets/use-drag-reorder-B1lSUDf-.js":"a8d18cf41df84880","./assets/app-mark.svg":"063f14f52e45cad8","./assets/baklava.webp":"e68a2be137641c38","./assets/content-pack.json":"23a41c56ee5d9ae0","./assets/hamza-logo-clear.png":"ddd9d7465cbda0ba","./assets/hamza-logo-header.webp":"68a6df733beeb1b1","./assets/hamza.webp":"aea2501f1147ad96","./assets/icon-180.png":"68a03439f8c18a14","./assets/icon-192.png":"0d6bbc2f6aa55617","./assets/icon-48.png":"81ed061f1c322872","./assets/icon-512.png":"20d1ad5cf673534d","./assets/icon-maskable-512.png":"d5eda75fdfaa3e26","./assets/icon-monochrome-512.png":"da82d7a148b2026d","./assets/istanbul-B581LxNd.webp":"dda52f03eee0dd63","./assets/istanbul-sunrise-N8vxD-H1.webp":"3ade9ef893cdc76f","./assets/istanbul-sunrise.webp":"3ade9ef893cdc76f","./assets/istanbul.webp":"dda52f03eee0dd63","./assets/manifest.json":"7adf240da13ce18d","./assets/place-placeholder.svg":"1f5a112d3baecb5e","./assets/readex-arabic.woff2":"1a432d26fc51264a","./assets/readex-latin-ext.woff2":"fd95c16683e2018b","./assets/readex-latin.woff2":"87022255400cd42a","./assets/silence.wav":"56d4af65701c26df","./assets/stitch-home-day.webp":"67ed7e2591bb5626","./assets/stitch-home-night.webp":"cd2c2ab5c680586f","./assets/stitch-istanbul-tram.webp":"c04ce519197f7e91","./assets/visa-official.pdf":"0f8599d32b37518a"};
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
