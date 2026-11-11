// قالب عامل الخدمة. تملأ scripts/sw-builder.mjs القيم عند البناء.
// يخزّن ملفات التطبيق العامة من الأصل نفسه فقط: لا خرائط ولا صور خارجية ولا /auth/ ولا Drive.
const CACHE = "turkey-v2-0c9a9e530441";
const CORE = ["./","./index.html","./explore.html","./trips.html","./expenses.html","./reports.html","./expense-settings.html","./visa.html","./translate.html","./settings.html","./assets/AppModal-DiTqWOWV.css","./assets/AppModal-ZHZJEzp-.js","./assets/ConfirmAction-W2Wzyo-J.js","./assets/DayShare-CkhYp8wF.css","./assets/DayShare-CpEm-zSw.js","./assets/ExpenseSummary-Q6E-qloq.js","./assets/Expenses-BJDafcCH.js","./assets/Explore-C3lLiauQ.css","./assets/Explore-CZepsRQV.js","./assets/Map-CXj_FFHH.css","./assets/Map-DlTvXgub.js","./assets/PhotoCollection-BgLZbwYf.css","./assets/PhotoCollection-RLMqNj5q.js","./assets/PlacePage-D4Pjm7xM.js","./assets/ReceiptGallery-CRTnYXVv.js","./assets/ReceiptGallery-hj0oPUzc.css","./assets/ReportsPage-Bwd8Z1QL.js","./assets/ReportsPage-DNjoP3Wd.css","./assets/SettingsPage-B2JaNG18.css","./assets/SettingsPage-BdRdpv4L.js","./assets/TaxFree-WFDnZCQK.js","./assets/TaxiFare-BJ7BBikU.js","./assets/Transit-C5Bcc2Nz.js","./assets/Transit-CtfyjyZa.css","./assets/Translation-BcyPUMZs.css","./assets/Translation-D6DnMbFn.js","./assets/TripBudgetSplit-qoXHONVF.js","./assets/TripPage-ew_FR8iZ.css","./assets/TripPage-pLDofu-L.js","./assets/VisaForm-tAOXvq1t.js","./assets/VisaPage-DaMO62fw.css","./assets/VisaPage-DnmIOYaw.js","./assets/VisaRows-IGozfFF-.js","./assets/boot.css","./assets/budget-split-CwAMgBWQ.css","./assets/budget-split-Dgii2-SL.js","./assets/expense-pages-7jrNOTHA.js","./assets/expense-pages-DbL7CqjT.css","./assets/ferries-6ZNbQzji.js","./assets/ferries-Brs3ybet.js","./assets/ics-D-5Zwvc5.js","./assets/index-BGZwksGd.js","./assets/index-BOhknoEK.css","./assets/index-BX-xaDGe.js","./assets/index-C6xHUsg2.js","./assets/lazy-parts-y1rRPM97.js","./assets/mt-worker.js","./assets/ocr-DfqOpZSa.js","./assets/ors-key-lin07jKX.js","./assets/pack-n9GeJpr3.js","./assets/photo-ocr-9xvRGz1f.js","./assets/photo-pdf-BghH2uj4.js","./assets/privacy.css","./assets/report-pdf-Xmh6gusc.js","./assets/theme-init.js","./assets/transit-H_e9vljs.js","./assets/tts-arabic.js","./assets/tts-phonemes.js","./assets/tts-pool.js","./assets/tts-worker.js","./assets/use-drag-reorder-AiC9jf-T.js"];
const EXTRA = ["./assets/app-mark.svg","./assets/baklava.webp","./assets/content-pack.json","./assets/hamza-logo-clear.png","./assets/hamza-logo-header.webp","./assets/hamza.webp","./assets/icon-180.png","./assets/icon-192.png","./assets/icon-48.png","./assets/icon-512.png","./assets/icon-maskable-512.png","./assets/icon-monochrome-512.png","./assets/istanbul-B581LxNd.webp","./assets/istanbul-sunrise-N8vxD-H1.webp","./assets/istanbul-sunrise.webp","./assets/istanbul.webp","./assets/manifest.json","./assets/place-placeholder.svg","./assets/readex-arabic.woff2","./assets/readex-latin-ext.woff2","./assets/readex-latin.woff2","./assets/silence.wav","./assets/stitch-home-day.webp","./assets/stitch-home-night.webp","./assets/stitch-istanbul-tram.webp","./assets/visa-official.pdf"];
const NETWORK_FIRST = ["./config.json","./assets/content-pack.json"];
// بصمة محتوى كل ملف مخزَّن مسبقًا (CODE-09): الملف الذي لم تتغيّر بصمته يُنسخ من ذاكرة الإصدار السابق
// بدل تنزيله من جديد، فالتحديث ينزّل ما تغيّر وحده.
const DIGESTS = {"./":"9880df8f4e6752d0","./index.html":"9880df8f4e6752d0","./explore.html":"f510b56a9429f828","./trips.html":"295637be87cc4424","./expenses.html":"95ca7da58688e6d3","./reports.html":"b3d95940ebf58ca3","./expense-settings.html":"541eebdb8c483df5","./visa.html":"67c4f74872b72d7d","./translate.html":"a52b49ed6ece3a71","./settings.html":"67a8ab61f2f945ce","./assets/AppModal-DiTqWOWV.css":"99dc16f1aead47a6","./assets/AppModal-ZHZJEzp-.js":"ad40478affe92650","./assets/ConfirmAction-W2Wzyo-J.js":"63afd6b4b12fecc0","./assets/DayShare-CkhYp8wF.css":"cc19d6e77d03afcf","./assets/DayShare-CpEm-zSw.js":"a8a5b271f6166beb","./assets/ExpenseSummary-Q6E-qloq.js":"4345803b5b1ff3d3","./assets/Expenses-BJDafcCH.js":"9776926cc5753ab3","./assets/Explore-C3lLiauQ.css":"89082ea411ffbb10","./assets/Explore-CZepsRQV.js":"e2e99fbf1657b3ca","./assets/Map-CXj_FFHH.css":"7f52547e5cb3a121","./assets/Map-DlTvXgub.js":"48b7fc0c7f9f2c76","./assets/PhotoCollection-BgLZbwYf.css":"cd19d7c98ec51783","./assets/PhotoCollection-RLMqNj5q.js":"83bfc547d88ddba0","./assets/PlacePage-D4Pjm7xM.js":"3002793d803b9c49","./assets/ReceiptGallery-CRTnYXVv.js":"e5b12c1ad3c9d50a","./assets/ReceiptGallery-hj0oPUzc.css":"3cd4491e8d534253","./assets/ReportsPage-Bwd8Z1QL.js":"c4b8ff86ed215ee9","./assets/ReportsPage-DNjoP3Wd.css":"3e5e9ea7a9a385bb","./assets/SettingsPage-B2JaNG18.css":"fad223e2df3eb840","./assets/SettingsPage-BdRdpv4L.js":"716854a94161bde0","./assets/TaxFree-WFDnZCQK.js":"0e942aa5e07dedf5","./assets/TaxiFare-BJ7BBikU.js":"7fb8ea249294ad7b","./assets/Transit-C5Bcc2Nz.js":"b792e3992999a8b3","./assets/Transit-CtfyjyZa.css":"89c101d3a5d344a4","./assets/Translation-BcyPUMZs.css":"07f31677005a693d","./assets/Translation-D6DnMbFn.js":"0ed33841a052a92b","./assets/TripBudgetSplit-qoXHONVF.js":"012c3494b5894b89","./assets/TripPage-ew_FR8iZ.css":"f7ad8019a38e9978","./assets/TripPage-pLDofu-L.js":"f5f784d00001e20b","./assets/VisaForm-tAOXvq1t.js":"59a2985c7e7f04ff","./assets/VisaPage-DaMO62fw.css":"f2a4fe517d91cd3b","./assets/VisaPage-DnmIOYaw.js":"aa2a2cfc5ca5e0dc","./assets/VisaRows-IGozfFF-.js":"6e153f6e01f630a0","./assets/boot.css":"3c7585cf9a12e1b0","./assets/budget-split-CwAMgBWQ.css":"1d85a0f4f6007f01","./assets/budget-split-Dgii2-SL.js":"304ab2926b7ce24e","./assets/expense-pages-7jrNOTHA.js":"e895dcfd9ecb6aa6","./assets/expense-pages-DbL7CqjT.css":"9d1f03a195950b8d","./assets/ferries-6ZNbQzji.js":"1bf74926d76ba201","./assets/ferries-Brs3ybet.js":"4141df0c2bf384e8","./assets/ics-D-5Zwvc5.js":"717c41f74e0dcca2","./assets/index-BGZwksGd.js":"d3c5347d7cf46fed","./assets/index-BOhknoEK.css":"b83b49d555c1039e","./assets/index-BX-xaDGe.js":"7f2ea378e13e08ae","./assets/index-C6xHUsg2.js":"c8b748e5accdfebe","./assets/lazy-parts-y1rRPM97.js":"d25393a279c716d2","./assets/mt-worker.js":"efc5207cd04c954b","./assets/ocr-DfqOpZSa.js":"af5a2a5f612abd08","./assets/ors-key-lin07jKX.js":"3129543f376c8df3","./assets/pack-n9GeJpr3.js":"c26bfde4d9a43ea5","./assets/photo-ocr-9xvRGz1f.js":"36ef95ce40857098","./assets/photo-pdf-BghH2uj4.js":"1c3241e1aa175a9f","./assets/privacy.css":"cb44173533eca679","./assets/report-pdf-Xmh6gusc.js":"cc648da26fb146ce","./assets/theme-init.js":"a5c39e81359e77ef","./assets/transit-H_e9vljs.js":"ee2a1fcb38519852","./assets/tts-arabic.js":"612fddcc97ee6d8e","./assets/tts-phonemes.js":"21d4a9b35ab7e8d4","./assets/tts-pool.js":"9a274afba002ee22","./assets/tts-worker.js":"9c3cecb7e548e33e","./assets/use-drag-reorder-AiC9jf-T.js":"3645ce88e18bfb6a","./assets/app-mark.svg":"063f14f52e45cad8","./assets/baklava.webp":"e68a2be137641c38","./assets/content-pack.json":"23a41c56ee5d9ae0","./assets/hamza-logo-clear.png":"ddd9d7465cbda0ba","./assets/hamza-logo-header.webp":"68a6df733beeb1b1","./assets/hamza.webp":"aea2501f1147ad96","./assets/icon-180.png":"68a03439f8c18a14","./assets/icon-192.png":"0d6bbc2f6aa55617","./assets/icon-48.png":"81ed061f1c322872","./assets/icon-512.png":"20d1ad5cf673534d","./assets/icon-maskable-512.png":"d5eda75fdfaa3e26","./assets/icon-monochrome-512.png":"da82d7a148b2026d","./assets/istanbul-B581LxNd.webp":"dda52f03eee0dd63","./assets/istanbul-sunrise-N8vxD-H1.webp":"3ade9ef893cdc76f","./assets/istanbul-sunrise.webp":"3ade9ef893cdc76f","./assets/istanbul.webp":"dda52f03eee0dd63","./assets/manifest.json":"7adf240da13ce18d","./assets/place-placeholder.svg":"1f5a112d3baecb5e","./assets/readex-arabic.woff2":"1a432d26fc51264a","./assets/readex-latin-ext.woff2":"fd95c16683e2018b","./assets/readex-latin.woff2":"87022255400cd42a","./assets/silence.wav":"56d4af65701c26df","./assets/stitch-home-day.webp":"67ed7e2591bb5626","./assets/stitch-home-night.webp":"cd2c2ab5c680586f","./assets/stitch-istanbul-tram.webp":"c04ce519197f7e91","./assets/visa-official.pdf":"0f8599d32b37518a"};
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
