// قالب عامل الخدمة. تملأ scripts/sw-builder.mjs القيم الثلاث عند البناء.
// يخزّن ملفات التطبيق العامة من الأصل نفسه فقط: لا خرائط ولا صور خارجية ولا /auth/ ولا Drive.
const CACHE = "turkey-v2-5e25cd1dc1d8";
const CORE = ["./","./index.html","./explore.html","./trips.html","./expenses.html","./reports.html","./expense-settings.html","./visa.html","./translate.html","./settings.html","./assets/AppModal-CJtMNTF3.js","./assets/AppModal-DbWGENvQ.css","./assets/ArrowSquareOut.es-B6kg-_F6.js","./assets/ArrowUp.es-DWEyHCYT.js","./assets/Bed.es-3ukCt_c6.js","./assets/Camera.es-B3kVU6DZ.js","./assets/ConfirmAction-CdfGWswN.js","./assets/Copy.es-BpHEDZU2.js","./assets/DownloadSimple.es-BPchHCfC.js","./assets/Expenses-DEoYl8kv.js","./assets/Explore-BTjlgp4e.js","./assets/Map-CIGW-MKW.css","./assets/Map-gWkGGDfN.js","./assets/MapTrifold.es-tJ0qRqhm.js","./assets/PushPin.es-BgjLDAoZ.js","./assets/ReportsPage-BFge73cS.js","./assets/SettingsPage-C_Lso5je.js","./assets/SettingsPage-DfblZRdl.css","./assets/Transit-DENr6gY6.css","./assets/Transit-DPR_trQh.js","./assets/Translation-CvmlTHLn.js","./assets/Translation-X8vel6LA.css","./assets/TripsPage-BO2b8XjQ.js","./assets/VisaForm-j2hIr7ps.js","./assets/VisaPage-CnH6464n.js","./assets/boot.css","./assets/deepl-key-Z6vVo584.js","./assets/ferries-Brs3ybet.js","./assets/ferries-CJaqHee6.js","./assets/index-BX1v-fq3.js","./assets/index-C-Fxm7Dh.css","./assets/index-C6xHUsg2.js","./assets/index-DcYA1123.js","./assets/lazy-parts-DwAiShQ4.js","./assets/ocr-DAxaqKxn.js","./assets/report-pdf-DVZQSiLj.js","./assets/split-Cw0H2P12.js","./assets/theme-init.js","./assets/tts-arabic.js","./assets/tts-phonemes.js","./assets/tts-worker.js"];
const EXTRA = ["./assets/baklava.webp","./assets/baloo-arabic.woff2","./assets/baloo-latin-ext.woff2","./assets/baloo-latin.woff2","./assets/hamza-logo-clear.png","./assets/hamza-logo-header.webp","./assets/hamza.webp","./assets/icon-180.png","./assets/icon-192.png","./assets/icon-48.png","./assets/icon-512.png","./assets/icon-maskable-512.png","./assets/icon-monochrome-512.png","./assets/istanbul-B581LxNd.webp","./assets/istanbul-sunrise-N8vxD-H1.webp","./assets/istanbul-sunrise.webp","./assets/istanbul.webp","./assets/manifest.json","./assets/marhey-arabic.woff2","./assets/marhey-latin-ext.woff2","./assets/marhey-latin.woff2","./assets/silence.wav","./assets/visa-official.pdf"];
const NETWORK_FIRST = ["./config.json"];
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

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await Promise.all(CORE.map((file) => cache.add(fresh(file))));
      await Promise.allSettled(EXTRA.map((file) => cache.add(fresh(file))));
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

async function readReleases(meta) {
  try {
    const saved = await meta.match(META_KEY);
    return saved ? await saved.json() : null;
  } catch {
    return null;
  }
}

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
