/* CLEANNOVA — Product detail: showroom, decor nền, animation khi cuộn. Chỉ thêm phần tử trang trí. */
(function () {
  'use strict';
  var body = document.body; body.classList.add('pdp');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var METAL = '<defs><linearGradient id="pdpMetal" x1="0" x2="1"><stop offset="0" stop-color="#E6CD97" stop-opacity=".1"/><stop offset=".35" stop-color="#E6CD97"/><stop offset=".65" stop-color="#C5A059"/><stop offset="1" stop-color="#B89243" stop-opacity=".15"/></linearGradient></defs>';
  var CURVE = '<path d="M0 420 C 200 300, 360 520, 620 360 S 900 120, 1100 200"/><path d="M0 470 C 220 350, 380 560, 640 400 S 920 160, 1100 250"/><path d="M0 380 C 200 260, 360 480, 620 320 S 900 80, 1100 160"/>';

  function bg() {
    var main = $('main.container'); if (!main || $('.pdp-bg', main)) return;
    var d = document.createElement('div'); d.className = 'pdp-bg'; d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<i class="orb o1"></i><i class="orb o2"></i><i class="halo"></i><i class="grid"></i>' +
      '<svg class="cl" viewBox="0 0 1100 560" focusable="false">' + METAL + CURVE + '</svg><svg class="cr" viewBox="0 0 1100 560" focusable="false">' + CURVE + '</svg>';
    main.insertBefore(d, main.firstChild);
  }

  function stage() {
    var g = $('.gallery-sticky'); if (!g || g.__pdp) return; g.__pdp = 1;
    g.insertAdjacentHTML('afterbegin', '<div class="pdp-stage" aria-hidden="true"><i class="spot"></i><i class="ring r1"></i><i class="ring r2"></i><b></b><b></b><b></b><b></b><b></b><b></b></div>');
    var P = 'M0 24 C 90 4, 160 44, 260 24 S 420 6, 520 24';
    g.insertAdjacentHTML('beforeend', '<div class="pdp-sweep" aria-hidden="true"><svg viewBox="0 0 520 48" preserveAspectRatio="none" focusable="false"><path class="w" d="' + P + '"/><path class="p" d="' + P + '"/>' +
      '<g class="bot"><circle r="8" fill="#fff" stroke="#C5A059" stroke-width="1.5"/><circle r="2.6" fill="#C5A059"/><path d="M-4-6A8 8 0 0 1 4-6" fill="none" stroke="#E6CD97" stroke-width="1.2"/></g></svg></div>');
    var img = $('#main-product-img'); if (!img) return;
    var play = function () { img.classList.remove('pdp-in'); void img.offsetWidth; img.classList.add('pdp-in'); };
    img.addEventListener('load', play); img.addEventListener('error', play);
    if (img.complete && img.getAttribute('src')) play();
    setTimeout(function () { if (!img.classList.contains('pdp-in')) img.classList.add('pdp-in'); }, 2500);
  }

  function tech() {
    var grid = $('.detail-grid'); if (!grid || $('.pdp-tech')) return;
    var items = ['Nhận diện vật cản AI 3D', 'Lực hút 8.000 Pa', 'Tự giặt giẻ lau', 'Tự sấy giẻ lau', 'Bộ lọc HEPA', 'Tự thu gom bụi', 'Lau nhà thông minh', 'Nhà sạch, người nhàn'];
    var one = items.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    var d = document.createElement('div'); d.className = 'pdp-tech'; d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<div class="pdp-tech-track">' + one + one + one + one + '</div>';
    grid.parentNode.insertBefore(d, grid.nextSibling);
  }

  /* Xuất hiện lần lượt */
  var GROUPS = ['.detail-badge-row', '.detail-title', '.detail-rating-row', '.detail-price-box', '.detail-specs-grid > *', '#detail-desc', '.detail-features-box', '.detail-feature-item', '.detail-actions-box', '.detail-trust-row > *',
    '.section-header', '.value-grid > *', '#detail-specs-table tr'];
  var io = ('IntersectionObserver' in window && !reduce) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('pdp-vis'); io.unobserve(e.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' }) : null;
  function reveal() {
    if (!io) return;
    GROUPS.forEach(function (sel) {
      $$(sel).forEach(function (el, i) {
        if (el.__pdpr) return; el.__pdpr = 1;
        el.style.setProperty('--pi', Math.min(i, 8));
        el.classList.add('pdp-pre'); io.observe(el);
      });
    });
  }

  function run() { bg(); stage(); tech(); reveal(); }
  run();
  var t; new MutationObserver(function () { clearTimeout(t); t = setTimeout(run, 80); }).observe(body, { childList: true, subtree: true });
})();
