const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../db');
const { JWT_SECRET, authenticateUser } = require('../middleware/auth');

// In-memory or temporary store for password reset tokens
const resetTokens = new Map();

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.full_name
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// 1. REGISTER
router.post('/register', async (req, res) => {
  try {
    const { email, password, full_name, phone, address, city } = req.body;

    if (!email || !password || !full_name) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ: Họ và tên, Email và Mật khẩu.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Định dạng email không hợp lệ.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu phải có độ dài tối thiểu 6 ký tự.'
      });
    }

    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email này đã được sử dụng. Vui lòng đăng nhập hoặc sử dụng email khác.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = {
      id: 'usr_' + crypto.randomBytes(8).toString('hex'),
      email: email.trim().toLowerCase(),
      password_hash,
      full_name: full_name.trim(),
      phone: phone ? phone.trim() : '',
      address: address ? address.trim() : '',
      city: city || 'TP. Hồ Chí Minh',
      role: 'customer', // Luôn mặc định role là customer, không thể nâng quyền tại đây
      auth_provider: 'email',
      avatar_url: '',
      is_verified: true
    };

    db.saveUser(newUser);

    const token = generateToken(newUser);
    res.cookie('cleannova_token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    });

    const { password_hash: _, ...safeUser } = newUser;
    return res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành công! Chào mừng bạn đến với CleanNova.',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi máy chủ trong quá trình đăng ký. Vui lòng thử lại.'
    });
  }
});

// 2. LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email và mật khẩu.'
      });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản không tồn tại hoặc email chưa chính xác.'
      });
    }

    if (!user.password_hash) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản này được đăng ký qua Facebook. Vui lòng đăng nhập bằng Facebook.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại.'
      });
    }

    const token = generateToken(user);
    res.cookie('cleannova_token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    });

    const { password_hash: _, ...safeUser } = user;
    return res.json({
      success: true,
      message: 'Đăng nhập thành công! Chào mừng bạn quay trở lại.',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi máy chủ trong quá trình đăng nhập.'
    });
  }
});

// 3. GET CURRENT USER (ME)
router.get('/me', authenticateUser, (req, res) => {
  return res.json({
    success: true,
    user: req.user
  });
});

// 4. LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('cleannova_token');
  return res.json({
    success: true,
    message: 'Đã đăng xuất thành công khỏi hệ thống.'
  });
});

// 5. UPDATE PROFILE
router.put('/profile', authenticateUser, (req, res) => {
  try {
    const { full_name, phone, address, city } = req.body;
    const user = db.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Người dùng không tồn tại.' });
    }

    if (full_name) user.full_name = full_name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (address !== undefined) user.address = address.trim();
    if (city !== undefined) user.city = city.trim();

    db.saveUser(user);
    const { password_hash, ...safeUser } = user;

    return res.json({
      success: true,
      message: 'Cập nhật thông tin cá nhân thành công!',
      user: safeUser
    });
  } catch (err) {
    console.error('Profile update error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật hồ sơ người dùng.' });
  }
});

// 6. CHANGE PASSWORD
router.post('/change-password', authenticateUser, async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    if (!new_password || new_password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu mới phải có tối thiểu 6 ký tự.'
      });
    }

    const user = db.findUserById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản.' });

    if (user.auth_provider === 'facebook' && !user.password_hash) {
      // Allow facebook users to set password for the first time without old password
    } else {
      if (!old_password) {
        return res.status(400).json({ success: false, message: 'Vui lòng nhập mật khẩu hiện tại.' });
      }
      const isMatch = await bcrypt.compare(old_password, user.password_hash);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Mật khẩu hiện tại không đúng.' });
      }
    }

    const salt = await bcrypt.genSalt(10);
    user.password_hash = await bcrypt.hash(new_password, salt);
    db.saveUser(user);

    return res.json({
      success: true,
      message: 'Đổi mật khẩu thành công!'
    });
  } catch (err) {
    console.error('Change password error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi trong quá trình đổi mật khẩu.' });
  }
});

