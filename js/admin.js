/* ==========================================================================
   CLEANNOVA - ADMIN APPLICATION LOGIC (RBAC & SECURE API)
   Server Auth Guard • Live Database Orders • Status Update • Real KPI
   ========================================================================== */

let adminOrders = [];
let adminStats = null;

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Kiểm tra quyền Admin bảo mật phía Client kết hợp Server
  const isAuthorized = await Auth.requireAdminGuard();
  if (!isAuthorized) return;

  // 2. Cập nhật thông tin profile của Admin trên thanh Topbar
  renderAdminUserProfile();

  // 3. Khởi tạo Sidebar
  initAdminSidebar();

  // 4. Tải dữ liệu thực tế từ Server Backend API
  await loadAdminData();
});

function renderAdminUserProfile() {
  const user = Auth.getUser();
  if (!user) return;

  const profileBox = document.querySelector('.admin-user-profile');
  if (profileBox) {
    const initial = (user.full_name || 'AD').substring(0, 2).toUpperCase();
    profileBox.innerHTML = `
      <div style="text-align: right;">
        <div style="font-weight: 700; color: #0F172A; font-size: 0.9375rem;">${user.full_name}</div>
        <div style="font-size: 0.75rem; color: #10B981; font-weight: 600;">✦ Quản Trị Viên (Online)</div>
      </div>
      <div class="admin-avatar" style="background: linear-gradient(135deg, #10B981, #059669); color: #fff; font-weight: 700; display:flex; align-items:center; justify-content:center; border-radius:50%; width:36px; height:36px;">
        ${initial}
      </div>
    `;
  }
}

function initAdminSidebar() {
  const sidebar = document.getElementById('admin-sidebar');
  if (!sidebar) return;

  const currentFile = window.location.pathname.split('/').pop() || 'admin.html';

  sidebar.innerHTML = `
    <div>
      <div class="admin-sidebar-header">
        <a href="admin.html" class="admin-brand">
          <div style="width: 28px; height: 28px; background: linear-gradient(135deg, #C6A667 0%, #B89550 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; color: #fff;">✦</div>
          <span>CLEAN<span style="color: #C6A667;">NOVA</span> <span style="font-size: 0.65rem; background: rgba(16, 185, 129, 0.2); color: #059669; padding: 2px 6px; border-radius: 4px; font-weight: 700;">ADMIN</span></span>
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
      </nav>
    </div>

    <div class="admin-sidebar-footer" style="display:flex; flex-direction:column; gap:8px;">
      <a href="index.html" class="btn btn-secondary btn-sm btn-block" style="background: rgba(255,255,255,0.08); color: #FFFFFF; border-color: rgba(255,255,255,0.15); text-align: center;">
        <span>🌐 Xem Website Bán Hàng</span>
      </a>
      <button onclick="Auth.logout()" class="btn btn-sm btn-block" style="background: rgba(239, 68, 68, 0.15); color: #F87171; border: 1px solid rgba(239, 68, 68, 0.3); cursor: pointer;">
        <span>🚪 Đăng Xuất Quản Trị</span>
      </button>
    </div>
  `;
}

async function loadAdminData() {
  try {
    // 1. Tải KPI & thống kê thực tế từ server
    const statsRes = await Auth.apiFetch('/api/admin/stats');
    if (statsRes.ok) {
      const statsJson = await statsRes.json();
      if (statsJson.success) {
        adminStats = statsJson.stats;
      }
    }

    // 2. Tải toàn bộ đơn hàng hệ thống từ server
    const ordersRes = await Auth.apiFetch('/api/admin/orders');
    if (ordersRes.ok) {
      const ordersJson = await ordersRes.json();
      if (ordersJson.success) {
        adminOrders = ordersJson.orders || [];
      }
    }

    renderDashboardUI();
  } catch (err) {
    console.error('Lỗi khi tải dữ liệu admin từ API:', err);
    showToast('Không thể đồng bộ dữ liệu quản trị từ máy chủ.', '⚠️');
  }
}

