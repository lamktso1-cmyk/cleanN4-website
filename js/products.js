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
  const detailUrl = `product-detail.html?id=${p.id}`;

  return `
    <div class="product-card card-hover-scale" data-id="${p.id}">
      ${p.badge ? `<div class="product-card-badge ${p.badgeType || 'badge-emerald'}">${p.badge}</div>` : ''}
      <div class="product-card-media img-zoom-container">
        <a href="${detailUrl}">
          <img src="${p.cardImage || p.image}" alt="${p.name}" loading="lazy">
        </a>
      </div>
      <div class="product-card-body">
        <div class="product-card-series">${p.series || 'Thiết Bị N4'}</div>
        <h3 class="product-card-title">
          <a href="${detailUrl}">${p.name}</a>
        </h3>
        <p class="product-card-tagline">${p.tagline || 'Thiết bị vệ sinh cao cấp chuẩn N4'}</p>

        ${(p.suction && p.suctionDisplay) ? `
          <div class="product-card-specs">
            <span class="spec-pill">💨 ${p.suctionDisplay}</span>
            ${p.battery ? `<span class="spec-pill">🔋 ${p.battery} phút</span>` : ''}
            ${p.area ? `<span class="spec-pill">📐 ${p.area} m²</span>` : ''}
          </div>
        ` : `
          <div class="product-card-specs">
            <span class="spec-pill">✓ Tiêu chuẩn N4</span>
            <span class="spec-pill">✓ Bảo hành chính hãng</span>
          </div>
        `}

        <div class="product-card-pricing">
          <span class="current-price">${p.price ? formatPriceHTML(p.price) : "Từ " + formatPriceHTML(PRICE_RANGE.min) + " (dự kiến)"}</span>
          ${p.oldPrice ? `<span class="old-price">${formatPriceHTML(p.oldPrice)}</span>` : ''}
          ${p.discount ? `<span class="discount-tag">-${p.discount}%</span>` : ''}
        </div>

        <div class="product-card-actions">
          <a href="${detailUrl}" class="btn btn-secondary btn-sm" style="width: 100%;">
            Chi Tiết
          </a>
          <button onclick="addToCart(${p.id}, 1); showToast('Đã thêm ${p.name} vào giỏ hàng!', '🛍️');" class="btn btn-primary btn-sm" style="width: 100%;">
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
  const sidebar = document.getElementById('filter-sidebar');
  if (!sidebar) return;
  let timer;
  sidebar.addEventListener('change', applyFilters);
  const search = document.getElementById('filter-search');
  if (search) search.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(applyFilters, 180); });
  const apply = document.getElementById('apply-filter');
  if (apply) apply.addEventListener('click', () => { applyFilters(); closeMobileFilter(); });
  const clear = document.getElementById('clear-filter');
  if (clear) clear.addEventListener('click', resetFilters);
}

function resetFilters() {
  document.querySelectorAll('#filter-sidebar input[type=checkbox]').forEach(cb => cb.checked = false);
  const search = document.getElementById('filter-search');
  if (search) search.value = '';
  applyFilters();
}

function resetAll() {
  currentCategory = 'all';
  document.querySelectorAll('.category-filter-tab').forEach(t => t.classList.toggle('active', (t.dataset.category || 'all') === 'all'));
  resetFilters();
}

function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`#filter-sidebar input[name="${name}"]:checked`)).map(cb => cb.value);
}

function applyFilters() {
  const q = ((document.getElementById('filter-search') || {}).value || '').trim().toLowerCase();
  const feats = getCheckedValues('feature');
  const pricedOnly = !!(document.getElementById('filter-priced') || {}).checked;

  let list = PRODUCTS.filter(p => !p.draft);
  if (currentCategory && currentCategory !== 'all') list = list.filter(p => p.category === currentCategory);
  if (q) list = list.filter(p => [p.name, p.tagline, p.description, p.categoryName].join(' ').toLowerCase().includes(q));
  // Chọn nhiều tính năng = sản phẩm phải có đủ các tính năng đó
  if (feats.length) list = list.filter(p => feats.every(k => (p.features || []).some(f => f.toLowerCase().includes(k.toLowerCase()))));
  if (pricedOnly) list = list.filter(p => typeof p.price === 'number');

  const sortSelect = document.getElementById('sort-select');
  list = sortProductsArray(list, sortSelect ? sortSelect.value : 'newest');
  renderProducts(list);

  const active = feats.length + (q ? 1 : 0) + (pricedOnly ? 1 : 0);
  const clear = document.getElementById('clear-filter');
  if (clear) { clear.hidden = active === 0; clear.textContent = active ? `Xóa lọc (${active})` : 'Xóa lọc'; }
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
  const byPrice = (a, b, dir) => {
    const x = typeof a.price === 'number' ? a.price : null, y = typeof b.price === 'number' ? b.price : null;
    if (x === null && y === null) return 0;
    if (x === null) return 1;      // chưa có giá luôn xếp cuối
    if (y === null) return -1;
    return dir * (x - y);
  };
  switch (sortBy) {
    case 'price-asc': return products.sort((a, b) => byPrice(a, b, 1));
    case 'price-desc': return products.sort((a, b) => byPrice(a, b, -1));
    case 'name': return products.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    default: return products.sort((a, b) => b.id - a.id);
  }
}

/* ---------------------------------------------------------
   5. MOBILE FILTER DRAWER
   --------------------------------------------------------- */
function closeMobileFilter() {
  const sidebar = document.getElementById('filter-sidebar');
  const overlay = document.getElementById('filter-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

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

  const close = closeMobileFilter;
  const _unused = () => {
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
  if (cat) {
    currentCategory = cat;
    const tab = document.querySelector(`[data-category="${cat}"]`);
    if (tab) {
      document.querySelectorAll('.category-filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    }
  }

  const q = params.get('q');
  const search = document.getElementById('filter-search');
  if (q && search) search.value = q;

  applyFilters();
}
