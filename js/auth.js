/* ==========================================================================
   CLEANNOVA - AUTH & RBAC CLIENT ENGINE
   Secure session management • Server verification • Protected navigation
   ========================================================================== */

const Auth = (function () {
  let currentUser = null;
  let isChecking = false;

  // Lấy token từ localStorage (dùng làm Authorization Bearer header khi cần)
  function getToken() {
    return localStorage.getItem('cleannova_jwt') || null;
  }

  function setToken(token) {
    if (token) {
      localStorage.setItem('cleannova_jwt', token);
    } else {
      localStorage.removeItem('cleannova_jwt');
    }
  }

  // Header chuẩn khi gọi API
  function getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  // Xác minh phiên đăng nhập trực tiếp từ Server Backend
  async function checkAuth(forceRefresh = false) {
    if (currentUser && !forceRefresh) return currentUser;
    if (isChecking) return currentUser;

    isChecking = true;
    try {
      const res = await fetch('/api/auth/me', {
        method: 'GET',
        headers: getHeaders(),
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          currentUser = data.user;
          sessionStorage.setItem('cleannova_user', JSON.stringify(currentUser));
          isChecking = false;
          return currentUser;
        }
      }
    } catch (err) {
      console.warn('Auth check error:', err);
    }

    // Nếu server báo không có phiên hoặc lỗi token
    currentUser = null;
    sessionStorage.removeItem('cleannova_user');
    isChecking = false;
    return null;
  }

  // Đăng nhập bằng Email & Mật khẩu
  async function login(email, password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setToken(data.token);
        currentUser = data.user;
        sessionStorage.setItem('cleannova_user', JSON.stringify(currentUser));
        return { success: true, user: data.user, message: data.message };
      } else {
        return { success: false, message: data.message || 'Đăng nhập không thành công.' };
      }
    } catch (err) {
      return { success: false, message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.' };
    }
  }

  // Đăng ký tài khoản khách hàng mới
  async function register(userData) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setToken(data.token);
        currentUser = data.user;
        sessionStorage.setItem('cleannova_user', JSON.stringify(currentUser));
        return { success: true, user: data.user, message: data.message };
      } else {
        return { success: false, message: data.message || 'Đăng ký không thành công.' };
      }
    } catch (err) {
      return { success: false, message: 'Lỗi kết nối máy chủ khi đăng ký.' };
    }
  }

  // Đăng nhập bằng Facebook OAuth
  async function loginWithFacebook(fbAuthResponse) {
    try {
      const res = await fetch('/api/auth/facebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(fbAuthResponse)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setToken(data.token);
        currentUser = data.user;
        sessionStorage.setItem('cleannova_user', JSON.stringify(currentUser));
        return { success: true, user: data.user, message: data.message };
      } else {
        return { success: false, message: data.message || 'Đăng nhập Facebook không thành công.' };
      }
    } catch (err) {
      return { success: false, message: 'Lỗi xác thực Facebook với máy chủ.' };
    }
  }

  // Đăng xuất an toàn
  async function logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include'
      });
    } catch (e) {}

    currentUser = null;
    setToken(null);
    sessionStorage.removeItem('cleannova_user');
    window.location.href = 'index.html';
  }

  // Cập nhật thông tin cá nhân
  async function updateProfile(profileData) {
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify(profileData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        currentUser = data.user;
        sessionStorage.setItem('cleannova_user', JSON.stringify(currentUser));
        return { success: true, user: data.user, message: data.message };
      }
      return { success: false, message: data.message };
    } catch (e) {
      return { success: false, message: 'Lỗi cập nhật hồ sơ.' };
    }
  }

  // Đổi mật khẩu
  async function changePassword(old_password, new_password) {
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify({ old_password, new_password })
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Lỗi đổi mật khẩu.' };
    }
  }

  // Yêu cầu bắt buộc đăng nhập đối với trang Checkout
  async function requireAuthForCheckout() {
    const user = await checkAuth();
    if (!user) {
      window.location.href = `login.html?redirect=checkout.html&msg=${encodeURIComponent('Vui lòng đăng nhập để tiến hành đặt hàng và thanh toán.')}`;
      return false;
    }
    return true;
  }

  // Bảo vệ khu vực Admin: Chỉ cho phép role 'admin'
  async function requireAdminGuard() {
    const user = await checkAuth();
    if (!user) {
      const redirectUrl = encodeURIComponent(window.location.pathname.split('/').pop() || 'admin.html');
      window.location.href = `login.html?redirect=${redirectUrl}&msg=${encodeURIComponent('Khu vực quản trị yêu cầu quyền Quản trị viên.')}`;
      return false;
    }

    if (user.role !== 'admin') {
      window.location.href = '403.html';
      return false;
    }
    return true;
  }

  return {
    getToken,
    getHeaders,
    checkAuth,
    login,
    register,
    loginWithFacebook,
    logout,
    updateProfile,
    changePassword,
    requireAuthForCheckout,
    requireAdminGuard,
    getUser: () => currentUser
  };
})();

// Khởi tạo và kiểm tra trạng thái ngay khi tài liệu sẵn sàng
document.addEventListener('DOMContentLoaded', async () => {
  await Auth.checkAuth();
  if (typeof updateHeaderAuthUI === 'function') {
    updateHeaderAuthUI();
  }
});
