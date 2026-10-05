/* ==========================================================================
   CLEANNOVA - ADMIN APPLICATION LOGIC
   Sidebar injection • Dynamic tables • Revenue chart • Search & Filter
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAdminSidebar();
  initAdminDashboard();
});

function initAdminSidebar() {
  const sidebar = document.getElementById('admin-sidebar');
  if (!sidebar) return;

  const currentFile = window.location.pathname.split('/').pop() || 'admin.html';

  sidebar.innerHTML = `
    <div>
      <div class="admin-sidebar-header">
        <a href="admin.html" class="admin-brand">
          <div style="width: 28px; height: 28px; background: linear-gradient(135deg, #10B981 0%, #06B6D4 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">✦</div>
          <span>CLEAN<span style="color: #10B981;">NOVA</span></span>
        </a>
      </div>

      <nav class="admin-sidebar-nav">
        <a href="admin.html" class="admin-nav-item ${currentFile === 'admin.html' ? 'active' : ''}">
          <span>📊</span>
          <span>Báo Cáo Doanh Thu</span>
        </a>
        <a href="admin-products.html" class="admin-nav-item ${currentFile === 'admin-products.html' ? 'active' : ''}">
          <span>📦</span>
          <span>Quản Lý Sản Phẩm</span>
        </a>
        <a href="admin-inventory.html" class="admin-nav-item ${currentFile === 'admin-inventory.html' ? 'active' : ''}">
          <span>🏭</span>
          <span>Quản Lý Tồn Kho</span>
        </a>
        <a href="admin-orders.html" class="admin-nav-item ${currentFile === 'admin-orders.html' ? 'active' : ''}">
          <span>📋</span>
          <span>Quản Lý Đơn Hàng</span>
        </a>
        <a href="user-flow.html" class="admin-nav-item ${currentFile === 'user-flow.html' ? 'active' : ''}">
          <span>🔄</span>
          <span>Sơ Đồ User Flow</span>
        </a>
      </nav>
    </div>

    <div class="admin-sidebar-footer">
      <a href="index.html" class="btn btn-secondary btn-sm btn-block" style="background: rgba(255,255,255,0.08); color: #FFFFFF; border-color: rgba(255,255,255,0.15);">
        <span>🌐 Xem Website Bán Hàng</span>
      </a>
    </div>
  `;
}

function initAdminDashboard() {
  // Populate KPIs if on admin.html
  const kpiRev = document.getElementById('kpi-revenue');
  const kpiOrders = document.getElementById('kpi-orders');
  const kpiSold = document.getElementById('kpi-sold');
  const kpiInv = document.getElementById('kpi-inventory');

  if (kpiRev) kpiRev.textContent = formatPrice(ADMIN_DATA.kpi.revenueToday);
  if (kpiOrders) kpiOrders.textContent = ADMIN_DATA.kpi.ordersToday;
  if (kpiSold) kpiSold.textContent = ADMIN_DATA.kpi.itemsSold;
  if (kpiInv) kpiInv.textContent = ADMIN_DATA.kpi.inventoryCount;

  // Render monthly revenue chart
  const chartBox = document.getElementById('revenue-chart');
  if (chartBox) {
    const data = ADMIN_DATA.revenueMonthly;
    const maxVal = Math.max(...data.map(d => d.value));

    chartBox.innerHTML = `
      <div class="admin-chart-stage">
        ${data.map(d => {
          const pct = Math.round((d.value / maxVal) * 100);
          return `
            <div class="chart-col">
              <div class="chart-bar-fill" style="height: ${pct}%;" title="${d.month}: ${d.value} Triệu VNĐ"></div>
              <div class="chart-col-label">${d.month}</div>
            </div>
          `;
        }).join('')}
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 14px; font-size: 0.8125rem; color: #64748B;">
        <span>✦ Đơn vị tính: Triệu VNĐ</span>
        <span style="color: #10B981; font-weight: 700;">Tăng trưởng +34.2% so với cùng kỳ</span>
      </div>
    `;
  }

  // Render Recent Orders on Dashboard
  const recentOrdersTable = document.getElementById('recent-orders-table-body');
  if (recentOrdersTable) {
    recentOrdersTable.innerHTML = ADMIN_DATA.orders.slice(0, 5).map(o => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.customer}</td>
        <td>${o.product}</td>
        <td>${o.date}</td>
        <td><strong>${formatPrice(o.total)}</strong></td>
        <td><span class="status-pill status-${o.status}">${o.statusText}</span></td>
      </tr>
    `).join('');
  }

  // Render Full Orders on admin-orders.html
  const allOrdersTable = document.getElementById('all-orders-table-body');
  if (allOrdersTable) {
    allOrdersTable.innerHTML = ADMIN_DATA.orders.map(o => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.customer}</td>
        <td>${o.product}</td>
        <td>${o.date}</td>
        <td><strong>${formatPrice(o.total)}</strong></td>
        <td><span class="status-pill status-${o.status}">${o.statusText}</span></td>
        <td>
          <button onclick="showToast('Đang cập nhật mã ${o.id}...', 'ℹ️')" class="btn btn-secondary btn-sm" style="padding: 4px 10px; font-size: 0.75rem;">
            Cập nhật
          </button>
        </td>
      </tr>
    `).join('');
  }

  // Render Products on admin-products.html
  const adminProductsTable = document.getElementById('admin-products-table-body');
  if (adminProductsTable) {
    adminProductsTable.innerHTML = PRODUCTS.map(p => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${p.image}" alt="${p.name}" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover; border: 1px solid rgba(226, 232, 240, 0.8);">
            <div>
              <div style="font-weight: 700; color: #0F172A;">${p.name}</div>
              <div style="font-size: 0.75rem; color: #64748B;">${p.series}</div>
            </div>
          </div>
        </td>
        <td><strong>${formatPrice(p.price)}</strong></td>
        <td>${p.suctionDisplay}</td>
        <td>${p.stock} máy</td>
        <td><span class="status-pill ${p.stock > 10 ? 'status-instock' : 'status-lowstock'}">${p.stock > 10 ? 'Còn hàng' : 'Sắp hết'}</span></td>
        <td>
          <button onclick="showToast('Mở trình chỉnh sửa ${p.name}', '✏️')" class="btn btn-secondary btn-sm" style="padding: 4px 10px; font-size: 0.75rem;">
            Sửa
          </button>
        </td>
      </tr>
    `).join('');
  }

  // Render Inventory on admin-inventory.html
  const adminInventoryTable = document.getElementById('admin-inventory-table-body');
  if (adminInventoryTable) {
    adminInventoryTable.innerHTML = ADMIN_DATA.inventory.map(item => `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td>${item.stock} cái</td>
        <td>${item.sold} cái</td>
        <td>${formatPrice(item.price)}</td>
        <td>
          <span class="status-pill ${item.status === 'in-stock' ? 'status-instock' : 'status-lowstock'}">
            ${item.status === 'in-stock' ? 'Đảm bảo tồn kho' : 'Cảnh báo ít hàng'}
          </span>
        </td>
        <td>
          <button onclick="showToast('Đã gửi yêu cầu nhập thêm ${item.name}', '📦')" class="btn btn-secondary btn-sm" style="padding: 4px 10px; font-size: 0.75rem;">
            + Nhập kho
          </button>
        </td>
      </tr>
    `).join('');
  }
}
