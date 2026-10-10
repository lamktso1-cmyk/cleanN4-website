/* CLEANNOVA — Gallery sản phẩm: ảnh chính + thumbnail, mũi tên, vuốt, lightbox. */
(function () {
  'use strict';
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var norm = function (g, i, name) {
    if (typeof g === 'string') g = { src: g };
    return { src: g.src, thumb: g.thumb || g.src, label: g.label || ('Góc nhìn ' + (i + 1)), alt: g.alt || (name + ' - ' + (g.label || 'góc nhìn ' + (i + 1))) };
  };

  var state = { items: [], i: 0, name: '' };
  var main, view, thumbs, counter, prevBtn, nextBtn, lb;

  function preload(src, cb) { var im = new Image(); im.onload = im.onerror = function () { cb(); }; im.src = src; }

  function show(i, instant) {
    var n = state.items.length; if (!n) return;
    i = (i + n) % n; state.i = i;
    var it = state.items[i];
    Array.prototype.forEach.call(thumbs.children, function (t, k) {
      var on = k === i; t.classList.toggle('active', on); t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
      if (on && t.scrollIntoView && thumbs.scrollWidth > thumbs.clientWidth) { try { var x = t.offsetLeft - (thumbs.clientWidth - t.offsetWidth) / 2; thumbs.scrollTo({ left: x, behavior: 'smooth' }); } catch (e) {} }
    });
    if (counter) counter.textContent = (i + 1) + ' / ' + n;
    view.setAttribute('aria-label', 'Phóng to: ' + it.label);
    var apply = function () {
      main.classList.remove('pdp-fade'); main.src = it.src; main.alt = it.alt;
      void main.offsetWidth; main.classList.add('pdp-in'); if (!instant) main.classList.add('pdp-fade');
      if (lb && lb.classList.contains('open')) lbUpdate();
    };
    if (instant) apply(); else preload(it.src, apply);
    var nx = state.items[(i + 1) % n]; if (nx) { var im = new Image(); im.src = nx.src; }
  }

  /* ── Lightbox ── */
  function lbBuild() {
    if (lb) return;
    lb = document.createElement('div'); lb.className = 'cn-lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Xem ảnh lớn');
    lb.innerHTML = '<button class="cn-lb-x" type="button" aria-label="Đóng">&times;</button>' +
      '<button class="cn-lb-n cn-lb-prev" type="button" aria-label="Ảnh trước">&#8249;</button>' +
      '<figure class="cn-lb-fig"><img alt=""><figcaption></figcaption></figure>' +
      '<button class="cn-lb-n cn-lb-next" type="button" aria-label="Ảnh sau">&#8250;</button>';
    document.body.appendChild(lb);
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('cn-lb-fig')) lbClose(); });
    lb.querySelector('.cn-lb-x').addEventListener('click', lbClose);
    lb.querySelector('.cn-lb-prev').addEventListener('click', function () { show(state.i - 1, true); });
    lb.querySelector('.cn-lb-next').addEventListener('click', function () { show(state.i + 1, true); });
    swipe(lb.querySelector('.cn-lb-fig'));
  }
  function lbUpdate() {
    var it = state.items[state.i], im = lb.querySelector('img'), cap = lb.querySelector('figcaption');
    im.classList.remove('in'); im.src = it.src; im.alt = it.alt; void im.offsetWidth; im.classList.add('in');
    cap.textContent = it.label + '  ·  ' + (state.i + 1) + '/' + state.items.length;
    lb.classList.toggle('single', state.items.length < 2);
  }
  function lbOpen() { lbBuild(); lbUpdate(); lb.classList.add('open'); document.documentElement.classList.add('cn-lb-lock'); lb.querySelector('.cn-lb-x').focus(); }
  function lbClose() { if (!lb) return; lb.classList.remove('open'); document.documentElement.classList.remove('cn-lb-lock'); view.focus({ preventScroll: true }); }

  function swipe(el) {
    var x0 = null, y0 = 0;
    el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
      if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.4) { if (el.__suppress) el.__suppress(); show(state.i + (dx < 0 ? 1 : -1), el !== view); }
    }, { passive: true });
  }

  var keyBound = false;
  function keys() {
    if (keyBound) return; keyBound = true;
    document.addEventListener('keydown', function (e) {
      var open = lb && lb.classList.contains('open');
      if (open) {
        if (e.key === 'Escape') { e.preventDefault(); lbClose(); }
        else if (e.key === 'ArrowLeft') show(state.i - 1, true);
        else if (e.key === 'ArrowRight') show(state.i + 1, true);
      }
    });
  }

  function init(p) {
    main = document.getElementById('main-product-img'); thumbs = document.getElementById('gallery-thumbs');
    if (!main || !thumbs) return;
    view = main.parentNode;
    var list = (p.gallery && p.gallery.length ? p.gallery : [p.image]);
    state.name = p.name; state.i = 0;
    state.items = list.map(function (g, i) { return norm(g, i, p.name); });

    thumbs.setAttribute('role', 'tablist'); thumbs.setAttribute('aria-label', 'Ảnh sản phẩm');
    thumbs.innerHTML = state.items.map(function (it, i) {
      return '<button type="button" role="tab" class="gallery-thumb' + (i === 0 ? ' active' : '') + '" data-i="' + i + '" aria-label="' + esc(it.label) + '" title="' + esc(it.label) + '">' +
        '<img src="' + esc(it.thumb) + '" alt="" loading="lazy" decoding="async"></button>';
    }).join('');
    thumbs.onclick = function (e) { var b = e.target.closest('.gallery-thumb'); if (b) show(+b.getAttribute('data-i')); };
    thumbs.onkeydown = function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); show(state.i + (e.key === 'ArrowRight' ? 1 : -1)); var t = thumbs.children[state.i]; if (t) t.focus(); }
    };

    var multi = state.items.length > 1;
    if (!view.querySelector('.gallery-nav')) {
      view.setAttribute('tabindex', '0'); view.setAttribute('role', 'button'); view.classList.add('gallery-zoomable');
      view.insertAdjacentHTML('beforeend',
        (multi ? '<button type="button" class="gallery-nav gallery-prev" aria-label="Ảnh trước">&#8249;</button><button type="button" class="gallery-nav gallery-next" aria-label="Ảnh sau">&#8250;</button><span class="gallery-count" aria-live="polite"></span>' : '') +
        '<span class="gallery-zoom-hint" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5M10.5 8v5M8 10.5h5"/></svg></span>');
      counter = view.querySelector('.gallery-count');
      var moved = false; view.__suppress = function () { moved = true; setTimeout(function () { moved = false; }, 350); };
      view.addEventListener('click', function (e) {
        if (e.target.closest('.gallery-nav')) return; if (moved) return; lbOpen();
      });
      view.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lbOpen(); }
        else if (e.key === 'ArrowRight') show(state.i + 1); else if (e.key === 'ArrowLeft') show(state.i - 1);
      });
      prevBtn = view.querySelector('.gallery-prev'); nextBtn = view.querySelector('.gallery-next');
      if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); show(state.i - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); show(state.i + 1); });
      swipe(view);
    } else counter = view.querySelector('.gallery-count');
    keys(); show(0, true);
  }

  window.CNGallery = { init: init, show: show };
})();
