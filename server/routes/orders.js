const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateUser } = require('../middleware/auth');

// 1. CREATE ORDER (Chỉ người dùng đã xác thực mới được tạo đơn)
router.post('/', authenticateUser, (req, res) => {
  try {
    const { customer, items, subtotal, discountAmount, finalTotal, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Giỏ hàng trống. Vui lòng chọn ít nhất một sản phẩm để đặt hàng.'
      });
    }

    if (!customer || !customer.name || !customer.phone || !customer.address || !customer.city) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ thông tin giao hàng (Họ tên, Số điện thoại, Địa chỉ, Tỉnh/Thành).'
      });
    }

    const orderId = '#CN-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

    const newOrder = {
      orderId,
      user_id: req.user.id, // Bắt buộc liên kết chặt chẽ với ID khách hàng đã xác thực
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        email: customer.email ? customer.email.trim() : req.user.email,
        address: customer.address.trim(),
        city: customer.city.trim(),
        note: (customer.note || '').trim()
      },
      items,
      subtotal: Number(subtotal) || 0,
      discountAmount: Number(discountAmount) || 0,
      finalTotal: Number(finalTotal) || 0,
      paymentMethod: paymentMethod || 'cod',
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'Đang xử lý',
      created_at: new Date().toISOString()
    };

    db.saveOrder(newOrder);

    return res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công!',
      order: newOrder
    });
  } catch (err) {
    console.error('Create order error:', err);
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi tạo đơn hàng.'
    });
  }
});

// 2. GET MY ORDERS (Chỉ xem đơn hàng của chính tài khoản mình)
router.get('/my-orders', authenticateUser, (req, res) => {
  try {
    const orders = db.getOrdersByUserId(req.user.id);
    return res.json({
      success: true,
      orders
    });
  } catch (err) {
    console.error('Get my orders error:', err);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi tải lịch sử đơn hàng.'
    });
  }
});

// 3. GET ORDER BY ID (Chỉ chủ sở hữu hoặc Admin mới được xem)
router.get('/:id', authenticateUser, (req, res) => {
  try {
    const order = db.findOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng.'
      });
    }

    if (order.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền truy cập vào đơn hàng này (403 Forbidden).'
      });
    }

    return res.json({
      success: true,
      order
    });
  } catch (err) {
    console.error('Get order error:', err);
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi tải thông tin đơn hàng.'
    });
  }
});

module.exports = router;
