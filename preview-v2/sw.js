// قالب عامل الخدمة. تملأ scripts/sw-builder.mjs القيم عند البناء.
// يخزّن ملفات التطبيق العامة من الأصل نفسه فقط: لا خرائط ولا صور خارجية ولا /auth/ ولا Drive.
const CACHE = "turkey-v2-b1baf7ffeade";
const CORE = ["./","./index.html","./explore.html","./trips.html","./expenses.html","./reports.html","./expense-settings.html","./visa.html","./translate.html","./settings.html","./assets/AppModal-CX713I5X.css","./assets/AppModal-Dl1cAlCp.js","./assets/ArrowUp.es-Cp6UgEfT.js","./assets/Bed.es-Cox8h9eP.js","./assets/Camera.es-C5ZA_JAG.js","./assets/CaretDown.es-C8YFbMl_.js","./assets/ConfirmAction-BJx7MCbW.js","./assets/Copy.es-6MdpiHwb.js","./assets/DayShare-ChJAbfhM.js","./assets/DayShare-D_dzfAjK.css","./assets/DownloadSimple.es-D69ACVno.js","./assets/Expenses-BaD8jPdx.js","./assets/Expenses-Dm96rwLq.css","./assets/Explore-CKxf7tCN.js","./assets/Explore-uNU6J1AA.css","./assets/Map-CXj_FFHH.css","./assets/Map-yl1EWhPi.js","./assets/MapTrifold.es-Iy_zqMui.js","./assets/Plus.es-BAEna9eM.js","./assets/ReportsPage-Bt3Xl9WV.js","./assets/ReportsPage-DMh7Nv5o.css","./assets/SettingsPage-CpEkTjge.js","./assets/SettingsPage-USvZJs61.css","./assets/TaxiFare-BAtRAidL.js","./assets/Transit-D0KwFCgf.js","./assets/Transit-DhfgU6NH.css","./assets/Translation-CIVum5wK.css","./assets/Translation-DmB_Vl6l.js","./assets/TripsPage-B1R_YRUu.js","./assets/TripsPage-C0TEnj4s.css","./assets/VisaForm-OVGxWcEI.js","./assets/VisaPage-B2wkYPK1.js","./assets/VisaPage-rjQyOYp8.css","./assets/boot.css","./assets/ferries-Brs3ybet.js","./assets/ferries-DVc-7fdQ.js","./assets/ics-C1pM9iC9.js","./assets/index-BKKbYXlG.js","./assets/index-C6xHUsg2.js","./assets/index-DnFqIAKx.js","./assets/index-fvGTHjCg.css","./assets/lazy-parts-BVXQrRfM.js","./assets/ocr-ChWQqYMT.js","./assets/privacy.css","./assets/report-pdf-B8D66EPR.js","./assets/theme-init.js","./assets/transit-DwGS2D5H.js","./assets/tts-arabic.js","./assets/tts-phonemes.js","./assets/tts-pool.js","./assets/tts-worker.js","./assets/whatsapp-CIOue8Zs.js"];
const EXTRA = ["./assets/app-mark.svg","./assets/baklava.webp","./assets/content-pack.json","./assets/hamza-logo-clear.png","./assets/hamza-logo-header.webp","./assets/hamza.webp","./assets/icon-180.png","./assets/icon-192.png","./assets/icon-48.png","./assets/icon-512.png","./assets/icon-maskable-512.png","./assets/icon-monochrome-512.png","./assets/istanbul-B581LxNd.webp","./assets/istanbul-sunrise-N8vxD-H1.webp","./assets/istanbul-sunrise.webp","./assets/istanbul.webp","./assets/manifest.json","./assets/place-placeholder.svg","./assets/readex-arabic.woff2","./assets/readex-latin-ext.woff2","./assets/readex-latin.woff2","./assets/silence.wav","./assets/visa-official.pdf"];
const NETWORK_FIRST = ["./config.json","./assets/content-pack.json"];
// بصمة محتوى كل ملف مخزَّن مسبقًا (CODE-09): الملف الذي لم تتغيّر بصمته يُنسخ من ذاكرة الإصدار السابق
// بدل تنزيله من جديد، فالتحديث ينزّل ما تغيّر وحده.
const DIGESTS = {"./":"b1d5ba98946ede29","./index.html":"b1d5ba98946ede29","./explore.html":"6715ceac5f185694","./trips.html":"3a512297cf77d05e","./expenses.html":"35516db96d19ded6","./reports.html":"9e9ace3e8b938445","./expense-settings.html":"37dce1ce71093566","./visa.html":"2dc369e77b631314","./translate.html":"c8439e4d29c473e5","./settings.html":"fb3e7b8a68bb3268","./assets/AppModal-CX713I5X.css":"36b4e59032528ebc","./assets/AppModal-Dl1cAlCp.js":"50bb39c22e5989a7","./assets/ArrowUp.es-Cp6UgEfT.js":"4d5f9c91bae8de54","./assets/Bed.es-Cox8h9eP.js":"b215e4cd37790080","./assets/Camera.es-C5ZA_JAG.js":"0b6fd9a7a52bae7b","./assets/CaretDown.es-C8YFbMl_.js":"fb50fc8d7090a312","./assets/ConfirmAction-BJx7MCbW.js":"8b388051af6756d2","./assets/Copy.es-6MdpiHwb.js":"4c08067b87f29f09","./assets/DayShare-ChJAbfhM.js":"693a711e70e7348f","./assets/DayShare-D_dzfAjK.css":"b4fa517600d63ec6","./assets/DownloadSimple.es-D69ACVno.js":"ad90af0e22da11f1","./assets/Expenses-BaD8jPdx.js":"94edb944b1117ada","./assets/Expenses-Dm96rwLq.css":"f92ef536fa147def","./assets/Explore-CKxf7tCN.js":"e03e77deaea5ed24","./assets/Explore-uNU6J1AA.css":"b39c503bf7250671","./assets/Map-CXj_FFHH.css":"7f52547e5cb3a121","./assets/Map-yl1EWhPi.js":"6706ef1055c5f021","./assets/MapTrifold.es-Iy_zqMui.js":"6ec612364dd75c42","./assets/Plus.es-BAEna9eM.js":"5d471f8c4d1d9141","./assets/ReportsPage-Bt3Xl9WV.js":"3447fd185b3df1ed","./assets/ReportsPage-DMh7Nv5o.css":"e09fe4f6c5d7c656","./assets/SettingsPage-CpEkTjge.js":"17a02ab727d3a046","./assets/SettingsPage-USvZJs61.css":"b94cc16f37052f16","./assets/TaxiFare-BAtRAidL.js":"81935679a593ffa8","./assets/Transit-D0KwFCgf.js":"624c09f26daf4687","./assets/Transit-DhfgU6NH.css":"6feae227bb7293ec","./assets/Translation-CIVum5wK.css":"a35664f419ae3042","./assets/Translation-DmB_Vl6l.js":"394a95e20c83d33a","./assets/TripsPage-B1R_YRUu.js":"24d87786cf752dea","./assets/TripsPage-C0TEnj4s.css":"9193537b5ba46395","./assets/VisaForm-OVGxWcEI.js":"378d8ed8be141108","./assets/VisaPage-B2wkYPK1.js":"4bace77712cf5d6c","./assets/VisaPage-rjQyOYp8.css":"324d32d7d81c4e5c","./assets/boot.css":"3c7585cf9a12e1b0","./assets/ferries-Brs3ybet.js":"4141df0c2bf384e8","./assets/ferries-DVc-7fdQ.js":"cd332d5f4d49fbff","./assets/ics-C1pM9iC9.js":"eced4fd8796a1d63","./assets/index-BKKbYXlG.js":"c4acdc5c80efb1ae","./assets/index-C6xHUsg2.js":"c8b748e5accdfebe","./assets/index-DnFqIAKx.js":"e71a06653cea79fb","./assets/index-fvGTHjCg.css":"2dff6dad6188d2c7","./assets/lazy-parts-BVXQrRfM.js":"bce91a90bb6059fa","./assets/ocr-ChWQqYMT.js":"b20f2b5591caa51a","./assets/privacy.css":"cb44173533eca679","./assets/report-pdf-B8D66EPR.js":"400534eb74a20047","./assets/theme-init.js":"b7b5966b5a764913","./assets/transit-DwGS2D5H.js":"d3ce7851081da232","./assets/tts-arabic.js":"612fddcc97ee6d8e","./assets/tts-phonemes.js":"21d4a9b35ab7e8d4","./assets/tts-pool.js":"9a274afba002ee22","./assets/tts-worker.js":"9c3cecb7e548e33e","./assets/whatsapp-CIOue8Zs.js":"30cf83f38e3274cb","./assets/app-mark.svg":"063f14f52e45cad8","./assets/baklava.webp":"e68a2be137641c38","./assets/content-pack.json":"23a41c56ee5d9ae0","./assets/hamza-logo-clear.png":"ddd9d7465cbda0ba","./assets/hamza-logo-header.webp":"68a6df733beeb1b1","./assets/hamza.webp":"aea2501f1147ad96","./assets/icon-180.png":"68a03439f8c18a14","./assets/icon-192.png":"0d6bbc2f6aa55617","./assets/icon-48.png":"81ed061f1c322872","./assets/icon-512.png":"20d1ad5cf673534d","./assets/icon-maskable-512.png":"d5eda75fdfaa3e26","./assets/icon-monochrome-512.png":"da82d7a148b2026d","./assets/istanbul-B581LxNd.webp":"dda52f03eee0dd63","./assets/istanbul-sunrise-N8vxD-H1.webp":"3ade9ef893cdc76f","./assets/istanbul-sunrise.webp":"3ade9ef893cdc76f","./assets/istanbul.webp":"dda52f03eee0dd63","./assets/manifest.json":"7adf240da13ce18d","./assets/place-placeholder.svg":"1f5a112d3baecb5e","./assets/readex-arabic.woff2":"1a432d26fc51264a","./assets/readex-latin-ext.woff2":"fd95c16683e2018b","./assets/readex-latin.woff2":"87022255400cd42a","./assets/silence.wav":"56d4af65701c26df","./assets/visa-official.pdf":"0f8599d32b37518a"};
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
