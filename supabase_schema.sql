-- ==============================================================================
-- CLEANNOVA E-COMMERCE - SUPABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- Phân quyền RBAC (Role-Based Access Control) thực thi hoàn toàn phía máy chủ
-- ==============================================================================

-- 1. TẠO BẢNG HỒ SƠ NGƯỜI DÙNG (PROFILES)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  city TEXT DEFAULT 'TP. Hồ Chí Minh',
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- KÍCH HOẠT ROW LEVEL SECURITY CHO BẢNG PROFILES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. TẠO BẢNG ĐƠN HÀNG (ORDERS)
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY, -- Mã đơn dạng #CN-2026-XXXX
  user_id UUID REFERENCES auth.users(id) ON DELETE RESTRICT NOT NULL,
  customer JSONB NOT NULL,
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL DEFAULT 0,
  discount_amount NUMERIC NOT NULL DEFAULT 0,
  final_total NUMERIC NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL DEFAULT 'cod',
  status TEXT NOT NULL DEFAULT 'Đang xử lý' CHECK (status IN ('Đang xử lý', 'Đang giao', 'Đã hoàn thành', 'Đã hủy')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- KÍCH HOẠT ROW LEVEL SECURITY CHO BẢNG ORDERS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 3. HÀM KIỂM TRA QUYỀN ADMIN (CHẠY BẢO MẬT PHÍA SERVER)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES CHO PROFILES
-- ==============================================================================

-- Chính sách 1: Khách hàng chỉ xem được hồ sơ của chính mình
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Chính sách 2: Admin được quyền xem tất cả hồ sơ người dùng
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

-- Chính sách 3: Khách hàng chỉ được cập nhật thông tin cá nhân của mình (không đổi được role)
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

-- Chính sách 4: Chỉ Admin mới có quyền cập nhật role
CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  USING (public.is_admin());

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES CHO ORDERS
-- ==============================================================================

-- Chính sách 1: Khách hàng chỉ xem được đơn hàng do chính mình đặt
CREATE POLICY "Customers can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

-- Chính sách 2: Admin được xem toàn bộ đơn hàng trong hệ thống
CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT
  USING (public.is_admin());

-- Chính sách 3: Khách hàng đã đăng nhập chỉ được tạo đơn hàng gắn với chính ID của mình
CREATE POLICY "Customers can insert own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Chính sách 4: Chỉ Admin mới có quyền cập nhật trạng thái đơn hàng (tiến độ giao hàng)
CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE
  USING (public.is_admin());

-- ==============================================================================
-- 6. TRIGGER TỰ ĐỘNG TẠO PROFILE KHI ĐĂNG KÝ QUA SUPABASE AUTH
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Khách hàng CleanNova'),
    'customer' -- Luôn mặc định là customer, không thể tự nâng quyền
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 7. SEED TÀI KHOẢN QUẢN TRỊ VIÊN ĐẦU TIÊN (SUPABASE SQL SCRIPT)
-- Chạy câu lệnh này sau khi tài khoản admin@cleannova.test được tạo trong Authentication
-- ==============================================================================
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE email = 'admin@cleannova.test';
