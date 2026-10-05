/* ==========================================================================
   CLEANNOVA - APPLICATION CORE ENGINE
   Header/Footer Injection • Search • Mobile Drawer • Toasts • Micro-interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initFooter();
  initMobileDrawer();
  initSearch();
  initScrollEffects();
  updateCartBadge();
  initTechTabs();
});

/* ---------------------------------------------------------
   1. DYNAMIC HEADER INJECTION
   --------------------------------------------------------- */
function initHeader() {
  const headerEl = document.getElementById('main-header');
  if (!headerEl) return;

  const currentPath = window.location.pathname;

  headerEl.className = 'main-header';
  headerEl.innerHTML = `
    <!-- Top Announcement Bar -->
    <div class="header-top-bar">
      <div class="container">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="pulse-dot"></span>
          <span>DÙNG THỬ 7 NGÀY TẠI NHÀ MIỄN PHÍ • BẢO HÀNH 18 THÁNG CHÍNH HÃNG</span>
        </div>
        <div style="display: flex; gap: 20px;">
          <span>Hotline: <strong>1900 8899</strong> (24/7)</span>
          <a href="admin.html" style="color: #94A3B8; display: inline-flex; align-items: center; gap: 4px;">
            <span>✦ Quản trị</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="container">
      <div class="header-main-nav">
        <!-- Logo -->
        <a href="index.html" class="nav-brand" aria-label="Cleannova Trang chủ">
          <div class="brand-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="9"/>
              <path d="M12 3v6"/>
              <path d="M12 15v6"/>
              <path d="M3 12h6"/>
              <path d="M15 12h6"/>
            </svg>
          </div>
          <span>CLEAN<span>NOVA</span></span>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="nav-menu">
          <a href="index.html" class="nav-link ${currentPath.endsWith('index.html') || currentPath === '/' ? 'active' : ''}">Trang chủ</a>
          <a href="products.html" class="nav-link ${currentPath.includes('products.html') ? 'active' : ''}">Sản phẩm</a>
          <a href="index.html#technology" class="nav-link">Công nghệ AI</a>
          <a href="index.html#lifestyle" class="nav-link">Giải pháp</a>
          <a href="user-flow.html" class="nav-link ${currentPath.includes('user-flow.html') ? 'active' : ''}">Sơ đồ User Flow</a>
          <a href="contact.html" class="nav-link ${currentPath.includes('contact.html') ? 'active' : ''}">Liên hệ</a>
        </nav>

        <!-- Navbar Actions -->
        <div class="nav-actions">
          <!-- Search Button -->
          <button class="btn-icon" id="search-toggle-btn" aria-label="Tìm kiếm sản phẩm" title="Tìm kiếm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          <!-- Shopping Cart Button with Animated Counter -->
          <a href="cart.html" class="btn-icon" aria-label="Xem giỏ hàng" title="Giỏ hàng">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span class="header-cart-count" id="cart-count" style="display: none;">0</span>
          </a>

          <!-- Primary CTA Button -->
          <a href="products.html" class="btn btn-cta btn-sheen" style="padding: 10px 20px;">
            <span>Khám Phá Robot</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button class="hamburger-btn" id="mobile-menu-toggle" aria-label="Mở menu di động">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ---------------------------------------------------------
   2. DYNAMIC FOOTER INJECTION
   --------------------------------------------------------- */
function initFooter() {
  const footerEl = document.getElementById('main-footer');
  if (!footerEl) return;

  footerEl.className = 'main-footer';
  footerEl.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <!-- Col 1: Brand Info -->
        <div class="footer-brand">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
            <div style="width: 28px; height: 28px; background: linear-gradient(135deg, #10B981 0%, #06B6D4 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white;">
              ✦
            </div>
            <h3 style="margin: 0; color: white; font-size: 1.35rem;">CLEAN<span style="color: #10B981;">NOVA</span></h3>
          </div>
          <p>
            "Đem lại sự tự do cho đôi tay – Trả lại thời gian cho yêu thương." Giải pháp không gian sống sạch hoàn hảo và trải nghiệm thảnh thơi chuẩn thượng lưu.
          </p>
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: #10B981;">
            <span class="pulse-dot"></span>
            <span>All Systems Operational • 24/7 Smart Cloud Active</span>
          </div>
        </div>

        <!-- Col 2: Products -->
        <div>
          <h4 class="footer-title">Dòng Sản Phẩm</h4>
          <ul class="footer-links">
            <li><a href="product-detail.html?id=1">CLEANNOVA AI X1 (Flagship)</a></li>
            <li><a href="product-detail.html?id=2">CLEANNOVA AI X2 (Ultra Tech)</a></li>
            <li><a href="product-detail.html?id=3">CLEANNOVA PRO (Slim Fit)</a></li>
            <li><a href="product-detail.html?id=4">CLEANNOVA MAX (Mansion)</a></li>
            <li><a href="product-detail.html?id=5">CLEANNOVA PET SPECIAL</a></li>
            <li><a href="products.html?category=accessories">Phụ Kiện Chính Hãng</a></li>
          </ul>
        </div>

        <!-- Col 3: Technology & Solutions -->
        <div>
          <h4 class="footer-title">Công Nghệ</h4>
          <ul class="footer-links">
            <li><a href="index.html#technology">Hệ Thống AI 3D LiDAR</a></li>
            <li><a href="index.html#technology">Trạm Sạc All-in-One 80°C</a></li>
            <li><a href="index.html#technology">Bộ Lọc Kháng Khuẩn HEPA</a></li>
            <li><a href="user-flow.html">Sơ Đồ Luồng Hoạt Động</a></li>
            <li><a href="admin.html">Hệ Thống Quản Trị Website</a></li>
          </ul>
        </div>

        <!-- Col 4: Customer Support -->
        <div>
          <h4 class="footer-title">Hỗ Trợ & Bảo Hành</h4>
          <ul class="footer-links">
            <li><a href="contact.html">Trung Tâm Hỗ Trợ 24/7</a></li>
            <li><a href="contact.html">Chính Sách 1 Đổi 1 Trong 30 Ngày</a></li>
            <li><a href="contact.html">Chính Sách Bảo Hành 18 Tháng</a></li>
            <li><a href="contact.html">Dùng Thử 7 Ngày Miễn Phí</a></li>
            <li><a href="contact.html">Hướng Dẫn Kết Nối Ứng Dụng</a></li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div>
          <p>© 2026 CLEANNOVA Smart Robotics Corp. All rights reserved.</p>
        </div>
        <div style="display: flex; gap: 24px;">
          <a href="#">Chính Sách Bảo Mật</a>
          <a href="#">Điều Khoản Dịch Vụ</a>
          <a href="#">Chứng Nhận Chất Lượng Quốc Tế</a>
        </div>
      </div>
    </div>
  `;
}

