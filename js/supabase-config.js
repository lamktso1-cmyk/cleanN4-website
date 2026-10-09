/* ==============================================================================
   CLEANNOVA - SUPABASE & FACEBOOK OAUTH CONFIGURATION GUIDE
   ==============================================================================
   HƯỚNG DẪN KẾT NỐI SUPABASE HOẶC FACEBOOK LOGIN CHO MÔI TRƯỜNG THỰC TẾ
   
   1. CẤU HÌNH SUPABASE:
      - Tạo project mới tại: https://supabase.com
      - Truy cập SQL Editor và chạy toàn bộ mã từ file `supabase_schema.sql`.
      - Vào Authentication -> Providers -> Bật Email và Facebook.
      - Lấy `Project URL` và `Anon Public Key` từ Settings -> API.
      - Cập nhật thông tin vào biến CONFIG bên dưới:
*/

const CLEANNOVA_EXTERNAL_CONFIG = {
  // SUPABASE CONFIG
  supabase: {
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key-here',
    isConfigured: false // Đổi thành true khi đã điền thông tin thật
  },

  // FACEBOOK OAUTH CONFIG
  facebook: {
    appId: '', // Nhập App ID từ https://developers.facebook.com
    version: 'v19.0',
    isConfigured: false
  }
};

// Khởi tạo Facebook SDK khi có App ID
window.fbAsyncInit = function() {
  if (CLEANNOVA_EXTERNAL_CONFIG.facebook.appId) {
    FB.init({
      appId      : CLEANNOVA_EXTERNAL_CONFIG.facebook.appId,
      cookie     : true,
      xfbml      : true,
      version    : CLEANNOVA_EXTERNAL_CONFIG.facebook.version
    });
    CLEANNOVA_EXTERNAL_CONFIG.facebook.isConfigured = true;
    console.log('[CleanNova] Facebook SDK initialized successfully.');
  }
};
