// قالب عامل الخدمة. تملأ scripts/sw-builder.mjs القيم عند البناء.
// يخزّن ملفات التطبيق العامة من الأصل نفسه فقط: لا خرائط ولا صور خارجية ولا /auth/ ولا Drive.
const CACHE = "turkey-v2-3bc7458152f2";
const CORE = ["./","./index.html","./explore.html","./trips.html","./expenses.html","./reports.html","./expense-settings.html","./visa.html","./translate.html","./settings.html","./assets/AppModal-CKxgtxKT.js","./assets/AppModal-DiTqWOWV.css","./assets/ConfirmAction-DvMx6xxJ.js","./assets/DayShare-CkhYp8wF.css","./assets/DayShare-CqCvcq9w.js","./assets/ExpenseSummary-DVC9DIgm.js","./assets/Expenses-WLF_qxXD.js","./assets/Explore-C3lLiauQ.css","./assets/Explore-q0IuM716.js","./assets/Map-CXj_FFHH.css","./assets/Map-roUfzbKU.js","./assets/PhotoCollection-1A8d7l0J.js","./assets/PhotoCollection-BgLZbwYf.css","./assets/PlacePage-BgKcF7vG.js","./assets/ReceiptGallery-CYU_NR51.js","./assets/ReceiptGallery-hj0oPUzc.css","./assets/ReportsPage-CwLsO2-l.js","./assets/ReportsPage-DNjoP3Wd.css","./assets/SettingsPage-B2JaNG18.css","./assets/SettingsPage-BFuVlg4u.js","./assets/TaxFree-B2jXhuJU.js","./assets/TaxiFare-BedVDvu8.js","./assets/Transit-CgHC0eVz.js","./assets/Transit-CtfyjyZa.css","./assets/Translation-BcyPUMZs.css","./assets/Translation-g6eaVlL_.js","./assets/TripBudgetSplit-DoCj1Azx.js","./assets/TripPage-CtoyeDZU.js","./assets/TripPage-ew_FR8iZ.css","./assets/VisaForm-BCD6e6Sd.js","./assets/VisaPage-DaMO62fw.css","./assets/VisaPage-qnrnWade.js","./assets/VisaRows-BWVs3DBj.js","./assets/boot.css","./assets/budget-split-CwAMgBWQ.css","./assets/budget-split-DLeO_lkI.js","./assets/expense-pages-D6TCJhe_.js","./assets/expense-pages-DbL7CqjT.css","./assets/ferries-Brs3ybet.js","./assets/ferries-yvSxvJpp.js","./assets/ics-D-5Zwvc5.js","./assets/index-BT1HO841.css","./assets/index-C-2hv7f6.js","./assets/index-C6xHUsg2.js","./assets/index-CxyfTvUe.js","./assets/lazy-parts-DTXbm-G8.js","./assets/mt-worker.js","./assets/ocr-BkG8Rw6b.js","./assets/ors-key-BOz33IEI.js","./assets/pack-CDGusZb1.js","./assets/photo-ocr-D_UMb9_M.js","./assets/photo-pdf-arNYwAzs.js","./assets/privacy.css","./assets/report-pdf-CzQaovDC.js","./assets/theme-init.js","./assets/transit-nHbXD-fm.js","./assets/tts-arabic.js","./assets/tts-phonemes.js","./assets/tts-pool.js","./assets/tts-worker.js","./assets/use-drag-reorder-CTmZalXY.js"];
const EXTRA = ["./assets/app-mark.svg","./assets/baklava.webp","./assets/content-pack.json","./assets/hamza-logo-clear.png","./assets/hamza-logo-header.webp","./assets/hamza.webp","./assets/icon-180.png","./assets/icon-192.png","./assets/icon-48.png","./assets/icon-512.png","./assets/icon-maskable-512.png","./assets/icon-monochrome-512.png","./assets/istanbul-B581LxNd.webp","./assets/istanbul-sunrise-N8vxD-H1.webp","./assets/istanbul-sunrise.webp","./assets/istanbul.webp","./assets/manifest.json","./assets/place-placeholder.svg","./assets/readex-arabic.woff2","./assets/readex-latin-ext.woff2","./assets/readex-latin.woff2","./assets/silence.wav","./assets/stitch-istanbul-tram.webp","./assets/stitch-sultanahmet.webp","./assets/visa-official.pdf"];
const NETWORK_FIRST = ["./config.json","./assets/content-pack.json"];
// بصمة محتوى كل ملف مخزَّن مسبقًا (CODE-09): الملف الذي لم تتغيّر بصمته يُنسخ من ذاكرة الإصدار السابق
// بدل تنزيله من جديد، فالتحديث ينزّل ما تغيّر وحده.
const DIGESTS = {"./":"d32609adc0416c7c","./index.html":"d32609adc0416c7c","./explore.html":"c04fa7580e0183b7","./trips.html":"4fe530b5197f5257","./expenses.html":"6022ad479f274225","./reports.html":"bf4d898315f96444","./expense-settings.html":"f03c6139fe30852a","./visa.html":"c7c88227de393a5d","./translate.html":"37fb01325fc6af86","./settings.html":"3d2df641e9dfc8bf","./assets/AppModal-CKxgtxKT.js":"f02c6a832072e77f","./assets/AppModal-DiTqWOWV.css":"99dc16f1aead47a6","./assets/ConfirmAction-DvMx6xxJ.js":"abb19a1cc46e087b","./assets/DayShare-CkhYp8wF.css":"cc19d6e77d03afcf","./assets/DayShare-CqCvcq9w.js":"2bc0b7bf13a7d199","./assets/ExpenseSummary-DVC9DIgm.js":"98f153cd9883075b","./assets/Expenses-WLF_qxXD.js":"c86a387fcd923ad4","./assets/Explore-C3lLiauQ.css":"89082ea411ffbb10","./assets/Explore-q0IuM716.js":"71d9c1c77e897fdd","./assets/Map-CXj_FFHH.css":"7f52547e5cb3a121","./assets/Map-roUfzbKU.js":"28b1c3f71827ce11","./assets/PhotoCollection-1A8d7l0J.js":"62a87b3580427132","./assets/PhotoCollection-BgLZbwYf.css":"cd19d7c98ec51783","./assets/PlacePage-BgKcF7vG.js":"5762ac688dcb5b2c","./assets/ReceiptGallery-CYU_NR51.js":"707979c65ba80db1","./assets/ReceiptGallery-hj0oPUzc.css":"3cd4491e8d534253","./assets/ReportsPage-CwLsO2-l.js":"c800424887dbf4ef","./assets/ReportsPage-DNjoP3Wd.css":"3e5e9ea7a9a385bb","./assets/SettingsPage-B2JaNG18.css":"fad223e2df3eb840","./assets/SettingsPage-BFuVlg4u.js":"87756c68a6d02aa1","./assets/TaxFree-B2jXhuJU.js":"6b0d331a4e9a557b","./assets/TaxiFare-BedVDvu8.js":"43c0f9bf4ba08c3f","./assets/Transit-CgHC0eVz.js":"9eb3e8ced782f5c0","./assets/Transit-CtfyjyZa.css":"89c101d3a5d344a4","./assets/Translation-BcyPUMZs.css":"07f31677005a693d","./assets/Translation-g6eaVlL_.js":"e1cb3957331f59dc","./assets/TripBudgetSplit-DoCj1Azx.js":"c530eb15d5057c7d","./assets/TripPage-CtoyeDZU.js":"452c6461920b70eb","./assets/TripPage-ew_FR8iZ.css":"f7ad8019a38e9978","./assets/VisaForm-BCD6e6Sd.js":"0a3de0d0595cd8ae","./assets/VisaPage-DaMO62fw.css":"f2a4fe517d91cd3b","./assets/VisaPage-qnrnWade.js":"4744765e8735a242","./assets/VisaRows-BWVs3DBj.js":"8e40456ce6e8ea3d","./assets/boot.css":"3c7585cf9a12e1b0","./assets/budget-split-CwAMgBWQ.css":"1d85a0f4f6007f01","./assets/budget-split-DLeO_lkI.js":"737aa19e038d9d43","./assets/expense-pages-D6TCJhe_.js":"93114f0bf1be514f","./assets/expense-pages-DbL7CqjT.css":"9d1f03a195950b8d","./assets/ferries-Brs3ybet.js":"4141df0c2bf384e8","./assets/ferries-yvSxvJpp.js":"584ef62d4688ed96","./assets/ics-D-5Zwvc5.js":"717c41f74e0dcca2","./assets/index-BT1HO841.css":"e2cb9f0584ee5b21","./assets/index-C-2hv7f6.js":"d73847c673e54a0a","./assets/index-C6xHUsg2.js":"c8b748e5accdfebe","./assets/index-CxyfTvUe.js":"d775890b75a8ca89","./assets/lazy-parts-DTXbm-G8.js":"fdd3226bbb15d26d","./assets/mt-worker.js":"efc5207cd04c954b","./assets/ocr-BkG8Rw6b.js":"713386c7c97bbf89","./assets/ors-key-BOz33IEI.js":"45720d739027bddf","./assets/pack-CDGusZb1.js":"647d7bf395c4c05b","./assets/photo-ocr-D_UMb9_M.js":"c11b1c1d9570ccfa","./assets/photo-pdf-arNYwAzs.js":"1d1773557ee7a50a","./assets/privacy.css":"cb44173533eca679","./assets/report-pdf-CzQaovDC.js":"46cc6b2888cb716c","./assets/theme-init.js":"a5c39e81359e77ef","./assets/transit-nHbXD-fm.js":"48aae7e9e4319543","./assets/tts-arabic.js":"612fddcc97ee6d8e","./assets/tts-phonemes.js":"21d4a9b35ab7e8d4","./assets/tts-pool.js":"9a274afba002ee22","./assets/tts-worker.js":"9c3cecb7e548e33e","./assets/use-drag-reorder-CTmZalXY.js":"8d5ad4aa2a1b1276","./assets/app-mark.svg":"063f14f52e45cad8","./assets/baklava.webp":"e68a2be137641c38","./assets/content-pack.json":"23a41c56ee5d9ae0","./assets/hamza-logo-clear.png":"ddd9d7465cbda0ba","./assets/hamza-logo-header.webp":"68a6df733beeb1b1","./assets/hamza.webp":"aea2501f1147ad96","./assets/icon-180.png":"68a03439f8c18a14","./assets/icon-192.png":"0d6bbc2f6aa55617","./assets/icon-48.png":"81ed061f1c322872","./assets/icon-512.png":"20d1ad5cf673534d","./assets/icon-maskable-512.png":"d5eda75fdfaa3e26","./assets/icon-monochrome-512.png":"da82d7a148b2026d","./assets/istanbul-B581LxNd.webp":"dda52f03eee0dd63","./assets/istanbul-sunrise-N8vxD-H1.webp":"3ade9ef893cdc76f","./assets/istanbul-sunrise.webp":"3ade9ef893cdc76f","./assets/istanbul.webp":"dda52f03eee0dd63","./assets/manifest.json":"7adf240da13ce18d","./assets/place-placeholder.svg":"1f5a112d3baecb5e","./assets/readex-arabic.woff2":"1a432d26fc51264a","./assets/readex-latin-ext.woff2":"fd95c16683e2018b","./assets/readex-latin.woff2":"87022255400cd42a","./assets/silence.wav":"56d4af65701c26df","./assets/stitch-istanbul-tram.webp":"c04ce519197f7e91","./assets/stitch-sultanahmet.webp":"894c79f23b4f941e","./assets/visa-official.pdf":"0f8599d32b37518a"};
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