/* ---------------------------------------------------------
   3. MOBILE DRAWER NAVIGATION
   --------------------------------------------------------- */
function initMobileDrawer() {
  const existingDrawer = document.getElementById('mobile-drawer');
  if (existingDrawer) return;

  const backdrop = document.createElement('div');
  backdrop.id = 'drawer-backdrop';
  backdrop.className = 'drawer-backdrop';

  const drawer = document.createElement('aside');
  drawer.id = 'mobile-drawer';
  drawer.className = 'mobile-drawer';
  drawer.innerHTML = `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 20px; border-bottom: 1px solid var(--border-light);">
        <a href="index.html" class="nav-brand">
          <div class="brand-badge">✦</div>
          <span>CLEAN<span>NOVA</span></span>
        </a>
        <button id="drawer-close-btn" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">✕</button>
      </div>
      <nav class="drawer-links">
        <a href="index.html">Trang chủ</a>
        <a href="products.html">Sản phẩm</a>
        <a href="index.html#technology">Công nghệ AI</a>
        <a href="index.html#lifestyle">Giải pháp</a>
        <a href="user-flow.html">Sơ đồ User Flow</a>
        <a href="cart.html">Giỏ hàng</a>
        <a href="admin.html">Quản trị Admin</a>
        <a href="contact.html">Liên hệ hỗ trợ</a>
      </nav>
    </div>
    <div>
      <a href="products.html" class="btn btn-cta btn-block" style="margin-bottom: 12px;">Dùng Thử 7 Ngày Miễn Phí</a>
      <p style="text-align: center; font-size: 0.75rem; color: var(--text-muted);">Hotline miễn cước: 1900 8899</p>
    </div>
  `;

  document.body.appendChild(backdrop);
  document.body.appendChild(drawer);

  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('drawer-close-btn');

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
}

/* ---------------------------------------------------------
   4. SEARCH OVERLAY & INSTANT SEARCH
   --------------------------------------------------------- */
function initSearch() {
  const existingSearch = document.getElementById('search-overlay');
  if (existingSearch) return;

  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.className = 'search-overlay';
  overlay.innerHTML = `
    <div class="search-box-wrap">
      <div class="search-input-group">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" id="global-search-input" placeholder="Tìm kiếm robot, công nghệ (AI X1, LiDAR, 8000Pa...)" autocomplete="off">
        <button id="search-close-btn" style="background: none; border: none; font-size: 1.25rem; color: #64748B; cursor: pointer; padding: 4px;">✕</button>
      </div>
      <div id="search-results-box" class="search-results-dropdown" style="display: none;"></div>
    </div>
  `;

  document.body.appendChild(overlay);

  const openBtn = document.getElementById('search-toggle-btn');
  const closeBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('global-search-input');
  const resultsBox = document.getElementById('search-results-box');

  const openSearch = () => {
    overlay.style.display = 'block';
    searchInput.focus();
  };

  const closeSearch = () => {
    overlay.style.display = 'none';
    searchInput.value = '';
    resultsBox.style.display = 'none';
  };

  if (openBtn) openBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      resultsBox.style.display = 'none';
      return;
    }

    const matches = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.tagline.toLowerCase().includes(q) || 
      p.features.some(f => f.toLowerCase().includes(q))
    );

    if (matches.length === 0) {
      resultsBox.innerHTML = `<div style="padding: 20px; text-align: center; color: #94A3B8;">Không tìm thấy robot nào phù hợp với từ khóa "${q}".</div>`;
      resultsBox.style.display = 'block';
      return;
    }

    resultsBox.innerHTML = matches.map(p => `
      <a href="product-detail.html?id=${p.id}" class="search-result-row">
        <img src="${p.image}" alt="${p.name}">
        <div style="flex: 1;">
          <div style="font-weight: 700; color: #0F172A;">${p.name}</div>
          <div style="font-size: 0.8125rem; color: #64748B;">${p.suctionDisplay} • ${p.features[0]}</div>
        </div>
        <div style="font-weight: 800; color: #10B981;">${formatPrice(p.price)}</div>
      </a>
    `).join('');
    resultsBox.style.display = 'block';
  });
}

