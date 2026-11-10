// قالب عامل الخدمة. تملأ scripts/sw-builder.mjs القيم عند البناء.
// يخزّن ملفات التطبيق العامة من الأصل نفسه فقط: لا خرائط ولا صور خارجية ولا /auth/ ولا Drive.
const CACHE = "turkey-v2-3b833ed412d3";
const CORE = ["./","./index.html","./explore.html","./trips.html","./expenses.html","./reports.html","./expense-settings.html","./visa.html","./translate.html","./settings.html","./assets/AppModal-DZQzzWnC.js","./assets/AppModal-DiTqWOWV.css","./assets/ConfirmAction-kDlpBS9n.js","./assets/DayShare-CkhYp8wF.css","./assets/DayShare-DcDolru3.js","./assets/ExpenseSummary-C_fiIBjT.js","./assets/Expenses-CORlAdfy.js","./assets/Explore-C3lLiauQ.css","./assets/Explore-nqWyO1Wt.js","./assets/Map-BJ4kOUbU.js","./assets/Map-CXj_FFHH.css","./assets/PhotoCollection-BgLZbwYf.css","./assets/PhotoCollection-D7Nst_ei.js","./assets/PlacePage-hv1R7HEc.js","./assets/ReceiptGallery-B-TXRN-Q.js","./assets/ReceiptGallery-hj0oPUzc.css","./assets/ReportsPage-BH4dffip.css","./assets/ReportsPage-CZgnpDuH.js","./assets/SettingsPage-B2JaNG18.css","./assets/SettingsPage-CO-0NVx-.js","./assets/TaxFree-PLbK6ENl.js","./assets/TaxiFare-CjPQnRfO.js","./assets/Transit-CHTQ9FUF.js","./assets/Transit-CtfyjyZa.css","./assets/Translation-BcyPUMZs.css","./assets/Translation-DofPI1h4.js","./assets/TripBudgetSplit-DN8FqihS.js","./assets/TripPage-1loT8Yl8.css","./assets/TripPage-D7tHgLyr.js","./assets/VisaForm-_qdcjfjR.js","./assets/VisaPage-BpsjAFd-.js","./assets/VisaPage-DaMO62fw.css","./assets/VisaRows-DcaR8GaC.js","./assets/boot.css","./assets/budget-split-CwAMgBWQ.css","./assets/budget-split-DadkZS9u.js","./assets/expense-pages-CNQ4hwYY.js","./assets/expense-pages-DbL7CqjT.css","./assets/ferries-Brs3ybet.js","./assets/ferries-Clm8MisE.js","./assets/ics-D-5Zwvc5.js","./assets/index-C6xHUsg2.js","./assets/index-DBmSwrlB.js","./assets/index-DO9LwAl_.js","./assets/index-DQxzpg1_.css","./assets/lazy-parts-mhJkHFZ6.js","./assets/mt-worker.js","./assets/ocr-C75tjcsY.js","./assets/ors-key-BIlGmQTy.js","./assets/pack-CBFYygMc.js","./assets/photo-ocr-D6RYNP8y.js","./assets/photo-pdf-D84oQyGg.js","./assets/privacy.css","./assets/report-pdf-Bddic97m.js","./assets/theme-init.js","./assets/transit-BF-bbl2i.js","./assets/tts-arabic.js","./assets/tts-phonemes.js","./assets/tts-pool.js","./assets/tts-worker.js","./assets/use-drag-reorder-BkRSXc8d.js"];
const EXTRA = ["./assets/app-mark.svg","./assets/baklava.webp","./assets/content-pack.json","./assets/hamza-logo-clear.png","./assets/hamza-logo-header.webp","./assets/hamza.webp","./assets/icon-180.png","./assets/icon-192.png","./assets/icon-48.png","./assets/icon-512.png","./assets/icon-maskable-512.png","./assets/icon-monochrome-512.png","./assets/istanbul-B581LxNd.webp","./assets/istanbul-sunrise-N8vxD-H1.webp","./assets/istanbul-sunrise.webp","./assets/istanbul.webp","./assets/manifest.json","./assets/place-placeholder.svg","./assets/readex-arabic.woff2","./assets/readex-latin-ext.woff2","./assets/readex-latin.woff2","./assets/silence.wav","./assets/stitch-istanbul-tram.webp","./assets/stitch-sultanahmet.webp","./assets/visa-official.pdf"];
const NETWORK_FIRST = ["./config.json","./assets/content-pack.json"];
// بصمة محتوى كل ملف مخزَّن مسبقًا (CODE-09): الملف الذي لم تتغيّر بصمته يُنسخ من ذاكرة الإصدار السابق
// بدل تنزيله من جديد، فالتحديث ينزّل ما تغيّر وحده.
const DIGESTS = {"./":"f032ae85b64adb4c","./index.html":"f032ae85b64adb4c","./explore.html":"53e591a2d0dd26cb","./trips.html":"ea154bed779b71fd","./expenses.html":"e67dc23a2c57016d","./reports.html":"440aeb52a861c806","./expense-settings.html":"222dfcb300259a2d","./visa.html":"c089484dbee5c20c","./translate.html":"b0f4f516d7a8f092","./settings.html":"210e2a4df1e3fe46","./assets/AppModal-DZQzzWnC.js":"59fa5d7fd571c62f","./assets/AppModal-DiTqWOWV.css":"99dc16f1aead47a6","./assets/ConfirmAction-kDlpBS9n.js":"5bab51bbab815373","./assets/DayShare-CkhYp8wF.css":"cc19d6e77d03afcf","./assets/DayShare-DcDolru3.js":"5137640831bf0436","./assets/ExpenseSummary-C_fiIBjT.js":"32b9ca6c908d8b3c","./assets/Expenses-CORlAdfy.js":"9429edfca811ca06","./assets/Explore-C3lLiauQ.css":"89082ea411ffbb10","./assets/Explore-nqWyO1Wt.js":"1ce5566ebc7c2500","./assets/Map-BJ4kOUbU.js":"d1ab92d60d9deae8","./assets/Map-CXj_FFHH.css":"7f52547e5cb3a121","./assets/PhotoCollection-BgLZbwYf.css":"cd19d7c98ec51783","./assets/PhotoCollection-D7Nst_ei.js":"3955366b92889e29","./assets/PlacePage-hv1R7HEc.js":"4b515984b67cc4a4","./assets/ReceiptGallery-B-TXRN-Q.js":"bcfef20ca572eb2c","./assets/ReceiptGallery-hj0oPUzc.css":"3cd4491e8d534253","./assets/ReportsPage-BH4dffip.css":"9fabf533082b6aac","./assets/ReportsPage-CZgnpDuH.js":"57d004876f30b08a","./assets/SettingsPage-B2JaNG18.css":"fad223e2df3eb840","./assets/SettingsPage-CO-0NVx-.js":"ca45120132d1a1d9","./assets/TaxFree-PLbK6ENl.js":"4f9db04e96c43484","./assets/TaxiFare-CjPQnRfO.js":"e62e050a6886a7d6","./assets/Transit-CHTQ9FUF.js":"c288fbf54b64d17f","./assets/Transit-CtfyjyZa.css":"89c101d3a5d344a4","./assets/Translation-BcyPUMZs.css":"07f31677005a693d","./assets/Translation-DofPI1h4.js":"8263ef7cffe450ba","./assets/TripBudgetSplit-DN8FqihS.js":"af4e79b256d4a424","./assets/TripPage-1loT8Yl8.css":"7f528116c05eb3b0","./assets/TripPage-D7tHgLyr.js":"6c9454031743ffce","./assets/VisaForm-_qdcjfjR.js":"c2fadb6cd3c09672","./assets/VisaPage-BpsjAFd-.js":"39fe9ff9bec06548","./assets/VisaPage-DaMO62fw.css":"f2a4fe517d91cd3b","./assets/VisaRows-DcaR8GaC.js":"d96abed2d90321e4","./assets/boot.css":"3c7585cf9a12e1b0","./assets/budget-split-CwAMgBWQ.css":"1d85a0f4f6007f01","./assets/budget-split-DadkZS9u.js":"5dc124936cfc2188","./assets/expense-pages-CNQ4hwYY.js":"3dd5f54929c343e4","./assets/expense-pages-DbL7CqjT.css":"9d1f03a195950b8d","./assets/ferries-Brs3ybet.js":"4141df0c2bf384e8","./assets/ferries-Clm8MisE.js":"e3bd7a9cc94e0f37","./assets/ics-D-5Zwvc5.js":"717c41f74e0dcca2","./assets/index-C6xHUsg2.js":"c8b748e5accdfebe","./assets/index-DBmSwrlB.js":"cc15222426500c30","./assets/index-DO9LwAl_.js":"44349af99ffe03f3","./assets/index-DQxzpg1_.css":"0a0ba48bf792ef96","./assets/lazy-parts-mhJkHFZ6.js":"632722cef57275fb","./assets/mt-worker.js":"efc5207cd04c954b","./assets/ocr-C75tjcsY.js":"6d998ccbf351db7f","./assets/ors-key-BIlGmQTy.js":"9dff21e5692b4e3e","./assets/pack-CBFYygMc.js":"aeee7a17f3c9311f","./assets/photo-ocr-D6RYNP8y.js":"3d91db0e40c676f2","./assets/photo-pdf-D84oQyGg.js":"43183ef255bfa1f5","./assets/privacy.css":"cb44173533eca679","./assets/report-pdf-Bddic97m.js":"cf49e3f03cdea72d","./assets/theme-init.js":"a5c39e81359e77ef","./assets/transit-BF-bbl2i.js":"1b8be30f178de44b","./assets/tts-arabic.js":"612fddcc97ee6d8e","./assets/tts-phonemes.js":"21d4a9b35ab7e8d4","./assets/tts-pool.js":"9a274afba002ee22","./assets/tts-worker.js":"9c3cecb7e548e33e","./assets/use-drag-reorder-BkRSXc8d.js":"23720140500a3e0c","./assets/app-mark.svg":"063f14f52e45cad8","./assets/baklava.webp":"e68a2be137641c38","./assets/content-pack.json":"23a41c56ee5d9ae0","./assets/hamza-logo-clear.png":"ddd9d7465cbda0ba","./assets/hamza-logo-header.webp":"68a6df733beeb1b1","./assets/hamza.webp":"aea2501f1147ad96","./assets/icon-180.png":"68a03439f8c18a14","./assets/icon-192.png":"0d6bbc2f6aa55617","./assets/icon-48.png":"81ed061f1c322872","./assets/icon-512.png":"20d1ad5cf673534d","./assets/icon-maskable-512.png":"d5eda75fdfaa3e26","./assets/icon-monochrome-512.png":"da82d7a148b2026d","./assets/istanbul-B581LxNd.webp":"dda52f03eee0dd63","./assets/istanbul-sunrise-N8vxD-H1.webp":"3ade9ef893cdc76f","./assets/istanbul-sunrise.webp":"3ade9ef893cdc76f","./assets/istanbul.webp":"dda52f03eee0dd63","./assets/manifest.json":"7adf240da13ce18d","./assets/place-placeholder.svg":"1f5a112d3baecb5e","./assets/readex-arabic.woff2":"1a432d26fc51264a","./assets/readex-latin-ext.woff2":"fd95c16683e2018b","./assets/readex-latin.woff2":"87022255400cd42a","./assets/silence.wav":"56d4af65701c26df","./assets/stitch-istanbul-tram.webp":"c04ce519197f7e91","./assets/stitch-sultanahmet.webp":"894c79f23b4f941e","./assets/visa-official.pdf":"0f8599d32b37518a"};
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
