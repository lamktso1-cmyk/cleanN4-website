const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateUser, requireRole } = require('../middleware/auth');

// Toàn bộ route admin bắt buộc phải đăng nhập và có role là 'admin'
router.use(authenticateUser, requireRole('admin'));

// 1. GET ALL ORDERS
router.get('/orders', (req, res) => {
  try {
    const orders = db.getOrders();
    return res.json({
      success: true,
      orders
    });
  } catch (err) {
    console.error('Admin get orders error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi tải đơn hàng quản trị.' });
  }
});

// 2. UPDATE ORDER STATUS
router.put('/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp trạng thái mới.' });
    }

    const updated = db.updateOrderStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng cần cập nhật.' });
    }

    return res.json({
      success: true,
      message: `Đã cập nhật trạng thái đơn hàng thành "${status}".`,
      order: updated
    });
  } catch (err) {
    console.error('Admin update order status error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật trạng thái đơn hàng.' });
  }
});

// 3. GET DASHBOARD STATS
router.get('/stats', (req, res) => {
  try {
    const orders = db.getOrders();
    const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.finalTotal) || 0), 0);
    const totalOrders = orders.length;
    const itemsSold = orders.reduce((sum, o) => {
      const items = o.items || [];
      return sum + items.reduce((iSum, item) => iSum + (Number(item.quantity) || 1), 0);
    }, 0);

    // Group revenue by month
    const monthlyMap = {};
    orders.forEach(o => {
      let monthKey = '10/2026';
      if (o.date) {
        const parts = String(o.date).split('/');
        if (parts.length === 3) {
          monthKey = parts[1].padStart(2, '0') + '/' + parts[2];
        }
      }
      monthlyMap[monthKey] = (monthlyMap[monthKey] || 0) + (Number(o.finalTotal) || 0);
    });

    const revenueMonthly = Object.keys(monthlyMap).map(k => ({
      month: k,
      value: Math.round((monthlyMap[k] / 1000000) * 100) / 100 // Triệu VNĐ
    }));

    return res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        itemsSold,
        inventoryCount: 396,
        revenueMonthly
      }
    });
  } catch (err) {
    console.error('Admin get stats error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi tải báo cáo thống kê.' });
  }
});

// 4. GET USERS LIST (Admin only)
router.get('/users', (req, res) => {
  try {
    const rawUsers = db.getUsers();
    const safeUsers = rawUsers.map(u => {
      const { password_hash, ...safe } = u;
      return safe;
    });
    return res.json({
      success: true,
      users: safeUsers
    });
  } catch (err) {
    console.error('Admin get users error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi tải danh sách người dùng.' });
  }
});

module.exports = router;
