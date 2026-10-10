/* ==========================================================================
   CLEANNOVA — LUXE MOTION
   Thanh tiến trình cuộn · chuyển trang mượt · reveal có nhịp · parallax nhẹ
   · dải chạy trước footer · count-up cho KPI admin
   ========================================================================== */
(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var isAdmin = document.body.classList.contains('admin-body');

  /* 1. Thanh tiến trình cuộn */
  var bar = document.createElement('div');
  bar.id = 'luxe-progress';
  document.body.appendChild(bar);
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(scrollY / h, 1) : 0) + ')';
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* 2. Chuyển trang: mờ dần khi bấm liên kết nội bộ */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || reduce || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(https?:|mailto:|tel:|javascript:)/i.test(href)) return;
    if (a.pathname === location.pathname && a.hash) return;
    e.preventDefault();
    document.body.classList.add('page-leaving');
    bar.style.transition = 'transform .5s'; bar.style.transform = 'scaleX(.8)';
    setTimeout(function () { location.href = a.href; }, 230);
  });
  addEventListener('pageshow', function (ev) { if (ev.persisted) document.body.classList.remove('page-leaving'); });

  /* 3. Reveal tự động + nhịp trễ theo thứ tự trong cùng khối */
  var TARGETS = '.section-header, .product-card, .hp-card, .cat-tile, .benefit-card, .trust-item-card, .review-card,' +
    '.nova-panel, .cta-box, .cart-item, .cart-summary-card, .checkout-card, .value-card, .detail-spec-card,' +
    '.detail-features-box, .contact-form-card, .admin-card, .success-card, .order-review-card';
  var io = ('IntersectionObserver' in window && !reduce) ? new IntersectionObserver(function (es) {
    es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('revealed'); io.unobserve(x.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }) : null;

  function revealify() {
    $$(TARGETS).forEach(function (el) {
      if (el.__luxe) return; el.__luxe = true;
      if (isAdmin) return; // admin có animation riêng
      el.classList.add('reveal');
      var sibs = el.parentElement ? $$(':scope > ' + (el.className.split(' ')[0] ? '.' + el.className.split(' ')[0] : '*'), el.parentElement) : [];
      var idx = Math.max(0, sibs.indexOf(el));
      el.style.setProperty('--d', Math.min(idx, 6) * 0.08 + 's');
      if (io) io.observe(el); else el.classList.add('revealed');
    });
  }
  revealify();
  var mo = new MutationObserver(function () { clearTimeout(mo.t); mo.t = setTimeout(revealify, 60); });
  mo.observe(document.body, { childList: true, subtree: true });

  /* 4. Hero: chạy animation sau khi splash biến mất + parallax rất nhẹ */
  var hero = $('#hero');
  if (hero) {
    var go = function () { hero.classList.add('go'); };
    var tries = 0;
    (function wait() {
      var s = $('#n4-intro-splash');
      if (!s || s.classList.contains('hiding') || tries++ > 40) go(); else setTimeout(wait, 100);
    })();
    var box = $('.hero-img-box', hero);
    if (box && !reduce && matchMedia('(hover: hover)').matches) {
      hero.addEventListener('mousemove', function (e) {
        var r = hero.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        box.style.transform = 'perspective(1000px) rotateY(' + (x * 4) + 'deg) rotateX(' + (-y * 3) + 'deg)';
      });
      hero.addEventListener('mouseleave', function () { box.style.transform = ''; });
    }
    if (!reduce) {
      var arcs = $('.hd-arcs', hero);
      addEventListener('scroll', function () {
        if (scrollY < 900 && arcs) arcs.style.marginTop = (-380 + scrollY * 0.08) + 'px';
      }, { passive: true });
    }
  }

  /* 5. Dải chạy nhẹ trước footer (trừ trang chủ đã có sẵn, trừ admin/login) */
  var footer = $('#main-footer');
  if (footer && !$('.marquee-strip.footer-strip') && !document.body.classList.contains('login-page')) {
    var items = ['CLEANNOVA', 'Smart Cleaning', 'Premium Living', 'Bảo hành 18 tháng', 'Đổi sản phẩm trong 30 ngày', 'Miễn phí vận chuyển'];
    var one = items.map(function (t) { return '<span>' + t + '</span><i>✦</i>'; }).join('');
    var strip = document.createElement('div');
    strip.className = 'marquee-strip alt footer-strip';
    strip.setAttribute('aria-hidden', 'true');
    strip.innerHTML = '<div class="marquee-track">' + one + one + one + one + '</div>';
    footer.parentNode.insertBefore(strip, footer);
  }

  /* 6. Admin: count-up cho KPI */
  if (isAdmin && !reduce) {
    setTimeout(function () {
      $$('.kpi-value').forEach(function (el) {
        var raw = el.textContent; var digits = raw.replace(/[^\d]/g, '');
        if (!digits || digits === '0') return;
        var target = parseInt(digits, 10), suffix = raw.replace(/[\d.,\s]/g, '');
        var t0 = performance.now(), dur = 1100;
        (function f(n) {
          var p = Math.min((n - t0) / dur, 1), v = Math.round(target * (1 - Math.pow(1 - p, 3)));
          el.innerHTML = v.toLocaleString('vi-VN') + (suffix ? '<span class="cur">' + suffix + '</span>' : '');
          if (p < 1) requestAnimationFrame(f);
        })(t0);
      });
    }, 80);
  }
})();
