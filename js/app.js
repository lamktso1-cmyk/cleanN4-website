/* ==========================================================================
   N4 CLEANOVA — APPLICATION CORE ENGINE
   Clean · Elegant · Professional Brand
   Header Injection · Footer · Mobile Drawer · Search · Scroll · Toast · Cart
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initIntroSplash();
  initHeader();
  initFooter();
  initMobileDrawer();
  initSearch();
  initScrollEffects();
  initScrollReveal();
  initSubtleGoldGlow();
  updateCartBadge();
});

/* ---------------------------------------------------------
   1. INTRO SPLASH
   --------------------------------------------------------- */
function initIntroSplash() {
  const intro = document.getElementById('n4-intro-splash');
  if (!intro) return;

  function dismiss() {
    if (intro.classList.contains('hiding')) return;
    intro.classList.add('hiding');
    setTimeout(() => { intro.remove(); }, 520);
  }

  intro.addEventListener('click', dismiss);
  setTimeout(dismiss, 2800);
}

/* ---------------------------------------------------------
   2. DYNAMIC HEADER
   --------------------------------------------------------- */
function initHeader() {
  const headerEl = document.getElementById('main-header');
  if (!headerEl) return;

  const path = window.location.pathname;
  const isHome     = path.endsWith('index.html') || path === '/' || path.endsWith('/');
  const isProducts = path.includes('products');
  const isContact  = path.includes('contact');

  headerEl.className = 'main-header';
  headerEl.innerHTML = `
    <div class="container">
      <div class="header-inner">

        <!-- Logo -->
        <a href="index.html" class="n4-logo" aria-label="N4 Cleanova Trang chủ">
          <div class="n4-logo-mark">
            <span class="lm-n">N</span><span class="lm-4">4</span>
          </div>
          <div class="n4-logo-text">
            <span class="lt-brand">CLEANOVA</span>
            <span class="lt-sub">Smart Clean • Better Life</span>
          </div>
        </a>

        <!-- Desktop nav -->
        <nav class="nav-menu" aria-label="Điều hướng chính">
          <a href="index.html"    class="nav-link ${isHome     ? 'active' : ''}">Trang chủ</a>
          <a href="products.html" class="nav-link ${isProducts ? 'active' : ''}">Sản phẩm</a>
          <a href="index.html#why-n4" class="nav-link">Về chúng tôi</a>
          <a href="contact.html"  class="nav-link ${isContact  ? 'active' : ''}">Liên hệ</a>
        </nav>

        <!-- Actions -->
        <div class="nav-actions">
          <button class="btn-icon" id="search-toggle-btn" aria-label="Tìm kiếm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          <a href="admin.html" class="btn-icon" aria-label="Quản trị">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </a>

          <a href="cart.html" class="btn-icon" style="position:relative" aria-label="Giỏ hàng">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span class="header-cart-count" id="cart-count" style="display:none">0</span>
          </a>

          <button class="hamburger-btn" id="mobile-menu-toggle" aria-label="Mở menu">
            <span></span><span></span><span></span>
          </button>
        </div>

      </div>
    </div>
  `;
}

/* ---------------------------------------------------------
   3. DYNAMIC FOOTER
   --------------------------------------------------------- */
function initFooter() {
  const footerEl = document.getElementById('main-footer');
  if (!footerEl) return;

  footerEl.className = 'main-footer';
  footerEl.innerHTML = `
    <div class="container">
      <div class="footer-grid">

        <!-- Brand col -->
        <div class="footer-brand-col">
          <a href="index.html" class="n4-logo inverted" style="margin-bottom:4px">
            <div class="n4-logo-mark">
              <span class="lm-n">N</span><span class="lm-4">4</span>
            </div>
            <div class="n4-logo-text">
              <span class="lt-brand">CLEANOVA</span>
              <span class="lt-sub">Smart Clean • Better Life</span>
            </div>
          </a>
          <p>Thương hiệu robot hút bụi và thiết bị vệ sinh thông minh. Đem công nghệ phục vụ không gian sống sạch hoàn hảo.</p>
          <div class="footer-live">
            <span class="pulse-dot"></span>
            <span>Hỗ trợ 24/7 đang hoạt động</span>
          </div>
        </div>

        <!-- Products col -->
        <div>
          <div class="footer-col-title">Dòng sản phẩm</div>
          <ul class="footer-links">
            <li><a href="product-detail.html?id=1">Robot hút bụi N4 Pro</a></li>
            <li><a href="product-detail.html?id=2">Máy hút bụi cầm tay N4 Air</a></li>
            <li><a href="product-detail.html?id=5">Robot N4 Ultra AI</a></li>
            <li><a href="product-detail.html?id=6">Robot N4 Lite</a></li>
            <li><a href="products.html?category=accessories">Phụ kiện chính hãng</a></li>
          </ul>
        </div>

        <!-- Info col -->
        <div>
          <div class="footer-col-title">Thông tin</div>
          <ul class="footer-links">
            <li><a href="index.html#why-n4">Về N4 Cleanova</a></li>
            <li><a href="index.html#categories">Danh mục sản phẩm</a></li>
            <li><a href="index.html#reviews">Đánh giá khách hàng</a></li>
            <li><a href="admin.html">Cổng quản trị</a></li>
          </ul>
        </div>

        <!-- Support col -->
        <div>
          <div class="footer-col-title">Hỗ trợ & Chính sách</div>
          <ul class="footer-links">
            <li><a href="contact.html">Hotline: 1900 8899</a></li>
            <li><a href="contact.html">Bảo hành 12 tháng</a></li>
            <li><a href="contact.html">Đổi trả trong 30 ngày</a></li>
            <li><a href="contact.html">Dùng thử 7 ngày miễn phí</a></li>
            <li><a href="contact.html">Kết nối ứng dụng N4</a></li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <span>© 2026 N4 Cleanova. All rights reserved.</span>
        <div class="footer-bottom-links">
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Điều khoản dịch vụ</a>
        </div>
      </div>
    </div>
  `;
}

