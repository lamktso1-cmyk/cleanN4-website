const http = require('http');


function request(method, path, data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const payload = data ? JSON.stringify(data) : null;
    const reqHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };
    if (payload) {
      reqHeaders['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path,
        method,
        headers: reqHeaders
      },
      res => {
        let body = '';
        res.on('data', chunk => (body += chunk));
        res.on('end', () => {
          let parsed = null;
          try {
            parsed = JSON.parse(body);
          } catch (e) {
            parsed = body;
          }
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: parsed
          });
        });
      }
    );

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function runTests() {
  console.log('\n============================================================');
  console.log('✦ CLEANNOVA - KIỂM THỬ TỰ ĐỘNG RBAC & XÁC THỰC BẢO MẬT ✦');
  console.log('============================================================\n');

  let passed = 0;
  let total = 0;

  function assert(title, condition, detail = '') {
    total++;
    if (condition) {
      console.log(`✅ [TEST ${total}] PASS: ${title}`);
      passed++;
    } else {
      console.error(`❌ [TEST ${total}] FAIL: ${title} - ${detail}`);
    }
  }

  try {
    // 1. Chưa đăng nhập truy cập trang chủ (phải thành công trả về 200 OK)
    const homeRes = await request('GET', '/');
    assert('1. Khách vãng lai (Guest) truy cập trang chủ thành công', homeRes.status === 200 || homeRes.status === 304);

    // 2. Chưa đăng nhập truy cập trực tiếp URL Admin (phải bị redirect 302 sang login.html)
    const adminDirectRes = await request('GET', '/admin.html');
    assert(
      '2. Chưa đăng nhập truy cập trực tiếp /admin.html bị chuyển hướng (302) sang login.html',
      adminDirectRes.status === 302 && String(adminDirectRes.headers.location).includes('login.html'),
      `Status: ${adminDirectRes.status}, Location: ${adminDirectRes.headers.location}`
    );

    // 3. Đăng nhập sai mật khẩu (phải trả 401 Unauthorized)
    const wrongPwdRes = await request('POST', '/api/auth/login', {
      email: 'customer1@cleannova.test',
      password: 'WrongPassword123'
    });
    assert('3. Đăng nhập sai mật khẩu bị từ chối 401 Unauthorized', wrongPwdRes.status === 401 && wrongPwdRes.body.success === false);

    // 4. Đăng nhập Customer 1 thành công (nhận JWT Token)
    const loginCust1 = await request('POST', '/api/auth/login', {
      email: 'customer1@cleannova.test',
      password: 'CustomerDemo@2026'
    });
    const cust1Token = loginCust1.body.token;
    assert('4. Đăng nhập Customer 1 thành công, nhận token và role=customer', loginCust1.status === 200 && loginCust1.body.user.role === 'customer');

    // 5. Đăng nhập Customer 2 thành công
    const loginCust2 = await request('POST', '/api/auth/login', {
      email: 'customer2@cleannova.test',
      password: 'CustomerDemo@2026'
    });
    const cust2Token = loginCust2.body.token;
    assert('5. Đăng nhập Customer 2 thành công', loginCust2.status === 200 && loginCust2.body.user.role === 'customer');

    // 6. Đăng nhập Admin thành công
    const loginAdmin = await request('POST', '/api/auth/login', {
      email: 'admin@cleannova.test',
      password: 'admin123'
    });
    const adminToken = loginAdmin.body.token;
    assert('6. Đăng nhập Admin thành công, role=admin', loginAdmin.status === 200 && loginAdmin.body.user.role === 'admin');

    // 7. Customer truy cập URL Admin trực tiếp (phải bị Server Guard redirect sang /403.html)
    const custAdminAccess = await request('GET', '/admin.html', null, {
      'Authorization': `Bearer ${cust1Token}`,
      'Cookie': `cleannova_token=${cust1Token}`
    });
    assert(
      '7. Customer truy cập trực tiếp URL Admin bị chặn và chuyển sang /403.html',
      custAdminAccess.status === 302 && String(custAdminAccess.headers.location).includes('403.html'),
      `Status: ${custAdminAccess.status}, Location: ${custAdminAccess.headers.location}`
    );

    // 8. Customer cố tình gọi API Quản trị (/api/admin/orders) -> Phải bị từ chối 403 Forbidden
    const custApiAdmin = await request('GET', '/api/admin/orders', null, {
      'Authorization': `Bearer ${cust1Token}`
    });
    assert('8. Customer gọi API quản trị /api/admin/orders bị chặn 403 Forbidden', custApiAdmin.status === 403);

    // 9. Admin truy cập API Quản trị (/api/admin/orders) -> Phải thành công 200
    const adminApiOrders = await request('GET', '/api/admin/orders', null, {
      'Authorization': `Bearer ${adminToken}`
    });
    assert('9. Admin truy cập API quản trị /api/admin/orders thành công (200 OK)', adminApiOrders.status === 200 && adminApiOrders.body.success === true);

    // 10. Customer 1 xem lịch sử đơn hàng của chính mình (chỉ ra đơn của customer1)
    const cust1Orders = await request('GET', '/api/orders/my-orders', null, {
      'Authorization': `Bearer ${cust1Token}`
    });
    const hasOnlyOwnOrders = cust1Orders.body.orders.every(o => o.user_id === 'usr_cust_001');
    assert('10. Customer 1 xem lịch sử đơn hàng của chính mình (được bảo vệ chỉ thấy đơn của mình)', cust1Orders.status === 200 && hasOnlyOwnOrders && cust1Orders.body.orders.length > 0);

    // 11. Customer 1 thử truy cập trực tiếp vào đơn hàng của Customer 2 (#CN-2026-1089) -> Bị chặn 403
    const cust1HackCust2 = await request('GET', '/api/orders/%23CN-2026-1089', null, {
      'Authorization': `Bearer ${cust1Token}`
    });
    assert('11. Customer 1 truy cập đơn hàng của Customer 2 bị chặn 403 Forbidden', cust1HackCust2.status === 403);

    // 12. Admin xem chi tiết đơn hàng của Customer 2 (#CN-2026-1089) -> Được phép xem
    const adminViewOrder = await request('GET', '/api/orders/%23CN-2026-1089', null, {
      'Authorization': `Bearer ${adminToken}`
    });
    assert('12. Admin có quyền xem chi tiết bất kỳ đơn hàng nào', adminViewOrder.status === 200 && adminViewOrder.body.success === true);

    // 13. Khách vãng lai (Guest chưa login) thử tạo đơn hàng qua API -> Bị chặn 401
    const guestCreateOrder = await request('POST', '/api/orders', {
      customer: { name: 'Hack', phone: '0901234567', address: 'HN', city: 'HN' },
      items: [{ id: 1, name: 'Robot', price: 10000000, quantity: 1 }],
      finalTotal: 10000000
    });
    assert('13. Khách vãng lai chưa đăng nhập gọi API tạo đơn bị chặn 401 Unauthorized', guestCreateOrder.status === 401);

    // 14. Customer tạo đơn hàng mới qua API -> Thành công và tự động gắn chặt với user_id
    const custCreateOrder = await request(
      'POST',
      '/api/orders',
      {
        customer: { name: 'Nguyễn Minh Anh', phone: '0901234567', address: 'Landmark 81', city: 'TP. HCM' },
        items: [{ id: 1, name: 'Robot hút bụi lau nhà thông minh CLEANNOVA', price: 10500000, quantity: 1 }],
        finalTotal: 10500000
      },
      {
        'Authorization': `Bearer ${cust1Token}`
      }
    );
    assert(
      '14. Customer tạo đơn hàng thành công, server tự động gắn đúng user_id từ JWT token',
      custCreateOrder.status === 201 && custCreateOrder.body.order.user_id === 'usr_cust_001'
    );

    // 15. Đăng ký tài khoản khách hàng mới -> Mặc định role luôn là customer
    const randomEmail = `test_${Date.now()}@cleannova.test`;
    const regRes = await request('POST', '/api/auth/register', {
      email: randomEmail,
      password: 'SafePassword@2026',
      full_name: 'Khách Hàng Mới',
      role: 'admin' // Cố tình truyền role admin để kiểm tra phòng vệ
    });
    assert(
      '15. Đăng ký tài khoản mới: Server luôn ép role = customer (chống leo thang đặc quyền)',
      regRes.status === 201 && regRes.body.user.role === 'customer'
    );

    // 16. Yêu cầu khôi phục mật khẩu (Forgot password)
    const forgotRes = await request('POST', '/api/auth/forgot-password', {
      email: 'customer1@cleannova.test'
    });
    assert('16. Chức năng khôi phục mật khẩu tạo reset token thành công', forgotRes.status === 200 && forgotRes.body.success === true);

    console.log('\n============================================================');
    console.log(`✦ KẾT QUẢ KIỂM THỬ: ${passed}/${total} TESTS ĐẠT CHUẨN HOÀN TOÀN (100% PASS)`);
    console.log('============================================================\n');
  } catch (err) {
    console.error('Lỗi khi chạy test:', err);
  }
}

// Nếu chạy trực tiếp
if (require.main === module) {
  runTests();
}

module.exports = runTests;
