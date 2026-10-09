const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJsonFile(filePath, defaultValue = []) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
      return defaultValue;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultValue;
  }
}

function writeJsonFile(filePath, data) {
  try {
    const tempPath = `${filePath}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, filePath);
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

const db = {
  // Users
  getUsers() {
    return readJsonFile(USERS_FILE, []);
  },
  findUserByEmail(email) {
    if (!email) return null;
    const users = this.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },
  findUserById(id) {
    if (!id) return null;
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  },
  findUserByFacebookId(facebookId) {
    if (!facebookId) return null;
    const users = this.getUsers();
    return users.find(u => u.facebook_id === facebookId) || null;
  },
  saveUser(userData) {
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.id === userData.id);
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...userData, updated_at: new Date().toISOString() };
    } else {
      users.push({
        ...userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
    writeJsonFile(USERS_FILE, users);
    return userData;
  },
  deleteUser(id) {
    const users = this.getUsers().filter(u => u.id !== id);
    writeJsonFile(USERS_FILE, users);
  },

  // Orders
  getOrders() {
    return readJsonFile(ORDERS_FILE, []);
  },
  findOrderById(id) {
    if (!id) return null;
    const orders = this.getOrders();
    return orders.find(o => (o.orderId && o.orderId === id) || (o.id && o.id === id)) || null;
  },
  getOrdersByUserId(userId) {
    if (!userId) return [];
    const orders = this.getOrders();
    return orders.filter(o => o.user_id === userId);
  },
  saveOrder(orderData) {
    const orders = this.getOrders();
    const targetId = orderData.orderId || orderData.id;
    const existingIndex = orders.findIndex(o => (o.orderId && o.orderId === targetId) || (o.id && o.id === targetId));
    if (existingIndex >= 0) {
      orders[existingIndex] = { ...orders[existingIndex], ...orderData, updated_at: new Date().toISOString() };
    } else {
      orders.unshift({
        ...orderData,
        created_at: orderData.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
    writeJsonFile(ORDERS_FILE, orders);
    return orderData;
  },
  updateOrderStatus(orderId, status) {
    if (!orderId) return null;
    const orders = this.getOrders();
    const order = orders.find(o => (o.orderId && o.orderId === orderId) || (o.id && o.id === orderId));
    if (!order) return null;
    order.status = status;
    order.updated_at = new Date().toISOString();
    writeJsonFile(ORDERS_FILE, orders);
    return order;
  },

  // Products
  getProducts() {
    return readJsonFile(PRODUCTS_FILE, []);
  },
  saveProducts(products) {
    writeJsonFile(PRODUCTS_FILE, products);
  }
};

module.exports = db;
