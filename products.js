/* ==========================================================================
   CLEANNOVA - PRODUCTS PAGE LOGIC
   Filtering • Sorting • Responsive Sidebar • URL parameters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initProductsPage();
});

let currentCategory = 'all';

function initProductsPage() {
  if (typeof PRODUCTS === 'undefined') return;

  renderProducts(PRODUCTS);
  initCategoryTabs();
  initFilters();
  initSort();
  initMobileFilter();
  parseURLParams();
}

/* ---------------------------------------------------------
   1. RENDER PRODUCT CARDS
   --------------------------------------------------------- */
function createProductCard(p) {
  const isAccessory = p.category === 'accessories';
  const detailUrl = isAccessory ? '#' : `product-detail.html?id=${p.id}`;

  return `
    <div class="product-card card-hover-scale" data-id="${p.id}">
      ${p.badge ? `<div class="product-card-badge ${p.badgeType || 'badge-emerald'}">${p.badge}</div>` : ''}
      <div class="product-card-media img-zoom-container">
        <a href="${detailUrl}">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </a>
      </div>
      <div class="product-card-body">
        <div class="product-card-series">${p.series || 'Phụ Kiện Chính Hãng'}</div>
        <h3 class="product-card-title">
          <a href="${detailUrl}">${p.name}</a>
        </h3>
        <p class="product-card-tagline">${p.tagline || 'Phụ kiện thay thế chính hãng chuẩn Cleannova'}</p>

        ${p.suctionDisplay ? `
          <div class="product-card-specs">
            <span class="spec-pill">💨 ${p.suctionDisplay}</span>
            <span class="spec-pill">🔋 ${p.battery} phút</span>
            <span class="spec-pill">📐 ${p.area} m²</span>
          </div>
        ` : `
          <div class="product-card-specs">
            <span class="spec-pill">✓ Tiêu chuẩn Cleannova</span>
            <span class="spec-pill">✓ Đóng gói vô trùng</span>
          </div>
        `}

        <div class="product-card-pricing">
          <span class="current-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ''}
          ${p.discount ? `<span class="discount-tag">-${p.discount}%</span>` : ''}
        </div>

        <div class="product-card-actions">
          ${!isAccessory ? `
            <a href="${detailUrl}" class="btn btn-secondary btn-sm" style="width: 100%;">
              Chi Tiết
            </a>
          ` : `
            <button onclick="addToCart(${p.id}, 1); showToast('Đã thêm ${p.name} vào giỏ hàng!', '🛍️');" class="btn btn-secondary btn-sm" style="width: 100%;">
              Thêm Nhanh
            </button>
          `}
          <button onclick="addToCart(${p.id}, 1); showToast('Đã thêm ${p.name} vào giỏ hàng!', '🛍️');" class="btn btn-cta btn-sm" style="width: 100%;">
            Mua Ngay
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(products) {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('products-count');
  const noProducts = document.getElementById('no-products');

  if (!grid) return;

  if (products.length === 0) {
    grid.style.display = 'none';
    if (noProducts) noProducts.style.display = 'block';
  } else {
    grid.style.display = 'grid';
    if (noProducts) noProducts.style.display = 'none';
    grid.innerHTML = products.map(p => createProductCard(p)).join('');
  }

  if (countEl) countEl.textContent = `${products.length} sản phẩm`;
}

/* ---------------------------------------------------------
   2. CATEGORY TABS (TẤT CẢ ROBOT / PHỤ KIỆN)
   --------------------------------------------------------- */
function initCategoryTabs() {
  const tabs = document.querySelectorAll('.category-filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category || 'all';
      applyFilters();
    });
  });
}

/* ---------------------------------------------------------
   3. MULTI-CRITERIA FILTERING
   --------------------------------------------------------- */
function initFilters() {
  const applyBtn = document.getElementById('apply-filter');
  const clearBtn = document.getElementById('clear-filter');

  if (applyBtn) applyBtn.addEventListener('click', applyFilters);
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      document.querySelectorAll('.filter-sidebar input[type=checkbox]').forEach(cb => cb.checked = false);
      applyFilters();
    });
  }

  document.querySelectorAll('.filter-sidebar input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', applyFilters);
  });
}

function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
}

function applyFilters() {
  let source = (currentCategory === 'accessories') 
    ? [...ACCESSORIES] 
    : (currentCategory === 'robots') 
      ? [...PRODUCTS] 
      : [...PRODUCTS, ...ACCESSORIES];

  const priceFilters = getCheckedValues('price');
  const suctionFilters = getCheckedValues('suction');
  const featureFilters = getCheckedValues('feature');
  const areaFilters = getCheckedValues('area');

  let filtered = source;

  // Price filter
  if (priceFilters.length > 0) {
    filtered = filtered.filter(p => {
      return priceFilters.some(f => {
        if (f === 'under5') return p.price < 5000000;
        if (f === '5to10') return p.price >= 5000000 && p.price <= 10000000;
        if (f === '10to15') return p.price > 10000000 && p.price <= 15000000;
        if (f === 'over15') return p.price > 15000000;
        return false;
      });
    });
  }

  // Suction filter (only applies to robots)
  if (suctionFilters.length > 0) {
    filtered = filtered.filter(p => {
      if (!p.suction) return false;
      return suctionFilters.some(f => {
        if (f === 'under5000') return p.suction <= 5000;
        if (f === '5000to10000') return p.suction > 5000 && p.suction <= 10000;
        if (f === 'over10000') return p.suction > 10000;
        return false;
      });
    });
  }

  // Feature filter
  if (featureFilters.length > 0) {
    filtered = filtered.filter(p => {
      if (!p.features) return false;
      return featureFilters.some(keyword => 
        p.features.some(f => f.toLowerCase().includes(keyword.toLowerCase()))
      );
    });
  }

  // Area filter
  if (areaFilters.length > 0) {
    filtered = filtered.filter(p => {
      if (!p.area) return false;
      return areaFilters.some(f => {
        if (f === 'under200') return p.area <= 200;
        if (f === '200to350') return p.area > 200 && p.area <= 350;
        if (f === 'over350') return p.area > 350;
        return false;
      });
    });
  }

  // Sorting
  const sortSelect = document.getElementById('sort-select');
  const sortBy = sortSelect ? sortSelect.value : 'popular';
  filtered = sortProductsArray(filtered, sortBy);

  renderProducts(filtered);
}

/* ---------------------------------------------------------
   4. SORTING
   --------------------------------------------------------- */
function initSort() {
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', applyFilters);
  }
}

function sortProductsArray(products, sortBy) {
  switch (sortBy) {
    case 'price-asc': return products.sort((a, b) => a.price - b.price);
    case 'price-desc': return products.sort((a, b) => b.price - a.price);
    case 'rating': return products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    default: return products.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  }
}

/* ---------------------------------------------------------
   5. MOBILE FILTER DRAWER
   --------------------------------------------------------- */
function initMobileFilter() {
  const btn = document.getElementById('mobile-filter-btn');
  const sidebar = document.getElementById('filter-sidebar');
  const overlay = document.getElementById('filter-overlay');
  const closeBtn = document.getElementById('filter-close');

  if (btn && sidebar && overlay) {
    btn.addEventListener('click', () => {
      sidebar.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  const close = () => {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (overlay) overlay.addEventListener('click', close);
}

/* ---------------------------------------------------------
   6. URL QUERY PARAMETERS
   --------------------------------------------------------- */
function parseURLParams() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category');
  if (cat === 'accessories') {
    currentCategory = 'accessories';
    const accTab = document.querySelector('[data-category="accessories"]');
    if (accTab) {
      document.querySelectorAll('.category-filter-tab').forEach(t => t.classList.remove('active'));
      accTab.classList.add('active');
    }
  }

  const badge = params.get('badge');
  if (badge) {
    const cb = document.querySelector('input[name="feature"][value="Tự đổ rác"]');
    if (cb) cb.checked = true;
  }

  applyFilters();
}