/* ---------------------------------------------------------
   5. TOAST NOTIFICATION SYSTEM
   --------------------------------------------------------- */
function showToast(message, icon = '✦') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="font-size: 1.2rem; color: #10B981;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

/* ---------------------------------------------------------
   6. SCROLL EFFECTS & NAVBAR BEHAVIOR
   --------------------------------------------------------- */
function initScrollEffects() {
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      if (header) header.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ---------------------------------------------------------
   7. INTERACTIVE TECHNOLOGY SECTION TABS
   --------------------------------------------------------- */
const TECH_DATA = {
  ai3d: {
    title: 'Trí Tuệ Nhân Tạo AI 3D Obstacle Avoidance',
    desc: 'Chip xử lý NPU độc quyền của Cleannova quét và phân tích không gian với tần số 30 khung hình/giây. Nhận diện chính xác 68 loại vật cản trong nhà như dây cáp sạc, giày dép, đồ chơi trẻ em và chất thải thú cưng để chủ động tránh né mượt mà.',
    metricVal: '< 1 cm',
    metricLbl: 'Độ chính xác né tránh',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop'
  },
  lidar: {
    title: 'Hệ Thống Định Vị Laser LiDAR LDS 360°',
    desc: 'Cảm biến laser thế hệ mới nhất xoay 360 độ liên tục, lập bản đồ không gian sống 3D hoàn chỉnh chỉ sau một lượt quét đầu tiên. Khả năng ghi nhớ tới 5 tầng lầu và tự động tối ưu hóa đường đi làm sạch nhanh hơn 40%.',
    metricVal: '0.1 Giây',
    metricLbl: 'Tốc độ phản hồi laser',
    image: 'https://images.unsplash.com/photo-1563770660941-10a63d5fbab0?w=800&q=85&auto=format&fit=crop'
  },
  suction: {
    title: 'Động Cơ Không Chổi Than Turbo Clean 8.000 – 15.000Pa',
    desc: 'Được chế tạo từ hợp kim titanium siêu nhẹ, động cơ hút Cleannova sản sinh lực hút áp suất cực đại lên tới 15.000Pa, hút sạch triệt để mọi hạt bụi mịn ẩn sâu trong thảm lông và các khe kẽ sàn gỗ.',
    metricVal: '15.000 Pa',
    metricLbl: 'Lực hút áp suất cực đại',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=85&auto=format&fit=crop'
  },
  hepa: {
    title: 'Hệ Thống Lọc Kháng Khuẩn 5 Lớp HEPA H13/H14',
    desc: 'Không chỉ dọn sạch sàn nhà, Cleannova còn thanh lọc không khí thở. Hệ thống màng lọc tiêu chuẩn y tế giữ lại 99.97% vi khuẩn, phấn hoa, bào tử nấm mốc và các hạt bụi mịn PM0.3 gây dị ứng đường hô hấp.',
    metricVal: '99.97%',
    metricLbl: 'Hiệu suất lọc bụi mịn PM0.3',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=85&auto=format&fit=crop'
  },
  dock: {
    title: 'Trạm Sạc Tự Động Đa Năng All-in-One 80°C',
    desc: 'Trải nghiệm đỉnh cao của sự thảnh thơi. Dock sạc tự động hút rác vào túi khử mùi 3.2L (dùng suốt 60 ngày), tự bơm nước sạch, giặt sạch khăn lau bằng nước nóng và sấy khô ở 80°C ngăn chặn ẩm mốc và mùi hôi.',
    metricVal: '60 Ngày',
    metricLbl: 'Không cần chạm tay đổ rác',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85&auto=format&fit=crop'
  }
};

function initTechTabs() {
  const tabs = document.querySelectorAll('.tech-tab-btn');
  const titleEl = document.getElementById('tech-title');
  const descEl = document.getElementById('tech-desc');
  const valEl = document.getElementById('tech-metric-val');
  const lblEl = document.getElementById('tech-metric-lbl');
  const imgEl = document.getElementById('tech-img');

  if (!tabs.length || !titleEl) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const techKey = tab.dataset.tech;
      const data = TECH_DATA[techKey];
      if (!data) return;

      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      valEl.textContent = data.metricVal;
      lblEl.textContent = data.metricLbl;
      imgEl.src = data.image;
    });
  });
}
