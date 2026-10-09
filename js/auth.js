/* ==========================================================================
   CLEANNOVA - AUTH & RBAC CLIENT ENGINE (ENHANCED RESILIENCE)
   Smart API Base Discovery • JWT Management • Server Auth Verification
   ========================================================================== */

const Auth = (function () {
  let currentUser = null;
  let isChecking = false;

  // Tự động nhận diện địa chỉ máy chủ API Backend (hỗ trợ cả port 3000, Live Server 5500, 8080 và file protocol)
  function getApiBaseUrl() {
    // 1. Nếu mở trang từ file:// protocol
    if (window.location.protocol === 'file:') {
      return 'http://localhost:3000';
    }
    // 2. Nếu mở trang từ localhost/127.0.0.1 nhưng ở port khác 3000 (như Live Server 5500, Vite 5173, etc.)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      if (window.location.port !== '3000' && window.location.port !== '') {
        return 'http://localhost:3000';
      }
      return ''; // Chạy trực tiếp từ backend CleanNova port 3000
    }
    // 3. Môi trường production hosting cùng origin
    return '';
  }

  // Lấy JWT token từ localStorage
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
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  // Wrapper gọi fetch an toàn có timeout và auto-prefix baseUrl
  async function apiFetch(endpoint, options = {}) {
    const base = getApiBaseUrl();
    const url = endpoint.startsWith('http') ? endpoint : `${base}${endpoint}`;

    const headers = {
      ...getHeaders(),
      ...(options.headers || {})
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000); // 9s timeout

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }

  // Xác minh phiên đăng nhập trực tiếp từ Server Backend
  async function checkAuth(forceRefresh = false) {
    if (currentUser && !forceRefresh) return currentUser;
    if (isChecking) return currentUser;

    isChecking = true;
    try {
      const res = await apiFetch('/api/auth/me', { method: 'GET' });

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
      // Backend chưa sẵn sàng hoặc token hết hạn
    }

    currentUser = null;
    sessionStorage.removeItem('cleannova_user');
    isChecking = false;
    return null;
  }

  // Đăng nhập bằng Email & Mật khẩu
  async function login(email, password) {
    try {
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setToken(data.token);
        currentUser = data.user;
        sessionStorage.setItem('cleannova_user', JSON.stringify(currentUser));
        return { success: true, user: data.user, message: data.message };
      } else {
        return { success: false, message: data.message || 'Email hoặc mật khẩu không chính xác.' };
      }
    } catch (err) {
      console.error('CleanNova Login Error:', err);
      const isCross = window.location.port !== '3000' && window.location.protocol !== 'file:';
      const hint = isCross
        ? ' (Mẹo: Vui lòng đảm bảo backend CleanNova đang chạy tại http://localhost:3000)'
        : '';
      return {
        success: false,
        message: `Không thể kết nối đến máy chủ backend CleanNova${hint}. Vui lòng kiểm tra lệnh 'npm start'.`
      };
    }
  }

  // Đăng ký tài khoản khách hàng mới
  async function register(userData) {
    try {
      const res = await apiFetch('/api/auth/register', {
        method: 'POST',
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
      return {
        success: false,
        message: 'Không thể kết nối đến máy chủ backend để tạo tài khoản. Vui lòng kiểm tra lệnh npm start.'
      };
    }
  }

  // Đăng nhập bằng Facebook OAuth
  async function loginWithFacebook(fbAuthResponse) {
    try {
      const res = await apiFetch('/api/auth/facebook', {
        method: 'POST',
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
      return { success: false, message: 'Lỗi kết nối máy chủ khi đăng nhập Facebook.' };
    }
  }

  // Đăng xuất an toàn
  async function logout() {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}

    currentUser = null;
    setToken(null);
    sessionStorage.removeItem('cleannova_user');
    window.location.href = 'index.html';
  }

  // Cập nhật thông tin cá nhân
  async function updateProfile(profileData) {
    try {
      const res = await apiFetch('/api/auth/profile', {
        method: 'PUT',
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
      return { success: false, message: 'Lỗi cập nhật hồ sơ cá nhân.' };
    }
  }

  // Đổi mật khẩu
  async function changePassword(old_password, new_password) {
    try {
      const res = await apiFetch('/api/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ old_password, new_password })
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Lỗi kết nối máy chủ khi đổi mật khẩu.' };
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
    getApiBaseUrl,
    apiFetch,
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
