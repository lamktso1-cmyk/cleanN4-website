const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('./server/db');
const { JWT_SECRET } = require('./server/middleware/auth');
const authRoutes = require('./server/routes/auth');
const orderRoutes = require('./server/routes/orders');
const adminRoutes = require('./server/routes/admin');
const seedData = require('./server/scripts/seed');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auto-seed initial demo accounts on first launch if users database is empty
try {
  const currentUsers = db.getUsers();
  if (!currentUsers || currentUsers.length === 0) {
    console.log('[CleanNova] Database rỗng, tự động khởi tạo các tài khoản demo...');
    seedData();
  }
} catch (e) {
  console.error('[CleanNova] Lỗi kiểm tra seed:', e);
}

// 1. API ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Dev Seed Route
app.post('/api/dev/seed', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, message: 'Seed API bị vô hiệu hóa trên môi trường production.' });
  }
  try {
    const result = await seedData();
    return res.json({ success: true, message: 'Khởi tạo tài khoản demo thành công!', result });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Lỗi chạy seed dữ liệu.', error: err.message });
  }
});

// 2. SERVER-SIDE GUARD CHO CÁC TRANG ADMIN
// Chặn triệt để việc truy cập trực tiếp file admin.html, admin-orders.html,... từ trình duyệt
const adminHtmlPages = ['/admin.html', '/admin-products.html', '/admin-orders.html', '/admin-inventory.html'];

app.use((req, res, next) => {
  const cleanPath = req.path.toLowerCase();
  if (adminHtmlPages.some(page => cleanPath === page.toLowerCase())) {
    const token = req.cookies.cleannova_token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.substring(7) : null);
    if (!token) {
      return res.redirect(`/login.html?redirect=${encodeURIComponent(req.originalUrl)}`);
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = db.findUserById(decoded.id);
      if (!user || user.role !== 'admin') {
        return res.redirect('/403.html');
      }
      // Người dùng hợp lệ là Admin -> Tiếp tục
    } catch (err) {
      return res.redirect(`/login.html?redirect=${encodeURIComponent(req.originalUrl)}`);
    }
  }
  next();
});

// 3. STATIC FILES
app.use(express.static(__dirname));

// Fallback route cho SPA hoặc 404
app.get('/403', (req, res) => {
  res.sendFile(path.join(__dirname, '403.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`✦ CLEANNOVA SERVER ĐANG CHẠY TẠI: http://localhost:${PORT}`);
  console.log(`✦ Tài khoản Admin:    admin@cleannova.test / admin123`);
  console.log(`✦ Tài khoản Customer: customer1@cleannova.test / CustomerDemo@2026`);
  console.log(`====================================================`);
});
