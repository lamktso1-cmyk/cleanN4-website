const bcrypt = require('bcryptjs');
const db = require('../db');

async function seedData() {
  console.log('--- KHỞI TẠO TÀI KHOẢN VÀ DỮ LIỆU DEMO CLEANNOVA ---');

  const salt = await bcrypt.genSalt(10);

  // 1. Admin account
  const adminPasswordHash = await bcrypt.hash('admin123', salt);
  const adminUser = {
    id: 'usr_admin_001',
    email: 'admin@cleannova.test',
    password_hash: adminPasswordHash,
    full_name: 'CleanNova Administrator',
    phone: '0988123456',
    address: 'Toà nhà CleanNova Innovation Tower, 123 Lê Duẩn, Quận 1',
    city: 'TP. Hồ Chí Minh',
    role: 'admin',
    auth_provider: 'email',
    avatar_url: '',
    is_verified: true
  };
  db.saveUser(adminUser);
  console.log('✓ Đã tạo/cập nhật tài khoản Admin: admin@cleannova.test / admin123 (Role: admin)');

  // 2. Customer 1
  const customerPasswordHash = await bcrypt.hash('CustomerDemo@2026', salt);
  const customer1 = {
    id: 'usr_cust_001',
    email: 'customer1@cleannova.test',
    password_hash: customerPasswordHash,
    full_name: 'Nguyễn Minh Anh',
    phone: '0901234567',
    address: 'Căn hộ 12B, Landmark 81, Vinhomes Central Park, Bình Thạnh',
    city: 'TP. Hồ Chí Minh',
    role: 'customer',
    auth_provider: 'email',
    avatar_url: '',
    is_verified: true
  };
  db.saveUser(customer1);
  console.log('✓ Đã tạo/cập nhật tài khoản Customer 1: customer1@cleannova.test / CustomerDemo@2026');

  // 3. Customer 2
  const customer2 = {
    id: 'usr_cust_002',
    email: 'customer2@cleannova.test',
    password_hash: customerPasswordHash,
    full_name: 'Trần Hoàng Nam',
    phone: '0912345678',
    address: 'Số 45 Phố Huế, Hàng Bài, Hoàn Kiếm',
    city: 'Hà Nội',
    role: 'customer',
    auth_provider: 'email',
    avatar_url: '',
    is_verified: true
  };
  db.saveUser(customer2);
  console.log('✓ Đã tạo/cập nhật tài khoản Customer 2: customer2@cleannova.test / CustomerDemo@2026');

  // 4. Customer 3
  const customer3 = {
    id: 'usr_cust_003',
    email: 'customer3@cleannova.test',
    password_hash: customerPasswordHash,
    full_name: 'Lê Thanh Hà',
    phone: '0933456789',
    address: '88 Nguyễn Thị Minh Khai, Phường 6, Quận 3',
    city: 'TP. Hồ Chí Minh',
    role: 'customer',
    auth_provider: 'email',
    avatar_url: '',
    is_verified: true
  };
  db.saveUser(customer3);
  console.log('✓ Đã tạo/cập nhật tài khoản Customer 3: customer3@cleannova.test / CustomerDemo@2026');

  // 5. Seed sample realistic orders linked to specific customers
  const sampleOrders = [
    {
      orderId: '#CN-2026-1088',
      user_id: 'usr_cust_001',
      customer: {
        name: 'Nguyễn Minh Anh',
        phone: '0901234567',
        email: 'customer1@cleannova.test',
        address: 'Căn hộ 12B, Landmark 81, Vinhomes Central Park, Bình Thạnh',
        city: 'TP. Hồ Chí Minh',
        note: 'Giao giờ hành chính, gọi trước 15 phút'
      },
      items: [
        {
          id: 1,
          name: 'Robot hút bụi lau nhà thông minh CLEANNOVA',
          price: 10500000,
          quantity: 1,
          image: 'assets/images/cat-robot.jpg'
        },
        {
          id: 6,
          name: 'Dung dịch lau sàn dành cho robot',
          price: 129000,
          quantity: 2,
          image: 'assets/images/products/dung-dich-lau-san.webp'
        }
      ],
      subtotal: 10758000,
      discountAmount: 0,
      finalTotal: 10758000,
      paymentMethod: 'cod',
      date: '08/10/2026',
      status: 'Đang giao',
      created_at: new Date('2026-10-08T09:30:00Z').toISOString()
    },
    {
      orderId: '#CN-2026-1089',
      user_id: 'usr_cust_002',
      customer: {
        name: 'Trần Hoàng Nam',
        phone: '0912345678',
        email: 'customer2@cleannova.test',
        address: 'Số 45 Phố Huế, Hàng Bài, Hoàn Kiếm',
        city: 'Hà Nội',
        note: 'Giao hàng tận tay'
      },
      items: [
        {
          id: 2,
          name: 'Túi đựng bụi CLEANNOVA',
          price: 149000,
          quantity: 3,
          image: 'assets/images/products/tui-dung-bui.webp'
        },
        {
          id: 3,
          name: 'Bộ lọc HEPA CLEANNOVA',
          price: 249000,
          quantity: 2,
          image: 'assets/images/products/bo-loc-bui.webp'
        }
      ],
      subtotal: 945000,
      discountAmount: 0,
      finalTotal: 945000,
      paymentMethod: 'cod',
      date: '09/10/2026',
      status: 'Đang xử lý',
      created_at: new Date('2026-10-09T08:15:00Z').toISOString()
    }
  ];

  sampleOrders.forEach(o => db.saveOrder(o));
  console.log('✓ Đã tạo các đơn hàng mẫu gắn trực tiếp với Customer 1 và Customer 2');

  console.log('----------------------------------------------------');
  console.log('HOÀN THÀNH SEED DỮ LIỆU THÀNH CÔNG!');
  return {
    admin: adminUser.email,
    customers: [customer1.email, customer2.email, customer3.email],
    ordersCount: sampleOrders.length
  };
}

if (require.main === module) {
  seedData()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('Seed error:', err);
      process.exit(1);
    });
}

module.exports = seedData;
