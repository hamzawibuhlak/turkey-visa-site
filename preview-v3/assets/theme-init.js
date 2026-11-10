// يطبّق المظهر قبل رسم الصفحة فلا يظهر وميض مظهر خاطئ. ملف خارجي لأن CSP يمنع السكربت المضمَّن.
// المنطق نفسه في src/theme.js (resolveTheme وthemeColor)؛ tests/theme.test.mjs يقارنهما.
(function () {
  try {
    var mode = localStorage.getItem('tg-theme');
    var dark =
      mode === 'dark' ||
      (mode === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var theme = dark ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f6f8fc' : '#101d30');
  } catch (e) {
    // التخزين محجوب: يبقى المظهر الافتراضي حتى يطبّقه التطبيق.
  }
})();
