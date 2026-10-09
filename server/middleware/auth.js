const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'cleannova_super_secure_jwt_secret_2026_n4_gold';

function extractToken(req) {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    return req.headers.authorization.substring(7);
  }
  if (req.cookies && req.cookies.cleannova_token) {
    return req.cookies.cleannova_token;
  }
  return null;
}

function authenticateUser(req, res, next) {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Yêu cầu đăng nhập. Phiên làm việc không tồn tại hoặc đã hết hạn.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = db.findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản người dùng không tồn tại hoặc đã bị vô hiệu hóa.'
      });
    }

    // Attach safe user object without password hash
    const { password_hash, ...safeUser } = user;
    req.user = safeUser;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.',
      error: err.name
    });
  }
}

function optionalUser(req, res, next) {
  const token = extractToken(req);
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = db.findUserById(decoded.id);
      if (user) {
        const { password_hash, ...safeUser } = user;
        req.user = safeUser;
      }
    } catch (err) {
      // Ignore invalid token for optional auth
    }
  }
  next();
}

function requireRole(allowedRoles) {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Vui lòng đăng nhập để tiếp tục.'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Truy cập bị từ chối: Bạn không có quyền truy cập tài nguyên quản trị này (403 Forbidden).'
      });
    }

    next();
  };
}

module.exports = {
  JWT_SECRET,
  authenticateUser,
  optionalUser,
  requireRole
};
