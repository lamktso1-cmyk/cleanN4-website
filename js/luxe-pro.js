/* ==========================================================================
   CLEANNOVA — LUXE PRO
   Chèn decor chìm (đường cong, vòng tròn, watermark N4, lane robot), nhiều marquee,
   parallax nhẹ, tạm dừng animation khi khuất màn hình. Không đụng logic nghiệp vụ.
   ========================================================================== */
(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;
  var isAdmin = body.classList.contains('admin-body');
  var isLogin = body.classList.contains('login-page');
  var isHome = !!document.getElementById('hero');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ── Template decor ── */
  var GRAD = '<defs><linearGradient id="lpg" x1="0" x2="1"><stop offset="0" stop-color="#E6CD97"/><stop offset=".5" stop-color="#C5A059"/><stop offset="1" stop-color="#B89243"/></linearGradient></defs>';
  var CURVE = '<svg class="lp-curve %c" viewBox="0 0 1100 520" aria-hidden="true" style="--k:%k">' + GRAD +
    '<path d="M0 420 C 220 300, 380 520, 640 360 S 980 120, 1100 200"/><path d="M0 460 C 240 340, 400 560, 660 400 S 1000 160, 1100 240"/>' +
    '<path d="M0 380 C 200 260, 360 480, 620 320 S 960 80, 1100 160"/></svg>';
  var SILK = '<div class="lp-silk %c" style="--k:%k"><svg viewBox="0 0 1200 180" preserveAspectRatio="none" aria-hidden="true">' +
    '<defs><linearGradient id="lps%i" x1="0" x2="1"><stop offset="0" stop-color="#E6CD97" stop-opacity="0"/><stop offset=".45" stop-color="#E6CD97" stop-opacity=".55"/><stop offset=".7" stop-color="#C5A059" stop-opacity=".35"/><stop offset="1" stop-color="#C5A059" stop-opacity="0"/></linearGradient></defs>' +
    '<path d="M0 100 C 200 20, 380 170, 620 90 S 1000 20, 1200 80 L1200 120 C 1000 60, 820 150, 600 130 S 200 60, 0 140Z" fill="url(#lps%i)"/>' +
    '<path d="M0 130 C 240 60, 420 170, 660 120 S 1020 60, 1200 110 L1200 128 C 1020 86, 860 160, 640 148 S 240 90, 0 150Z" fill="url(#lps%i)" opacity=".7"/></svg></div>';
  var LANE = '<div class="lp-lane %c" style="--k:%k"><svg viewBox="0 0 1300 220" preserveAspectRatio="none" aria-hidden="true">' +
    '<path class="clean" d="M20 150 C 180 40, 320 40, 480 120 S 780 200, 1000 80 S 1200 40, 1300 110"/>' +
    '<path class="path" d="M20 150 C 180 40, 320 40, 480 120 S 780 200, 1000 80 S 1200 40, 1300 110"/>' +
    '<g class="bot"><circle r="9" fill="#fff" stroke="#C5A059" stroke-width="1.6"/><circle r="3" fill="#C5A059"/><path d="M-4 -7 A9 9 0 0 1 4 -7" stroke="#E6CD97" fill="none" stroke-width="1.4"/></g></svg></div>';
  var silkId = 0;
  function t(tpl, c, k) { silkId++; return tpl.replace(/%c/g, c || '').replace(/%k/g, k == null ? 24 : k).replace(/%i/g, silkId); }
  var PIECES = {
    curveTL: function () { return t(CURVE, 'tl', -30); },
    curveBR: function () { return t(CURVE, 'br', 40); },
    curveMid: function () { return t(CURVE, 'mid', 26); },
    ringA: function () { return '<div class="lp-ring a" style="--k:-36"></div>'; },
    ringB: function () { return '<div class="lp-ring b" style="--k:30"></div>'; },
    ringC: function () { return '<div class="lp-ring c" style="--k:-24"></div>'; },
    orbA: function () { return '<div class="lp-orb a" style="--k:-30"></div>'; },
    orbB: function () { return '<div class="lp-orb b" style="--k:34"></div>'; },
    markR: function () { return '<div class="lp-mark r" style="--k:-18" aria-hidden="true"></div>'; },
    markL: function () { return '<div class="lp-mark l sm" style="--k:16" aria-hidden="true"></div>'; },
    geoA: function () { return '<div class="lp-geo a" style="--k:-22"></div>'; },
    geoB: function () { return '<div class="lp-geo b" style="--k:22"></div>'; },
    diaA: function () { return '<div class="lp-diamond a" style="--k:-34"></div>'; },
    diaB: function () { return '<div class="lp-diamond b" style="--k:28"></div>'; },
    silkT: function () { return t(SILK, 't', 10); },
    silkM: function () { return t(SILK, 'm', -20); },
    silkB: function () { return t(SILK, 'bt', 14); },
    beamT: function () { return '<div class="lp-beam" style="--k:0"></div>'; },
    beamB: function () { return '<div class="lp-beam bt" style="--k:0"></div>'; },
    laneH: function () { return t(LANE, 'hero-lane', -12); },
    laneS: function () { return t(LANE, 'sec-lane', 14); }
  };
  var MAP = [
    ['.hero', ['curveTL', 'ringA', 'markR', 'laneH', 'silkB', 'beamB']],
    ['.cat-section', ['geoA', 'geoB', 'curveMid', 'beamT']],
    ['.bestsellers-section', ['orbA', 'ringB', 'markL', 'silkT']],
    ['.benefits-section', ['curveBR', 'diaA', 'diaB', 'silkM', 'beamT']],
    ['.trust-section', ['geoB', 'ringC', 'orbB']],
    ['.nova-tech', ['curveTL', 'laneS', 'markR', 'geoA']],
    ['.cta-section', ['orbA', 'ringA', 'silkB', 'beamT']],
    ['.page-banner', ['curveBR', 'markR', 'ringA', 'beamB']],
    ['.admin-main', ['orbB', 'markR', 'curveBR']],
    ['.login-stage', ['curveTL', 'curveBR', 'markR', 'ringB', 'silkT']],
    ['#main-footer.main-footer', ['markR', 'curveTL', 'orbB', 'beamT']]
  ];
  var seen = [];
  function decorate() {
    MAP.forEach(function (m) {
      $$(m[0]).forEach(function (host) {
        if (host.__lp) return; host.__lp = true;
        host.classList.add('lp-host');
        var deco = document.createElement('div');
        deco.className = 'lp-deco'; deco.setAttribute('aria-hidden', 'true');
        deco.innerHTML = m[1].map(function (k) { return PIECES[k](); }).join('');
        host.insertBefore(deco, host.firstChild);
        seen.push(host);
        observe(host);
      });
    });
  }

  /* ── Ambient nền cố định ── */
  var amb = document.createElement('div');
  amb.className = 'lp-ambient'; amb.setAttribute('aria-hidden', 'true');
  amb.innerHTML = '<i></i><i></i><i></i>';
  body.insertBefore(amb, body.firstChild);

  /* ── Marquee ── */
  function strip(cls, items, reps) {
    var one = items.map(function (it) {
      return '<span' + (it.c ? ' class="' + it.c + '"' : '') + '>' + (it.t || it) + '</span><i>✦</i>';
    }).join('');
    var d = document.createElement('div');
    d.className = 'marquee-strip ' + cls; d.setAttribute('aria-hidden', 'true');
    var inner = ''; for (var i = 0; i < (reps || 4); i++) inner += one;
    d.innerHTML = '<div class="marquee-track">' + inner + '</div>';
    return d;
  }
  var BRAND = [{ t: 'CLEANNOVA', c: 'b' }, 'Smart Cleaning', { t: 'Premium Living', c: 'b' }, 'Nhà sạch, người nhàn', 'Bảo hành 18 tháng'];
  var BIG = [{ t: 'CLEANNOVA', c: 'f' }, 'Smart Cleaning', { t: 'Premium Living', c: 'g' }, 'Nhà sạch, người nhàn'];
  var BIG2 = ['Premium Living', { t: 'Smart Cleaning', c: 'f' }, 'CLEANNOVA', { t: 'Robot · Lọc · Khăn · Chổi', c: 'g' }];

  function addMarquees() {
    if (isAdmin || isLogin) return;
    // 1. dải thông báo dưới header
    var header = $('#main-header');
    if (header && !$('.lp-announce')) {
      var a = strip('lp-announce', BRAND, 6);
      header.parentNode.insertBefore(a, header.nextSibling); observe(a);
    }
    // 2. dải chữ lớn
    var bigs = [];
    if ($('.lp-big')) return;
    if (isHome) {
      var best = $('#bestsellers'), cta = $('.cta-section');
      if (best) bigs.push([strip('lp-big', BIG, 3), best, 'after']);
      if (cta) bigs.push([strip('lp-big rev', BIG2, 3), cta, 'before']);
    } else {
      var f = $('#main-footer');
      if (f) bigs.push([strip('lp-big', BIG, 3), f, 'before']);
    }
    bigs.forEach(function (b) {
      var ref = b[1];
      if (b[2] === 'after') ref.parentNode.insertBefore(b[0], ref.nextSibling);
      else ref.parentNode.insertBefore(b[0], ref);
      observe(b[0]);
    });
  }

  /* ── Parallax nhẹ + tạm dừng khi khuất ── */
  var visible = new Set();
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { visible.add(e.target); e.target.classList.remove('lp-paused'); }
      else { visible.delete(e.target); e.target.classList.add('lp-paused'); }
    });
  }, { rootMargin: '120px 0px' }) : null;
  function observe(el) { if (io) io.observe(el); }

  var ticking = false;
  function frame() {
    ticking = false;
    var vh = innerHeight;
    document.documentElement.style.setProperty('--lp-sy', scrollY.toFixed(0));
    visible.forEach(function (el) {
      if (!el.classList.contains('lp-host')) return;
      var r = el.getBoundingClientRect();
      var p = ((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2);
      el.style.setProperty('--p', Math.max(-1, Math.min(1, p)).toFixed(3));
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

  /* ── Khởi tạo ── */
  function init() {
    decorate(); addMarquees();
    if (!reduce) {
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', onScroll, { passive: true });
      frame();
    }
  }
  init();

  // Footer & các khối được render động sau (app.js) → gắn decor khi xuất hiện
  var mo = new MutationObserver(function () { clearTimeout(mo.t); mo.t = setTimeout(function () { decorate(); if (!reduce) onScroll(); }, 80); });
  mo.observe(body, { childList: true, subtree: false });
  var ft = $('#main-footer'); if (ft) mo.observe(ft, { childList: true });
  var hd = $('#main-header');
  if (hd && !$('.lp-announce') && !isAdmin && !isLogin) {
    var mh = new MutationObserver(function () { if ($('.lp-announce')) { mh.disconnect(); return; } addMarquees(); });
    mh.observe(hd, { childList: true });
  }
})();