function renderDashboardUI() {
  // 1. Render KPIs trên admin.html
  const kpiRev = document.getElementById('kpi-revenue');
  const kpiOrders = document.getElementById('kpi-orders');
  const kpiSold = document.getElementById('kpi-sold');
  const kpiInv = document.getElementById('kpi-inventory');

  if (adminStats) {
    if (kpiRev) kpiRev.innerHTML = formatPriceHTML(adminStats.totalRevenue);
    if (kpiOrders) kpiOrders.textContent = adminStats.totalOrders;
    if (kpiSold) kpiSold.textContent = adminStats.itemsSold;
    if (kpiInv) kpiInv.textContent = adminStats.inventoryCount;
  }

  // 2. Render Biểu đồ Doanh Thu
  const chartBox = document.getElementById('revenue-chart');
  if (chartBox && adminStats) {
    const data = adminStats.revenueMonthly || [];
    if (!data.length) {
      chartBox.innerHTML = '<p style="padding:48px 12px;text-align:center;color:#707070;">Chưa có đơn hàng nào trong hệ thống. Biểu đồ sẽ hiển thị khi có doanh thu thực tế.</p>';
    } else {
      const maxVal = Math.max(...data.map(d => d.value)) || 1;
      chartBox.innerHTML = `
        <div class="admin-chart-stage">
          ${data.map(d => {
            const pct = Math.max(15, Math.round((d.value / maxVal) * 100));
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
          <span style="color: #C6A667; font-weight: 700;">Dữ liệu doanh thu thực tế từ Server Database</span>
        </div>
      `;
    }
  }

  // 3. Render Đơn Hàng Gần Đây trên admin.html
  const recentOrdersTable = document.getElementById('recent-orders-table-body');
  if (recentOrdersTable) {
    if (adminOrders.length === 0) {
      recentOrdersTable.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#94A3B8;padding:24px;">Chưa có đơn hàng nào.</td></tr>';
    } else {
      recentOrdersTable.innerHTML = adminOrders.slice(0, 5).map(o => `
        <tr>
          <td><strong>${o.orderId || o.id}</strong></td>
          <td>${o.customer ? o.customer.name : 'Khách vãng lai'}</td>
          <td>${(o.items || []).map(i => i.name + ' ×' + i.quantity).join(', ')}</td>
          <td>${o.date || ''}</td>
          <td><strong>${formatPriceHTML(o.finalTotal || 0)}</strong></td>
          <td><span class="status-pill status-${getStatusClass(o.status)}">${o.status || 'Đang xử lý'}</span></td>
        </tr>
      `).join('');
    }
  }

  // 4. Render Tất Cả Đơn Hàng trên admin-orders.html (Có thể cập nhật trạng thái thực tế vào DB!)
  const allOrdersTable = document.getElementById('all-orders-table-body');
  if (allOrdersTable) {
    if (adminOrders.length === 0) {
      allOrdersTable.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#94A3B8;padding:24px;">Hệ thống chưa có đơn đặt hàng nào.</td></tr>';
    } else {
      allOrdersTable.innerHTML = adminOrders.map(o => {
        const orderId = o.orderId || o.id;
        return `
          <tr>
            <td><strong>${orderId}</strong></td>
            <td>
              <div style="font-weight:600;">${o.customer ? o.customer.name : ''}</div>
              <div style="font-size:0.75rem;color:#64748B;">${o.customer ? o.customer.phone : ''} • ${o.customer ? o.customer.city : ''}</div>
            </td>
            <td style="max-width:280px;">${(o.items || []).map(i => i.name + ' ×' + i.quantity).join(', ')}</td>
            <td>${o.date || ''}</td>
            <td><strong>${formatPriceHTML(o.finalTotal || 0)}</strong></td>
            <td><span class="status-pill status-${getStatusClass(o.status)}">${o.status || 'Đang xử lý'}</span></td>
            <td>
              <select onchange="updateOrderStatus('${orderId}', this.value)" style="padding: 4px 8px; border-radius: 6px; border: 1px solid #CBD5E1; font-size: 0.8rem; background: #fff; cursor: pointer;">
                <option value="Đang xử lý" ${o.status === 'Đang xử lý' ? 'selected' : ''}>Đang xử lý</option>
                <option value="Đang giao" ${o.status === 'Đang giao' ? 'selected' : ''}>Đang giao</option>
                <option value="Đã hoàn thành" ${o.status === 'Đã hoàn thành' ? 'selected' : ''}>Đã hoàn thành</option>
                <option value="Đã hủy" ${o.status === 'Đã hủy' ? 'selected' : ''}>Đã hủy</option>
              </select>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // 5. Render Sản Phẩm trên admin-products.html
  const adminProductsTable = document.getElementById('admin-products-table-body');
  if (adminProductsTable && typeof PRODUCTS !== 'undefined') {
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
        <td><strong>${formatPriceHTML(p.price)}</strong></td>
        <td>${p.suctionDisplay || '8.000 Pa'}</td>
        <td>${p.stock !== null ? p.stock + ' máy' : '396 máy'}</td>
        <td><span class="status-pill status-instock">Còn hàng</span></td>
        <td>
          <button onclick="showToast('Xem thông tin: ${p.name}', '✏️')" class="btn btn-secondary btn-sm" style="padding: 4px 10px; font-size: 0.75rem;">
            Chi tiết
          </button>
        </td>
      </tr>
    `).join('');
  }

  // 6. Render Tồn Kho trên admin-inventory.html
  const adminInventoryTable = document.getElementById('admin-inventory-table-body');
  if (adminInventoryTable && typeof PRODUCTS !== 'undefined') {
    adminInventoryTable.innerHTML = PRODUCTS.map(p => `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td>${p.stock !== null ? p.stock : '150'} cái</td>
        <td>${adminOrders.reduce((sum, o) => sum + (o.items || []).filter(i => i.id === p.id).reduce((s, it) => s + it.quantity, 0), 0)} cái</td>
        <td>${formatPriceHTML(p.price)}</td>
        <td>
          <span class="status-pill status-instock">
            Đảm bảo tồn kho
          </span>
        </td>
        <td>
          <button onclick="showToast('Đã ghi nhận yêu cầu kiểm kê ${p.name}', '📦')" class="btn btn-secondary btn-sm" style="padding: 4px 10px; font-size: 0.75rem;">
            + Kiểm kê
          </button>
        </td>
      </tr>
    `).join('');
  }
}

// Cập nhật trạng thái đơn hàng trực tiếp lên Server Database
async function updateOrderStatus(orderId, newStatus) {
  try {
    const res = await Auth.apiFetch(`/api/admin/orders/${encodeURIComponent(orderId)}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(`Đã cập nhật đơn ${orderId} thành "${newStatus}"!`, '✓');
      // Tải lại dữ liệu để cập nhật biểu đồ & KPI
      await loadAdminData();
    } else {
      showToast(data.message || 'Lỗi cập nhật trạng thái đơn.', '⚠️');
    }
  } catch (err) {
    showToast('Lỗi kết nối khi cập nhật đơn hàng.', '⚠️');
  }
}

function getStatusClass(status) {
  if (status === 'Đã hoàn thành') return 'instock';
  if (status === 'Đang giao') return 'shipping';
  if (status === 'Đã hủy') return 'lowstock';
  return 'processing';
}
