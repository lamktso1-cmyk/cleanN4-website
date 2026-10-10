/* ==========================================================================
   CLEANNOVA — DECOR SYSTEM (js)
   Gắn decor đồng bộ cho MỌI trang: nền toàn trang · dải giữa các section · ornament tiêu đề ·
   decor theo khối (header/hero/banner/main/footer/login/admin/chatbot) · góc thẻ.
   Chỉ thêm phần tử trang trí (aria-hidden, pointer-events:none). Không đụng logic nghiệp vụ.
   ========================================================================== */
(function () {
  'use strict';
  var body = document.body;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var uid = 0;

  /* ── Template ── */
  var SPARK = 'M0-10 L2.6-2.6 L10 0 L2.6 2.6 L0 10 L-2.6 2.6 L-10 0 L-2.6-2.6Z';
  var DEFS = '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
    '<linearGradient id="cnDivG" x1="0" x2="1"><stop offset="0" stop-color="#C5A059" stop-opacity="0"/><stop offset=".3" stop-color="#C5A059" stop-opacity=".7"/><stop offset=".5" stop-color="#E6CD97"/><stop offset=".7" stop-color="#C5A059" stop-opacity=".7"/><stop offset="1" stop-color="#C5A059" stop-opacity="0"/></linearGradient>' +
    '<linearGradient id="cnOrnL" gradientUnits="userSpaceOnUse" x1="0" x2="52" y1="0" y2="0"><stop offset="0" stop-color="#C5A059" stop-opacity="0"/><stop offset="1" stop-color="#C5A059"/></linearGradient>' +
    '<linearGradient id="cnOrnR" gradientUnits="userSpaceOnUse" x1="80" x2="132" y1="0" y2="0"><stop offset="0" stop-color="#C5A059"/><stop offset="1" stop-color="#C5A059" stop-opacity="0"/></linearGradient>' +
    '<linearGradient id="cnSilk" x1="0" x2="1"><stop offset="0" stop-color="#E6CD97" stop-opacity="0"/><stop offset=".45" stop-color="#E6CD97" stop-opacity=".6"/><stop offset=".72" stop-color="#C5A059" stop-opacity=".35"/><stop offset="1" stop-color="#C5A059" stop-opacity="0"/></linearGradient>' +
    '</defs></svg>';

  var BOT = '<g class="bot"><circle r="8.5" fill="#fff" stroke="#C5A059" stroke-width="1.5"/><circle r="2.8" fill="#C5A059"/><path d="M-4-6.4A8.5 8.5 0 0 1 4-6.4" fill="none" stroke="#E6CD97" stroke-width="1.3"/></g>';
  var WAVE = 'M0 30 C 160 6, 300 54, 520 30 S 900 6, 1120 30 S 1340 52, 1440 26';

  function divider(delay) {
    var d = document.createElement('div');
    d.className = 'cn-divider'; d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<div class="cn-divider-in"><svg viewBox="0 0 1440 56" focusable="false">' +
      '<path class="wake" style="animation-delay:' + delay + 's" d="' + WAVE + '"/>' +
      '<path class="ln a" d="' + WAVE + '"/>' +
      '<path class="ln b" d="M0 36 C 180 14, 320 58, 540 36 S 920 14, 1130 36 S 1350 56, 1440 32"/>' +
      '<g transform="translate(720 30)"><path class="gem" d="' + SPARK + '" transform="scale(1.15)"/></g>' +
      '<circle class="gem" cx="676" cy="30" r="2.2"/><circle class="gem" cx="764" cy="30" r="2.2"/>' +
      '<circle class="gem o" cx="640" cy="30" r="3.4"/><circle class="gem o" cx="800" cy="30" r="3.4"/>' +
      BOT.replace('class="bot"', 'class="bot" style="animation-delay:' + delay + 's"') + '</svg></div>';
    return d;
  }

  var ORN = '<span class="cn-orn %c" aria-hidden="true"><svg viewBox="0 0 132 16" focusable="false"><path class="o1" d="M0 8 H52"/><g transform="translate(66 8)"><path class="sp" d="' + SPARK.replace(/(-?\d+\.?\d*)/g, function (n) { return (+n * 0.7).toFixed(1); }) + '"/></g><path class="o2" d="M80 8 H132"/><circle cx="58" cy="8" r="1.4" fill="#C5A059" stroke="none"/><circle cx="74" cy="8" r="1.4" fill="#C5A059" stroke="none"/></svg></span>';

  var CORNER = '<svg class="cn-corner" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><circle cx="100" cy="0" r="38"/><circle cx="100" cy="0" r="58"/><circle cx="100" cy="0" r="78" opacity=".5"/><path class="sp" transform="translate(66 22) scale(.55)" d="' + SPARK + '"/></svg>';

  function arcs(pos, spin) {
    return '<svg class="cn-arcs ' + pos + (spin ? ' spin' : '') + '" viewBox="0 0 520 520" aria-hidden="true" focusable="false"><circle cx="260" cy="260" r="250"/><circle cx="260" cy="260" r="205"/><circle cx="260" cy="260" r="160"/></svg>';
  }
  function ribbon(pos) {
    var i = ++uid;
    var g = '<linearGradient id="cnr' + i + '" x1="0" x2="1"><stop offset="0" stop-color="#E6CD97" stop-opacity="0"/><stop offset=".45" stop-color="#E6CD97" stop-opacity=".55"/><stop offset=".72" stop-color="#C5A059" stop-opacity=".32"/><stop offset="1" stop-color="#C5A059" stop-opacity="0"/></linearGradient>';
    return '<div class="cn-ribbon ' + pos + '"><svg viewBox="0 0 1200 120" preserveAspectRatio="none" focusable="false"><defs>' + g + '</defs>' +
      '<path d="M0 70 C 200 10, 380 110, 620 60 S 1000 10, 1200 50 L1200 76 C 1000 40, 820 100, 600 88 S 200 40, 0 94Z" fill="url(#cnr' + i + ')"/>' +
      '<path d="M0 92 C 240 40, 420 112, 660 82 S 1020 40, 1200 72 L1200 84 C 1020 56, 860 104, 640 98 S 240 62, 0 102Z" fill="url(#cnr' + i + ')" opacity=".7"/></svg></div>';
  }
  function trail(pos) {
    var P = 'M0 100 C 200 30, 340 40, 520 96 S 860 150, 1040 70 S 1300 36, 1440 90';
    return '<div class="cn-trail ' + pos + '"><svg viewBox="0 0 1440 160" preserveAspectRatio="none" focusable="false"><path class="w" d="' + P + '"/><path class="p" d="' + P + '"/>' + BOT + '</svg></div>';
  }
  function spark(style, cls) { return '<i class="cn-spark ' + (cls || '') + '" style="' + style + '"></i>'; }
  function sparks(set) {
    var sets = {
      a: [['left:2.5%;top:20%', 'l'], ['right:9%;top:30%;animation-delay:-1.4s', ''], ['right:24%;bottom:18%;animation-delay:-3s', 's'], ['left:30%;bottom:12%;animation-delay:-2.2s', 's']],
      b: [['right:7%;top:18%', 'l'], ['left:10%;top:40%;animation-delay:-1.8s', 's'], ['left:34%;bottom:14%;animation-delay:-3.2s', ''], ['right:28%;top:12%;animation-delay:-.8s', 's']],
      c: [['right:14px;top:14px', 's'], ['right:36px;top:30px;animation-delay:-2s', 's'], ['left:18px;bottom:16px;animation-delay:-3.4s', 's']]
    };
    return (sets[set] || sets.a).map(function (s) { return spark(s[0], s[1]); }).join('');
  }
  function beam(pos) { return '<div class="cn-beam ' + pos + '"></div>'; }
  function dots(style) { return '<div class="cn-dots" style="' + style + '"></div>'; }

  /* ── Công thức decor theo khối ── */
  var RECIPE = {
    banner: function () { return ribbon('b') + arcs('tr', true) + arcs('bl') + trail('t') + sparks('a') + beam('b'); },
    main: function () { return arcs('tl') + arcs('br', true) + dots('right:2%;top:12%') + sparks('b') + ribbon('m'); },
    section: function () { return arcs('tr') + sparks('b') + ribbon('t') + beam('t'); },
    login: function () { return arcs('tl', true) + arcs('br') + trail('b') + sparks('a') + ribbon('t'); },
    footer: function () { return arcs('tr', true) + arcs('bl') + trail('t') + sparks('a') + beam('t'); },
    hero: function () { return sparks('a'); },
    sidebar: function () { return arcs('bl') + sparks('c'); },
    topbar: function () { return sparks('c') + ribbon('b'); },
    mini: function () { return arcs('tr') + sparks('c'); }
  };
  var HOSTS = [
    ['.page-banner, .cart-page-header, .checkout-page-header, .breadcrumb-bar, body > section.section:first-of-type', 'banner'],
    ['main.container, main.success-container', 'main'],
    ['body > section.section:not(:first-of-type)', 'section'],
    ['main.login-stage', 'login'],
    ['#main-footer', 'footer'],
    ['.hero, .cat-section, .bestsellers-section, .benefits-section, .trust-section, .nova-tech, .cta-section', 'hero'],
    ['#admin-sidebar', 'sidebar'],
    ['.admin-topbar', 'topbar'],
    ['.chatbot-window-box', 'mini']
  ];
  function hostify() {
    HOSTS.forEach(function (h) {
      $$(h[0]).forEach(function (el) {
        if (el.__cn) return;
        // footer chưa render xong thì chờ
        if (el.id === 'main-footer' && !el.children.length) return;
        if (el.id === 'admin-sidebar' && !el.children.length) return;
        el.__cn = true;
        el.classList.add('cn-host');
        if (h[1] === 'sidebar' || h[1] === 'mini') el.classList.add('cn-mini');
        var d = document.createElement('div');
        d.className = 'cn-deco'; d.setAttribute('aria-hidden', 'true');
        d.innerHTML = RECIPE[h[1]]();
        el.insertBefore(d, el.firstChild);
        watch(el);
      });
    });
  }

  /* ── Góc thẻ ── */
  var CARDS = '.hp-card, .product-card, .cat-tile, .benefit-card, .trust-item-card, .nova-panel, .value-card, .detail-spec-card, .cart-items-card, .cart-summary-card, ' +
    '.checkout-card, .order-review-card, .contact-form-card, .contact-info-card, .success-card, .admin-kpi-card, .admin-card, .login-card, .chatbot-window-box';
  function cards() {
    $$(CARDS).forEach(function (c) {
      if (c.__cnc) return; c.__cnc = true;
      c.classList.add('cn-card');
      c.insertAdjacentHTML('afterbegin', CORNER);
    });
  }

  /* ── Ornament tiêu đề ── */
  var TITLES = '.section-header .section-title, .page-banner h1, .cart-page-header h1, .checkout-page-header h1, body > section.section h1, .login-card h1, ' +
    '.admin-page-title h1, .success-card h1, .cta-box h2, .nova-tech h2';
  function titles() {
    $$(TITLES).forEach(function (h) {
      if (h.__cnt) return; h.__cnt = true;
      var cs = getComputedStyle(h), center = cs.textAlign === 'center' || (h.parentNode && getComputedStyle(h.parentNode).textAlign === 'center');
      var wrap = document.createElement('div'); wrap.innerHTML = ORN.replace('%c', center ? 'c' : '');
      h.parentNode.insertBefore(wrap.firstChild, h.nextSibling);
    });
  }

  /* ── Dải giữa các section ── */
  var SKIP = /(^|\s)(lp-big|lp-announce|marquee-strip|cn-divider)(\s|$)/;
  function isBlock(el) {
    if (!el || el.nodeType !== 1) return false;
    var t = el.tagName;
    if (t === 'MAIN' || t === 'SECTION') return true;
    return /(^|\s)(page-banner|cart-page-header|checkout-page-header|breadcrumb-bar)(\s|$)/.test(el.className);
  }
  function dividersIn(parent, filter) {
    var kids = Array.prototype.slice.call(parent.children).filter(function (k) { return !k.classList.contains('cn-divider') && !/^(SCRIPT|STYLE|LINK)$/.test(k.tagName) && !k.hidden; });
    var n = 0;
    for (var i = 1; i < kids.length; i++) {
      var cur = kids[i], prev = kids[i - 1];
      if (!isBlock(cur) || !isBlock(prev) || SKIP.test(cur.className) || SKIP.test(prev.className)) continue;
      if (cur.previousElementSibling && cur.previousElementSibling.classList.contains('cn-divider')) continue;
      if (cur.id === 'n4-intro-splash') continue;
      parent.insertBefore(divider(-(n * 5 + i * 3) % 20), cur); n++; watch(cur.previousElementSibling);
    }
  }
  function dividers() {
    if (body.classList.contains('admin-body') || body.classList.contains('login-page')) return;
    var all = function (el) { return isBlock(el); };
    dividersIn(body, all);
    var m = $('main:not(.container)');
    if (m && m.parentNode === body && m.querySelectorAll(':scope > section').length > 1) dividersIn(m, function (el) { return el.tagName === 'SECTION'; });
  }

  /* ── Nền cố định toàn trang ── */
  function pageArt() {
    if ($('.cn-page-art')) return;
    var a = document.createElement('div'); a.className = 'cn-page-art'; a.setAttribute('aria-hidden', 'true');
    var curve = '<path d="M0 420 C 200 300, 360 520, 620 360 S 560 60, 600 0"/><path d="M0 470 C 220 350, 380 560, 640 400 S 600 100, 640 0"/>';
    a.innerHTML = '<svg class="l" viewBox="0 0 640 520" focusable="false">' + curve + '</svg><svg class="r" viewBox="0 0 640 520" focusable="false">' + curve + '</svg><i></i><i></i><i></i><i></i>';
    body.insertBefore(a, body.firstChild);
  }

  /* ── Tạm dừng animation khi khuất màn hình ── */
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.target.classList.toggle('cn-paused', !e.isIntersecting); });
  }, { rootMargin: '160px 0px' }) : null;
  function watch(el) { if (io && el) io.observe(el); }

  function run() {
    if (!$('#cn-defs')) { var w = document.createElement('div'); w.id = 'cn-defs'; w.setAttribute('aria-hidden', 'true'); w.innerHTML = DEFS; body.appendChild(w); }
    pageArt(); hostify(); cards(); titles(); dividers();
  }
  run();

  // header/footer/sản phẩm/chatbot render muộn → gắn thêm khi xuất hiện
  var t;
  new MutationObserver(function () { clearTimeout(t); t = setTimeout(run, 90); }).observe(body, { childList: true, subtree: true });
})();
