/* ==========================================================================
   CLEANNOVA - SHOPPING CART LOGIC
   Renders items, handles vouchers, calculates subtotal & totals
   ========================================================================== */

let appliedVoucher = null;

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  initVoucher();
});

function renderCart() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById('cart-items');
  const cartContent = document.getElementById('cart-content');
  const emptyCart = document.getElementById('empty-cart');

  if (!cart || cart.length === 0) {
    if (cartContent) cartContent.style.display = 'none';
    if (emptyCart) emptyCart.style.display = 'flex';
    return;
  }

  if (cartContent) cartContent.style.display = 'grid';
  if (emptyCart) emptyCart.style.display = 'none';

  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = cart.map(item => {
      const product = getProductById(item.id);
      if (!product) return '';
      const rowTotal = product.price * item.quantity;

      return `
        <div class="cart-item-row" data-id="${product.id}">
          <div class="cart-item-img">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="cart-item-details">
            <h3 class="cart-item-name">
              <a href="product-detail.html?id=${product.id}">${product.name}</a>
            </h3>
            <div style="font-size: 0.8125rem; color: #64748B;">Bảo hành 18 tháng chính hãng</div>
            <div class="cart-item-unit-price">${formatPrice(product.price)}</div>
          </div>
          <div class="cart-item-qty">
            <div class="qty-counter">
              <button class="qty-btn" onclick="modifyQty(${product.id}, -1)">−</button>
              <input type="number" class="qty-input" value="${item.quantity}" readonly>
              <button class="qty-btn" onclick="modifyQty(${product.id}, 1)">+</button>
            </div>
          </div>
          <div class="cart-item-total">
            ${formatPrice(rowTotal)}
          </div>
          <button class="cart-item-remove-btn" onclick="deleteItem(${product.id})" title="Xóa khỏi giỏ hàng">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      `;
    }).join('');
  }

  updateSummary();
}

function modifyQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === Number(productId));
  if (item) {
    const newQty = item.quantity + delta;
    updateCartQuantity(productId, newQty);
    renderCart();
  }
}

function deleteItem(productId) {
  removeFromCart(productId);
  showToast('Đã xóa sản phẩm khỏi giỏ hàng', '🗑️');
  renderCart();
}

function updateSummary() {
  const subtotal = getCartTotal();
  const subtotalEl = document.getElementById('subtotal-val');
  const discountRow = document.getElementById('discount-row');
  const discountValEl = document.getElementById('discount-val');
  const totalEl = document.getElementById('total-val');

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);

  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.type === 'fixed') {
      discountAmount = appliedVoucher.discount;
    } else if (appliedVoucher.type === 'percent') {
      discountAmount = Math.round(subtotal * appliedVoucher.discount);
    }

    if (discountRow) discountRow.style.display = 'flex';
    if (discountValEl) discountValEl.textContent = `-${formatPrice(discountAmount)}`;
  } else {
    if (discountRow) discountRow.style.display = 'none';
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);
  if (totalEl) totalEl.textContent = formatPrice(finalTotal);

  // Store in session for checkout
  sessionStorage.setItem('cleannova-order-summary', JSON.stringify({
    subtotal,
    discountAmount,
    finalTotal,
    voucherCode: appliedVoucher ? appliedVoucher.code : null
  }));
}

function initVoucher() {
  const applyBtn = document.getElementById('apply-voucher-btn');
  const input = document.getElementById('voucher-code-input');
  const msg = document.getElementById('voucher-msg');

  if (!applyBtn || !input) return;

  applyBtn.addEventListener('click', () => {
    const code = input.value.trim().toUpperCase();
    if (!code) {
      if (msg) {
        msg.textContent = 'Vui lòng nhập mã giảm giá';
        msg.style.color = '#EF4444';
      }
      return;
    }

    const voucher = VOUCHERS[code];
    if (voucher) {
      appliedVoucher = voucher;
      if (msg) {
        msg.textContent = `✓ Đã áp dụng: ${voucher.label}`;
        msg.style.color = '#10B981';
      }
      showToast(`Áp dụng mã ${code} thành công!`, '🎉');
      updateSummary();
    } else {
      appliedVoucher = null;
      if (msg) {
        msg.textContent = 'Mã giảm giá không hợp lệ hoặc đã hết hạn';
        msg.style.color = '#EF4444';
      }
      updateSummary();
    }
  });
}
