/* Visitor analytics (Google Analytics 4). Set GA_ID below to the property's measurement ID (G-XXXXXXXXXX).
   With no ID set, nothing loads and track() is a no-op. GA4's own "enhanced measurement" adds page views,
   scroll depth, outbound link clicks and file downloads; the events below add how the pages are used. */
window.GA_ID = window.GA_ID || '';
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
window.track = function (name, params) { if (window.GA_ID) gtag('event', name, params || {}); };
(function () {
  if (!window.GA_ID) return;
  var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + window.GA_ID; document.head.appendChild(s);
  gtag('js', new Date()); gtag('config', window.GA_ID, { send_page_view: true });
  // time on page in 30 s heartbeats, so engagement shows up even for a single page visit
  var t = 0; setInterval(function () { if (document.visibilityState === 'visible') { t += 30; gtag('event', 'heartbeat', { seconds_on_page: t, page_path: location.pathname }); } }, 30000);
  // which in-page section the visitor reached (main page headings with ids)
  if ('IntersectionObserver' in window) { var seen = {}; var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && !seen[e.target.id]) { seen[e.target.id] = 1; gtag('event', 'section_view', { section: e.target.id, page_path: location.pathname }); } }); }, { threshold: 0.3 });
    document.querySelectorAll('section[id], h2[id]').forEach(function (el) { io.observe(el); }); }
})();
// generic: every video play on a page, and every link click (GA4 also records outbound clicks on its own)
document.addEventListener('play', function (e) { var v = e.target; if (v && v.tagName === 'VIDEO') window.track('play_video', { src: (v.currentSrc || v.src || '').split('/').slice(-3).join('/'), page_path: location.pathname }); }, true);
document.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('a[href]'); if (a) window.track('link_click', { href: a.getAttribute('href'), text: (a.textContent || '').trim().slice(0, 60), page_path: location.pathname }); }, true);
