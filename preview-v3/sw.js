// قالب عامل الخدمة. تملأ scripts/sw-builder.mjs القيم عند البناء.
// يخزّن ملفات التطبيق العامة من الأصل نفسه فقط: لا خرائط ولا صور خارجية ولا /auth/ ولا Drive.
const CACHE = "turkey-v2-313723642740";
const CORE = ["./","./index.html","./explore.html","./trips.html","./expenses.html","./reports.html","./expense-settings.html","./visa.html","./translate.html","./settings.html","./assets/Airplane.es-CLG-zer8.js","./assets/AppModal-BTz1_xDQ.js","./assets/AppModal-DHw8UBq6.css","./assets/ArrowRight.es-BL2PWfvw.js","./assets/ArrowUp.es-DUhNhs09.js","./assets/ArrowUpRight.es-C261CJ_c.js","./assets/Camera.es-BVt2xQng.js","./assets/CaretDown.es-CYi6bBap.js","./assets/ChartBar.es-D1Mf8E9h.js","./assets/ConfirmAction-Cplvf3ri.js","./assets/Copy.es-iD9XDlU2.js","./assets/CreditCard.es-Bf4_OzgC.js","./assets/Crosshair.es-Bo3TVE48.js","./assets/DayShare-CkhYp8wF.css","./assets/DayShare-DugN1tKI.js","./assets/DotsThree.es-CrQaA9vD.js","./assets/DownloadSimple.es-qklzoCCZ.js","./assets/ExpenseSummary-DudCUUpu.js","./assets/Expenses-yFtc2t6z.js","./assets/Explore-DPTuyLep.js","./assets/Explore-lELCXKZG.css","./assets/FilePdf.es-BqWYvv3a.js","./assets/ListBullets.es-HK7YK40d.js","./assets/Map-BmYfatVU.js","./assets/Map-CXj_FFHH.css","./assets/MapTrifold.es-Bu1VKtjX.js","./assets/PencilSimple.es-BMDFLwnG.js","./assets/PhotoCollection-CWvzlh1A.js","./assets/PhotoCollection-TeNGP6hQ.css","./assets/PlacePage-CmPeUFLS.js","./assets/ReceiptGallery-BiHcugze.js","./assets/ReceiptGallery-CBivcRtC.css","./assets/ReportsPage-BxLcs3Tj.js","./assets/ReportsPage-Z7Nbv6Ha.css","./assets/Scan.es-09ed7HYi.js","./assets/SettingsPage-Ceieweee.js","./assets/SettingsPage-tcPZ7Aea.css","./assets/ShareNetwork.es-DIhSSqVC.js","./assets/SlidersHorizontal.es-Dp-e42hR.js","./assets/Tag.es-CXPou7EM.js","./assets/TaxFree-C9gp92xJ.js","./assets/TaxiFare-_AHRHqPL.js","./assets/Transit-ByYjQD2l.js","./assets/Transit-DKbYcXWA.css","./assets/Translation-CKYio-7H.css","./assets/Translation-DtgeEp1b.js","./assets/Trash.es-p7EE1cuo.js","./assets/TripBudgetSplit-YL1B02Em.js","./assets/TripPage-3ElYsaAV.js","./assets/TripPage-DdCTazQ-.css","./assets/Users.es-Dl6WUh4a.js","./assets/VisaForm-CYP4YPB6.js","./assets/VisaPage-CmvRIKqk.css","./assets/VisaPage-CnjFlWIE.js","./assets/VisaRows-wrWsZ5wo.js","./assets/Warning.es-BgCvlApB.js","./assets/WarningCircle.es-iwK3l67a.js","./assets/boot.css","./assets/budget-split-BCfZrQo2.js","./assets/budget-split-CwAMgBWQ.css","./assets/expense-pages-CGu6yZ5z.js","./assets/expense-pages-CzoNeTJC.css","./assets/ferries-Brs3ybet.js","./assets/ferries-CRrkux4y.js","./assets/ics-Dv_dOjUq.js","./assets/index-Bq4qkQ2Q.js","./assets/index-C6xHUsg2.js","./assets/index-CITVX8mP.css","./assets/index-T_cXMq2s.js","./assets/lazy-parts-Bei6xtSQ.js","./assets/mt-worker.js","./assets/ocr-Mp1vXVSe.js","./assets/ors-key-COA5oN8x.js","./assets/pack-DlmiUUOr.js","./assets/photo-ocr-Dlxgn8eS.js","./assets/photo-pdf-CzH0Q7c5.js","./assets/privacy.css","./assets/report-pdf-Cqt5DBRU.js","./assets/theme-init.js","./assets/transit-CUDdB4pE.js","./assets/tts-arabic.js","./assets/tts-phonemes.js","./assets/tts-pool.js","./assets/tts-worker.js","./assets/use-drag-reorder-DUby5rs_.js"];
const EXTRA = ["./assets/app-mark.svg","./assets/baklava.webp","./assets/content-pack.json","./assets/hamza-logo-clear.png","./assets/hamza-logo-header.webp","./assets/hamza.webp","./assets/icon-180.png","./assets/icon-192.png","./assets/icon-48.png","./assets/icon-512.png","./assets/icon-maskable-512.png","./assets/icon-monochrome-512.png","./assets/istanbul-B581LxNd.webp","./assets/istanbul-sunrise-N8vxD-H1.webp","./assets/istanbul-sunrise.webp","./assets/istanbul.webp","./assets/manifest.json","./assets/place-placeholder.svg","./assets/readex-arabic.woff2","./assets/readex-latin-ext.woff2","./assets/readex-latin.woff2","./assets/silence.wav","./assets/visa-official.pdf"];
const NETWORK_FIRST = ["./config.json","./assets/content-pack.json"];
// بصمة محتوى كل ملف مخزَّن مسبقًا (CODE-09): الملف الذي لم تتغيّر بصمته يُنسخ من ذاكرة الإصدار السابق
// بدل تنزيله من جديد، فالتحديث ينزّل ما تغيّر وحده.
const DIGESTS = {"./":"8d6ecb4ff792fbf0","./index.html":"8d6ecb4ff792fbf0","./explore.html":"7b48dbcad111e030","./trips.html":"4aeafba02b2109e0","./expenses.html":"bbb1275c22d35301","./reports.html":"f1a49cb9405fb456","./expense-settings.html":"8fc63c235855c3b0","./visa.html":"df66b9d4a97f16d7","./translate.html":"2a0a5c19665f4d8b","./settings.html":"89bbd20c468b7a4f","./assets/Airplane.es-CLG-zer8.js":"3ac1fdaa0c7b2f9a","./assets/AppModal-BTz1_xDQ.js":"7ad1544e98ea077e","./assets/AppModal-DHw8UBq6.css":"d7cb79a48dda8735","./assets/ArrowRight.es-BL2PWfvw.js":"3f30ccd77a8a0912","./assets/ArrowUp.es-DUhNhs09.js":"8294cbe8ce33ed60","./assets/ArrowUpRight.es-C261CJ_c.js":"f321a62e940f746c","./assets/Camera.es-BVt2xQng.js":"bb03f7230eefefdd","./assets/CaretDown.es-CYi6bBap.js":"bb2af56a4dc8d772","./assets/ChartBar.es-D1Mf8E9h.js":"b973244f40918f32","./assets/ConfirmAction-Cplvf3ri.js":"c5ac1e3bf0a7f1d4","./assets/Copy.es-iD9XDlU2.js":"acb866f6ef4f21c5","./assets/CreditCard.es-Bf4_OzgC.js":"db5af1726b23f0ad","./assets/Crosshair.es-Bo3TVE48.js":"2b704537da584179","./assets/DayShare-CkhYp8wF.css":"cc19d6e77d03afcf","./assets/DayShare-DugN1tKI.js":"904bf1fd40f0a7e9","./assets/DotsThree.es-CrQaA9vD.js":"0c849c3737504798","./assets/DownloadSimple.es-qklzoCCZ.js":"545a91cd97243e56","./assets/ExpenseSummary-DudCUUpu.js":"e222cefdac0782d1","./assets/Expenses-yFtc2t6z.js":"dda44c51b06cd90b","./assets/Explore-DPTuyLep.js":"d783c34a1a55c84d","./assets/Explore-lELCXKZG.css":"47cd92470141562d","./assets/FilePdf.es-BqWYvv3a.js":"1ccaea167bdc2d5b","./assets/ListBullets.es-HK7YK40d.js":"25da1b682f4ca901","./assets/Map-BmYfatVU.js":"ec5a4c4317b4f899","./assets/Map-CXj_FFHH.css":"7f52547e5cb3a121","./assets/MapTrifold.es-Bu1VKtjX.js":"2ab991bfb53a436e","./assets/PencilSimple.es-BMDFLwnG.js":"75fec2b32dc4776f","./assets/PhotoCollection-CWvzlh1A.js":"9eb1bf0af158a712","./assets/PhotoCollection-TeNGP6hQ.css":"f7880baa3c934708","./assets/PlacePage-CmPeUFLS.js":"27a5da4077f7a2d8","./assets/ReceiptGallery-BiHcugze.js":"32d3c724047a2494","./assets/ReceiptGallery-CBivcRtC.css":"2ebf340b8536ebd1","./assets/ReportsPage-BxLcs3Tj.js":"65ebc90b81b4a04e","./assets/ReportsPage-Z7Nbv6Ha.css":"35cb4f5333d71bc3","./assets/Scan.es-09ed7HYi.js":"3b2c65ce5f0a937d","./assets/SettingsPage-Ceieweee.js":"79dcce8766b870cf","./assets/SettingsPage-tcPZ7Aea.css":"8c5306158cb1fe21","./assets/ShareNetwork.es-DIhSSqVC.js":"f4ff099d4f6bfeeb","./assets/SlidersHorizontal.es-Dp-e42hR.js":"9e95b0c7ed75d58d","./assets/Tag.es-CXPou7EM.js":"baeae45e7b964cc4","./assets/TaxFree-C9gp92xJ.js":"b0a669b5c6547529","./assets/TaxiFare-_AHRHqPL.js":"6e46920c97bc8919","./assets/Transit-ByYjQD2l.js":"cb7f9e24157818ee","./assets/Transit-DKbYcXWA.css":"74c01129bc91e507","./assets/Translation-CKYio-7H.css":"83c9112efafaa800","./assets/Translation-DtgeEp1b.js":"5ba65880dbbdb3a6","./assets/Trash.es-p7EE1cuo.js":"863b19e8d6a1e112","./assets/TripBudgetSplit-YL1B02Em.js":"18acc777e389b753","./assets/TripPage-3ElYsaAV.js":"83c2a5a798697eaa","./assets/TripPage-DdCTazQ-.css":"1b9c838bde6e8cef","./assets/Users.es-Dl6WUh4a.js":"c45acbaa53a589bc","./assets/VisaForm-CYP4YPB6.js":"e77c461f4b82dac8","./assets/VisaPage-CmvRIKqk.css":"d0da49eae559cb58","./assets/VisaPage-CnjFlWIE.js":"aa972bd41db6c899","./assets/VisaRows-wrWsZ5wo.js":"5ecb7f466b62bab3","./assets/Warning.es-BgCvlApB.js":"896c001c3fd93858","./assets/WarningCircle.es-iwK3l67a.js":"60651f6f33944a58","./assets/boot.css":"3c7585cf9a12e1b0","./assets/budget-split-BCfZrQo2.js":"e1a8f457af2f67f8","./assets/budget-split-CwAMgBWQ.css":"1d85a0f4f6007f01","./assets/expense-pages-CGu6yZ5z.js":"4fe4bd6583b59a55","./assets/expense-pages-CzoNeTJC.css":"59ba97cf551a4b4b","./assets/ferries-Brs3ybet.js":"4141df0c2bf384e8","./assets/ferries-CRrkux4y.js":"3e9e8eb188d8dc78","./assets/ics-Dv_dOjUq.js":"66ea239f2b31d91e","./assets/index-Bq4qkQ2Q.js":"629437b9513ba433","./assets/index-C6xHUsg2.js":"c8b748e5accdfebe","./assets/index-CITVX8mP.css":"aa632dc646328785","./assets/index-T_cXMq2s.js":"bc2b51630de38786","./assets/lazy-parts-Bei6xtSQ.js":"1c70251f3c2209da","./assets/mt-worker.js":"efc5207cd04c954b","./assets/ocr-Mp1vXVSe.js":"4a4c8e7a20a33d9c","./assets/ors-key-COA5oN8x.js":"ea0d71b95eddbda8","./assets/pack-DlmiUUOr.js":"f583bea2c84e637b","./assets/photo-ocr-Dlxgn8eS.js":"f7ba184a58c45b87","./assets/photo-pdf-CzH0Q7c5.js":"0ac610fa4feb5474","./assets/privacy.css":"cb44173533eca679","./assets/report-pdf-Cqt5DBRU.js":"6747ca26eb8d4a1d","./assets/theme-init.js":"b7b5966b5a764913","./assets/transit-CUDdB4pE.js":"5a112ae252f8641f","./assets/tts-arabic.js":"612fddcc97ee6d8e","./assets/tts-phonemes.js":"21d4a9b35ab7e8d4","./assets/tts-pool.js":"9a274afba002ee22","./assets/tts-worker.js":"9c3cecb7e548e33e","./assets/use-drag-reorder-DUby5rs_.js":"41de81d893407e40","./assets/app-mark.svg":"063f14f52e45cad8","./assets/baklava.webp":"e68a2be137641c38","./assets/content-pack.json":"23a41c56ee5d9ae0","./assets/hamza-logo-clear.png":"ddd9d7465cbda0ba","./assets/hamza-logo-header.webp":"68a6df733beeb1b1","./assets/hamza.webp":"aea2501f1147ad96","./assets/icon-180.png":"68a03439f8c18a14","./assets/icon-192.png":"0d6bbc2f6aa55617","./assets/icon-48.png":"81ed061f1c322872","./assets/icon-512.png":"20d1ad5cf673534d","./assets/icon-maskable-512.png":"d5eda75fdfaa3e26","./assets/icon-monochrome-512.png":"da82d7a148b2026d","./assets/istanbul-B581LxNd.webp":"dda52f03eee0dd63","./assets/istanbul-sunrise-N8vxD-H1.webp":"3ade9ef893cdc76f","./assets/istanbul-sunrise.webp":"3ade9ef893cdc76f","./assets/istanbul.webp":"dda52f03eee0dd63","./assets/manifest.json":"7adf240da13ce18d","./assets/place-placeholder.svg":"1f5a112d3baecb5e","./assets/readex-arabic.woff2":"1a432d26fc51264a","./assets/readex-latin-ext.woff2":"fd95c16683e2018b","./assets/readex-latin.woff2":"87022255400cd42a","./assets/silence.wav":"56d4af65701c26df","./assets/visa-official.pdf":"0f8599d32b37518a"};
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