/* ---------------------------------------------------------
   4. MOBILE DRAWER
   --------------------------------------------------------- */
function initMobileDrawer() {
  if (document.getElementById('mobile-drawer')) return;

  const backdrop = document.createElement('div');
  backdrop.id = 'drawer-backdrop';
  backdrop.className = 'drawer-backdrop';

  const drawer = document.createElement('aside');
  drawer.id = 'mobile-drawer';
  drawer.className = 'mobile-drawer';
  drawer.innerHTML = `
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:20px;border-bottom:1px solid var(--border-xs);">
        <span style="font-family:var(--font-heading);font-size:1.125rem;font-weight:700;color:var(--text-primary)">N4 Cleanova</span>
        <button id="drawer-close" style="background:none;border:none;font-size:1.375rem;color:var(--text-muted);cursor:pointer;padding:0 4px;">✕</button>
      </div>
      <nav class="drawer-links">
        <a href="index.html">Trang chủ</a>
        <a href="products.html">Sản phẩm</a>
        <a href="index.html#why-n4">Về chúng tôi</a>
        <a href="contact.html">Liên hệ</a>
        <a href="admin.html">Quản trị</a>
      </nav>
    </div>
    <div>
      <a href="products.html" class="btn btn-primary btn-block">Xem tất cả sản phẩm</a>
    </div>
  `;

  document.body.appendChild(backdrop);
  document.body.appendChild(drawer);

  const open  = () => { drawer.classList.add('open'); backdrop.classList.add('open'); document.body.style.overflow='hidden'; };
  const close = () => { drawer.classList.remove('open'); backdrop.classList.remove('open'); document.body.style.overflow=''; };

  document.getElementById('mobile-menu-toggle')?.addEventListener('click', open);
  document.getElementById('drawer-close')?.addEventListener('click', close);
  backdrop.addEventListener('click', close);
}

/* ---------------------------------------------------------
   5. SEARCH OVERLAY
   --------------------------------------------------------- */
function initSearch() {
  if (document.getElementById('search-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.className = 'search-overlay';
  overlay.innerHTML = `
    <div class="search-box-wrap">
      <div class="search-input-row">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="color:var(--text-muted);flex-shrink:0">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" id="global-search-input" placeholder="Tìm sản phẩm, phụ kiện, tên model..." autocomplete="off">
        <button class="search-close" id="search-close-btn">✕</button>
      </div>
      <div class="search-results" id="search-results" style="display:none"></div>
    </div>
  `;

  document.body.appendChild(overlay);

  const input   = document.getElementById('global-search-input');
  const results = document.getElementById('search-results');

  const open  = () => { overlay.classList.add('open'); document.body.style.overflow='hidden'; setTimeout(()=>input?.focus(),80); };
  const close = () => { overlay.classList.remove('open'); document.body.style.overflow=''; if(input) input.value=''; if(results){results.innerHTML='';results.style.display='none';} };

  document.getElementById('search-toggle-btn')?.addEventListener('click', open);
  document.getElementById('search-close-btn')?.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  input?.addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    if (!q || typeof PRODUCTS === 'undefined') { results.style.display='none'; return; }

    const hits = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.series||'').toLowerCase().includes(q) ||
      (p.tagline||'').toLowerCase().includes(q) ||
      (p.categoryName||'').toLowerCase().includes(q)
    );

    results.style.display = 'block';
    results.innerHTML = hits.length ? hits.map(p => `
      <a href="product-detail.html?id=${p.id}" class="search-result-item">
        <img src="${p.image}" alt="${p.name}" class="search-result-img">
        <div>
          <div class="search-result-name">${p.name}</div>
          <div class="search-result-price">${formatPrice(p.price)}</div>
        </div>
      </a>
    `).join('') : `<div style="padding:20px;text-align:center;color:var(--text-muted)">Không tìm thấy kết quả cho "<b>${q}</b>"</div>`;
  });
}

/* ---------------------------------------------------------
   6. SCROLL EFFECTS (sticky header glow)
   --------------------------------------------------------- */
function initScrollEffects() {
  const header = document.getElementById('main-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------------------------------------------------------
   7. SCROLL REVEAL (Intersection Observer)
   --------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
}

/* ---------------------------------------------------------
   8. CART BADGE
   --------------------------------------------------------- */
function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  if (typeof getCartCount === 'function') {
    const n = getCartCount();
    badge.textContent = n;
    badge.style.display = n > 0 ? 'flex' : 'none';
  }
}

/* ---------------------------------------------------------
   9. GLOBAL TOAST NOTIFICATIONS
   --------------------------------------------------------- */
function showToast(message, icon = '✓') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 320);
  }, 3000);
}

/* ---------------------------------------------------------
   10. UTILITY: Format price to Vietnamese locale
   --------------------------------------------------------- */
function formatPrice(num) {
  if (typeof num !== 'number') return num;
  return num.toLocaleString('vi-VN') + '₫';
}

/* ---------------------------------------------------------
   11. SUBTLE GOLD GLOW (Cursor-Follower Interaction)
   --------------------------------------------------------- */
function initSubtleGoldGlow() {
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.cat-tile, .n4-card, .hp-card, .product-card, .gold-glow-card, .benefit-card, .trust-card, .cta-box, .review-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, { passive: true });
}