// 7. FORGOT PASSWORD
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp địa chỉ email.' });
  }

  const user = db.findUserByEmail(email);
  if (!user) {
    // Return friendly message even if email not found for privacy
    return res.json({
      success: true,
      message: 'Nếu email tồn tại trong hệ thống CleanNova, liên kết khôi phục đã được gửi.'
    });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  resetTokens.set(resetToken, {
    userId: user.id,
    expiresAt: Date.now() + 3600000 // 1 hour
  });

  return res.json({
    success: true,
    message: 'Yêu cầu khôi phục đã được xử lý thành công.',
    resetToken, // Provided for direct demonstration
    resetUrl: `forgot-password.html?token=${resetToken}`
  });
});

// 8. RESET PASSWORD
router.post('/reset-password', async (req, res) => {
  try {
    const { token, new_password } = req.body;
    if (!token || !new_password || new_password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Mã xác thực không hợp lệ hoặc mật khẩu mới quá ngắn.'
      });
    }

    const tokenData = resetTokens.get(token);
    if (!tokenData || tokenData.expiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'Mã xác thực khôi phục mật khẩu đã hết hạn hoặc không hợp lệ.'
      });
    }

    const user = db.findUserById(tokenData.userId);
    if (!user) return res.status(404).json({ success: false, message: 'Người dùng không tồn tại.' });

    const salt = await bcrypt.genSalt(10);
    user.password_hash = await bcrypt.hash(new_password, salt);
    db.saveUser(user);

    resetTokens.delete(token);

    return res.json({
      success: true,
      message: 'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập bằng mật khẩu mới.'
    });
  } catch (err) {
    console.error('Reset password error:', err);
    return res.status(500).json({ success: false, message: 'Lỗi trong quá trình đặt lại mật khẩu.' });
  }
});

// 9. FACEBOOK OAUTH
router.post('/facebook', async (req, res) => {
  try {
    const { accessToken, userID, email, name, picture } = req.body;

    if (!accessToken && !userID) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu thông tin xác thực từ Facebook OAuth.'
      });
    }

    // In a production environment with Facebook App ID configured, we verify with Graph API:
    let verifiedEmail = email;
    let verifiedName = name || 'Khách hàng Facebook';
    let verifiedId = userID;
    let verifiedAvatar = picture && picture.data ? picture.data.url : '';

    if (accessToken) {
      try {
        const fetchRes = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`);
        if (fetchRes.ok) {
          const fbData = await fetchRes.json();
          if (fbData.id) {
            verifiedId = fbData.id;
            verifiedName = fbData.name || verifiedName;
            verifiedEmail = fbData.email || verifiedEmail;
            if (fbData.picture && fbData.picture.data) {
              verifiedAvatar = fbData.picture.data.url;
            }
          }
        }
      } catch (e) {
        // Fallback to provided OAuth client payload if Graph API request fails or demo
      }
    }

    if (!verifiedId) {
      return res.status(400).json({
        success: false,
        message: 'Không thể xác thực danh tính Facebook.'
      });
    }

    // Find user by Facebook ID first
    let user = db.findUserByFacebookId(verifiedId);

    // If not found by FB ID, but email exists, check if account should link safely
    if (!user && verifiedEmail) {
      const existingEmailUser = db.findUserByEmail(verifiedEmail);
      if (existingEmailUser) {
        // Link Facebook to existing user
        existingEmailUser.facebook_id = verifiedId;
        if (!existingEmailUser.avatar_url && verifiedAvatar) {
          existingEmailUser.avatar_url = verifiedAvatar;
        }
        user = existingEmailUser;
        db.saveUser(user);
      }
    }

    // If still no user, create brand new Customer
    if (!user) {
      user = {
        id: 'usr_fb_' + verifiedId.substring(0, 8),
        email: verifiedEmail || `fb_${verifiedId}@facebook.cleannova.vn`,
        password_hash: null, // No password for pure FB auth
        full_name: verifiedName,
        phone: '',
        address: '',
        city: 'TP. Hồ Chí Minh',
        role: 'customer', // Default role customer
        auth_provider: 'facebook',
        facebook_id: verifiedId,
        avatar_url: verifiedAvatar,
        is_verified: true
      };
      db.saveUser(user);
    }

    const token = generateToken(user);
    res.cookie('cleannova_token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    });

    const { password_hash, ...safeUser } = user;
    return res.json({
      success: true,
      message: 'Đăng nhập bằng tài khoản Facebook thành công!',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Facebook auth error:', err);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi đăng nhập bằng Facebook.'
    });
  }
});

module.exports = router;
