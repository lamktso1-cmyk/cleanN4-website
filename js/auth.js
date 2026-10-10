/* ==========================================================================
   CLEANNOVA — ĐĂNG NHẬP DEMO (đơn giản, dùng cho bản trình diễn / đồ án)
   Chỉ 2 tài khoản mẫu, lưu phiên trong localStorage. Không có đăng ký,
   quên mật khẩu hay xác thực email.
   ========================================================================== */
const DEMO_ACCOUNTS = [
  { username: 'admin', password: '123456', role: 'admin', name: 'Quản trị viên', home: 'admin.html' },
  { username: 'user',  password: '123456', role: 'user',  name: 'Khách hàng',    home: 'index.html' }
];
const SESSION_KEY = 'cleannova_session';

function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch (e) { return null; }
}
function login(username, password) {
  const u = String(username || '').trim().toLowerCase();
  const acc = DEMO_ACCOUNTS.find(a => a.username === u && a.password === String(password || ''));
  if (!acc) return null;
  const session = { username: acc.username, role: acc.role, name: acc.name, home: acc.home };
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (e) {}
  return session;
}
function logout(redirect) {
  try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
  window.location.href = redirect || 'index.html';
}

/* Khu vực quản trị: chỉ admin được vào, còn lại chuyển về trang đăng nhập */
(function guardAdmin() {
  const file = (window.location.pathname.split('/').pop() || '').toLowerCase();
  if (!file.startsWith('admin')) return;
  const s = getSession();
  if (!s || s.role !== 'admin') {
    window.location.replace('login.html?next=' + encodeURIComponent(file || 'admin.html') + (s ? '&denied=1' : ''));
  }
})();
