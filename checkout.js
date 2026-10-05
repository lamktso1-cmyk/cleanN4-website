/* ==========================================================================
   CLEANNOVA - CHECKOUT ENGINE
   Payment methods selection • VietQR preview • Order submission & storage
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutSummary();
  initPaymentMethods();
  initCheckoutForm();
});

let selectedPayment = 'vietqr';

function renderCheckoutSummary() {
  const cart = getCart();
  const summaryBox = document.getElementById('checkout-items-list');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const discountRow = document.getElementById('checkout-discount-row');
  const discountValEl = document.getElementById('checkout-discount-val');
  const totalEl = document.getElementById('checkout-final-total');

  if (!cart || cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  // Render miniature items
  if (summaryBox) {
    summaryBox.innerHTML = cart.map(item => {
      const p = getProductById(item.id);
      if (!p) return '';
      return `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${p.image}" alt="${p.name}" style="width: 48px; height: 48px; border-radius: 8px; object-fit: cover; border: 1px solid var(--border-light);">
            <div>
              <div style="font-weight: 600; font-size: 0.9375rem; color: var(--text-primary);">${p.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Số lượng: ${item.qty}</div>
            </div>
          </div>
          <div style="font-weight: 700; font-size: 0.9375rem; color: var(--text-primary);">
            ${formatPrice(p.price * item.qty)}
          </div>
        </div>
      `;
    }).join('');
  }

  const subtotal = getCartTotal();
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);

  // Check saved session discount
  let discountAmount = 0;
  try {
    const saved = JSON.parse(sessionStorage.getItem('cleannova-order-summary') || '{}');
    if (saved && saved.discountAmount) {
      discountAmount = saved.discountAmount;
    }
  } catch {}

  if (discountAmount > 0) {
    if (discountRow) discountRow.style.display = 'flex';
    if (discountValEl) discountValEl.textContent = `-${formatPrice(discountAmount)}`;
  } else {
    if (discountRow) discountRow.style.display = 'none';
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);
  if (totalEl) totalEl.textContent = formatPrice(finalTotal);
}

function initPaymentMethods() {
  const options = document.querySelectorAll('.payment-option-card');
  const qrBox = document.getElementById('qr-payment-box');

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');

      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      selectedPayment = opt.dataset.method;
      if (qrBox) {
        qrBox.style.display = (selectedPayment === 'vietqr' || selectedPayment === 'vnpay' || selectedPayment === 'momo') ? 'block' : 'none';
      }
    });
  });
}

function initCheckoutForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const email = document.getElementById('cust-email').value.trim();
    const address = document.getElementById('cust-address').value.trim();
    const city = document.getElementById('cust-city').value;
    const note = document.getElementById('cust-note').value.trim();

    if (!name || !phone || !address || !city) {
      showToast('Vui lòng điền đầy đủ các thông tin bắt buộc!', '⚠️');
      return;
    }

    const orderId = '#CN-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const cart = getCart();
    const subtotal = getCartTotal();
    let discountAmount = 0;
    try {
      const saved = JSON.parse(sessionStorage.getItem('cleannova-order-summary') || '{}');
      discountAmount = saved.discountAmount || 0;
    } catch {}

    const finalTotal = Math.max(0, subtotal - discountAmount);

    const orderData = {
      orderId,
      customer: { name, phone, email, address, city, note },
      items: cart,
      subtotal,
      discountAmount,
      finalTotal,
      paymentMethod: selectedPayment,
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'Đang xử lý'
    };

    // Save order
    localStorage.setItem('cleannova-latest-order', JSON.stringify(orderData));

    // Clear cart
    saveCart([]);
    updateCartBadge();
    sessionStorage.removeItem('cleannova-order-summary');

    showToast('Đặt hàng thành công! Đang chuyển tiếp...', '🎉');

    setTimeout(() => {
      window.location.href = `success.html?orderId=${encodeURIComponent(orderId)}`;
    }, 900);
  });
}
