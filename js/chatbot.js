/* ==========================================================================
   CLEANNOVA - AI CHATBOT CONSULTATION WIDGET
   Smart Recommendation Engine • Interactive Multi-step Quiz
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initChatbot();
});

let userAnswers = {};

function initChatbot() {
  const container = document.getElementById('chatbot-container');
  if (!container) return;

  container.innerHTML = `
    <!-- Floating Action Button -->
    <div id="chatbot-fab" class="chatbot-fab-btn" aria-label="Mở Trợ lý AI Cleannova" title="Tư vấn chọn robot cùng AI">
      <div class="chatbot-fab-tooltip">
        ✦ Hỏi Trợ Lý AI
      </div>
      <div class="chatbot-fab-circle">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
          <rect x="4" y="8" width="16" height="12" rx="4"/>
          <circle cx="9" cy="13" r="1.5" fill="currentColor"/>
          <circle cx="15" cy="13" r="1.5" fill="currentColor"/>
          <path d="M10 17h4"/>
        </svg>
        <span class="chatbot-live-dot"></span>
      </div>
    </div>

    <!-- Chatbot Window -->
    <div id="chatbot-window" class="chatbot-window-box">
      <!-- Header -->
      <div class="chatbot-win-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="chatbot-avatar">✦</div>
          <div>
            <div style="font-weight: 700; font-size: 0.9375rem; color: #FFFFFF;">Trợ lý CLEANNOVA</div>
            <div style="font-size: 0.75rem; color: #C6A667; display: flex; align-items: center; gap: 6px;">
              <span class="pulse-dot"></span>
              <span>Tư vấn tự động từ dữ liệu sản phẩm</span>
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button id="chatbot-reset-btn" class="chatbot-tool-btn" title="Bắt đầu lại">↺</button>
          <button id="chatbot-close-btn" class="chatbot-tool-btn" title="Đóng">✕</button>
        </div>
      </div>

      <!-- Messages Stream -->
      <div id="chatbot-messages" class="chatbot-messages-stream">
        <!-- Rendered dynamically -->
      </div>

      <!-- Typing Indicator -->
      <div id="chatbot-typing" class="chatbot-typing-bar" style="display: none;">
        <div class="typing-bubble">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>

      <form id="chatbot-form" style="display:flex;gap:6px;padding:8px 12px;border-top:1px solid #E9E5DC;">
        <input id="chatbot-input" type="text" maxlength="200" autocomplete="off" placeholder="Nhập câu hỏi về sản phẩm..." aria-label="Câu hỏi" style="flex:1;border:1px solid #E9E5DC;border-radius:999px;padding:8px 14px;font:inherit;">
        <button type="submit" class="chatbot-opt-btn" style="border-color:#C6A667;color:#B89550;">Gửi</button>
      </form>
      <!-- Action Footer with Quick Options -->
      <div id="chatbot-options-bar" class="chatbot-options-stream">
        <!-- Options buttons -->
      </div>
    </div>
  `;

  // Inject Chatbot styles
  injectChatbotStyles();

  // Bind Events
  const fab = document.getElementById('chatbot-fab');
  const win = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const resetBtn = document.getElementById('chatbot-reset-btn');

  fab.addEventListener('click', () => {
    const isHidden = win.style.display === 'none' || !win.style.display;
    win.style.display = isHidden ? 'flex' : 'none';
    if (isHidden && Object.keys(userAnswers).length === 0) {
      startChatbotFlow();
    }
  });

  document.getElementById('chatbot-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const inp = document.getElementById('chatbot-input');
    const q = inp.value.trim();
    if (!q) return;
    inp.value = '';
    appendUserMessage(q);
    appendBotMessage(answerQuestion(q));
  });

  closeBtn.addEventListener('click', () => {
    win.style.display = 'none';
  });

  resetBtn.addEventListener('click', () => {
    userAnswers = {};
    document.getElementById('chatbot-messages').innerHTML = '';
    startChatbotFlow();
  });
}

function startChatbotFlow() {
  userAnswers = {};
  appendBotMessage(CHATBOT_FLOW.welcome.message, () => {
    setTimeout(() => {
      askQuestion('q1');
    }, 600);
  });
}

function askQuestion(stepKey) {
  const step = CHATBOT_FLOW[stepKey];
  if (!step) return;

  appendBotMessage(step.message, () => {
    const optionsBar = document.getElementById('chatbot-options-bar');
    optionsBar.innerHTML = step.options.map(opt => `
      <button class="chatbot-opt-btn" onclick="handleChatOption('${stepKey}', '${opt.value}', '${opt.label}', '${opt.next}')">
        ${opt.label}
      </button>
    `).join('');
  });
}

window.handleChatOption = function(stepKey, val, label, next) {
  document.getElementById('chatbot-options-bar').innerHTML = '';
  appendUserMessage(label);

  if (stepKey === 'q1') userAnswers.area = val;
  if (stepKey === 'q2') userAnswers.pet = val;
  if (stepKey === 'q3') userAnswers.budget = val;

  if (next === 'result') {
    showTyping(true);
    setTimeout(() => {
      showTyping(false);
      renderRecommendation();
    }, 1000);
  } else {
    showTyping(true);
    setTimeout(() => {
      showTyping(false);
      askQuestion(next);
    }, 500);
  }
};

function renderRecommendation() {
  const product = getChatbotRecommendation(userAnswers);

  const message = `Dựa trên diện tích, nhu cầu và ngân sách của bạn, tôi đề xuất mẫu robot tối ưu nhất:\n\n✦ **${product.name}**\n${product.tagline}`;
  appendBotMessage(message, () => {
    const stream = document.getElementById('chatbot-messages');
    const cardEl = document.createElement('div');
    cardEl.className = 'chatbot-recom-card';
    cardEl.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div>
        <div style="font-weight: 700; color: #252525; font-size: 0.9375rem;">${product.name}</div>
        <div style="font-weight: 800; color: #C6A667; font-size: 1.1rem; margin: 4px 0;">${product.price ? formatPrice(product.price) : 'Giá dự kiến ' + PRICE_RANGE.min.toLocaleString('vi-VN') + ' – ' + PRICE_RANGE.max.toLocaleString('vi-VN') + 'đ'}</div>
        <div style="font-size: 0.75rem; color: #64748B; margin-bottom: 8px;">${product.specsSummary}</div>
        <div style="display: flex; gap: 6px;">
          <a href="product-detail.html?id=${product.id}" class="btn btn-secondary btn-sm" style="flex: 1; padding: 6px;">
            Xem Chi Tiết
          </a>
          <button onclick="if (addToCart(${product.id}, 1)) showToast('Đã thêm vào giỏ hàng!', '🛍️');" class="btn btn-cta btn-sm" style="flex: 1; padding: 6px;">
            Mua Ngay
          </button>
        </div>
      </div>
    `;
    stream.appendChild(cardEl);
    stream.scrollTop = stream.scrollHeight;

    // Reset button
    const optionsBar = document.getElementById('chatbot-options-bar');
    optionsBar.innerHTML = `
      <button class="chatbot-opt-btn" onclick="startChatbotFlow()" style="width: 100%; text-align: center; border-color: #C6A667; color: #C6A667;">
        ↺ Bắt đầu tư vấn lại
      </button>
    `;
  });
}

function appendBotMessage(text, callback) {
  showTyping(true);
  setTimeout(() => {
    showTyping(false);
    const stream = document.getElementById('chatbot-messages');
    const msgEl = document.createElement('div');
    msgEl.className = 'chatbot-msg bot';
    msgEl.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    stream.appendChild(msgEl);
    stream.scrollTop = stream.scrollHeight;
    if (callback) callback();
  }, 400);
}

function appendUserMessage(text) {
  const stream = document.getElementById('chatbot-messages');
  const msgEl = document.createElement('div');
  msgEl.className = 'chatbot-msg user';
  msgEl.textContent = text;
  stream.appendChild(msgEl);
  stream.scrollTop = stream.scrollHeight;
}

function showTyping(show) {
  const typing = document.getElementById('chatbot-typing');
  if (typing) {
    typing.style.display = show ? 'block' : 'none';
    if (show) {
      const stream = document.getElementById('chatbot-messages');
      stream.scrollTop = stream.scrollHeight;
    }
  }
}

function injectChatbotStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .chatbot-fab-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .chatbot-fab-btn:hover {
      transform: scale(1.05);
    }
    .chatbot-fab-tooltip {
      background: #FFFFFF;
      color: #252525;
      font-weight: 700;
      font-size: 0.8125rem;
      padding: 6px 14px;
      border-radius: 999px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
      border: 1px solid rgba(226, 232, 240, 0.8);
    }
    .chatbot-fab-circle {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #C6A667 0%, #059669 100%);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
      position: relative;
    }
    .chatbot-live-dot {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #C6A667;
      border: 2px solid #FFFFFF;
    }

    .chatbot-window-box {
      display: none;
      position: fixed;
      bottom: 90px;
      right: 24px;
      width: 380px;
      max-width: calc(100vw - 40px);
      height: 540px;
      max-height: calc(100vh - 120px);
      background: #FFFFFF;
      border-radius: 20px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(226, 232, 240, 0.8);
      z-index: 1000;
      flex-direction: column;
      overflow: hidden;
      animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .chatbot-win-header {
      background: #0B0F17;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .chatbot-avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: linear-gradient(135deg, #C6A667 0%, #06B6D4 100%);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
    }
    .chatbot-tool-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: #FFFFFF;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    .chatbot-tool-btn:hover {
      background: rgba(255, 255, 255, 0.25);
    }

    .chatbot-messages-stream {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background: #F8FAFC;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .chatbot-msg {
      max-width: 85%;
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 0.875rem;
      line-height: 1.5;
    }
    .chatbot-msg.bot {
      align-self: flex-start;
      background: #FFFFFF;
      color: #252525;
      border: 1px solid rgba(226, 232, 240, 0.8);
      border-bottom-left-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
    .chatbot-msg.user {
      align-self: flex-end;
      background: #C6A667;
      color: #FFFFFF;
      border-bottom-right-radius: 4px;
    }

    .chatbot-typing-bar {
      padding: 0 20px 10px;
      background: #F8FAFC;
    }
    .typing-bubble {
      display: inline-flex;
      gap: 5px;
      background: #FFFFFF;
      padding: 8px 14px;
      border-radius: 14px;
      border: 1px solid rgba(226, 232, 240, 0.8);
    }
    .typing-dot {
      width: 6px;
      height: 6px;
      background: #94A3B8;
      border-radius: 50%;
    }

    .chatbot-options-stream {
      padding: 14px 16px;
      background: #FFFFFF;
      border-top: 1px solid rgba(226, 232, 240, 0.8);
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 160px;
      overflow-y: auto;
    }
    .chatbot-opt-btn {
      background: #F8FAFC;
      border: 1px solid rgba(226, 232, 240, 0.9);
      padding: 8px 14px;
      border-radius: 10px;
      font-size: 0.8125rem;
      font-weight: 600;
      color: #252525;
      cursor: pointer;
      text-align: left;
      transition: all 0.18s;
    }
    .chatbot-opt-btn:hover {
      background: #ECFDF5;
      border-color: #C6A667;
      color: #059669;
    }

    .chatbot-recom-card {
      background: #FFFFFF;
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 14px;
      padding: 12px;
      display: flex;
      gap: 12px;
      align-items: center;
      margin-top: 8px;
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.1);
    }
    .chatbot-recom-card img {
      width: 70px;
      height: 70px;
      border-radius: 8px;
      object-fit: cover;
    }
  `;
  document.head.appendChild(style);
}


/* ---- Tri thức & luật tư vấn (đọc từ data.js, không bịa số liệu) ---- */
const CHATBOT_FLOW = {
  welcome: { message: 'Xin chào! Mình là trợ lý CLEANNOVA. Mình có thể giúp bạn chọn robot hút bụi, tìm hiểu tính năng hoặc giải đáp thắc mắc về sản phẩm nhé!' },
  q1: { message: 'Nhà bạn thuộc loại nào?', options: [
    { label: 'Căn hộ / chung cư', value: 'apartment', next: 'q2' },
    { label: 'Nhà phố / nhà nhiều tầng', value: 'house', next: 'q2' },
    { label: 'Chưa rõ diện tích', value: 'unknown', next: 'q2' } ] },
  q2: { message: 'Nhà bạn có nuôi chó, mèo không?', options: [
    { label: 'Có thú cưng', value: 'pet', next: 'q3' },
    { label: 'Không', value: 'nopet', next: 'q3' } ] },
  q3: { message: 'Ngân sách dự kiến của bạn?', options: [
    { label: 'Dưới 8,5 triệu', value: 'low', next: 'result' },
    { label: '8,5 – 15 triệu', value: 'mid', next: 'result' },
    { label: 'Trên 15 triệu', value: 'high', next: 'result' } ] }
};

function getChatbotRecommendation() {
  // Hiện chỉ có 1 sản phẩm đang bán trong hệ thống.
  return PRODUCTS.find(p => !p.draft) || PRODUCTS[0];
}

function answerQuestion(q) {
  const t = q.toLowerCase();
  const p = getChatbotRecommendation();
  const has = (...k) => k.some(x => t.includes(x));
  if (has('phụ kiện', 'vật tư', 'túi', 'chổi', 'khăn', 'dung dịch', 'thay thế')) {
    const list = PRODUCTS.filter(x => !x.draft && x.category !== 'robot' && typeof x.price === 'number');
    if (list.length) return 'Phụ kiện và vật tư hiện có:\n' + list.map(x => '• ' + x.name + ' – ' + formatPrice(x.price) + ' (product-detail.html?id=' + x.id + ')').join('\n');
  }
  if (has('giá', 'bao nhiêu', 'tiền'))
    return `Khoảng giá dự kiến là ${PRICE_RANGE.min.toLocaleString('vi-VN')} – ${PRICE_RANGE.max.toLocaleString('vi-VN')}đ. Đây chưa phải giá niêm yết chính thức, bạn vui lòng liên hệ để được báo giá.`;
  if (has('bảo hành')) return POLICIES.warranty + ' ' + POLICIES.support;
  if (has('đổi', 'trả')) return POLICIES.returns;
  if (has('hỗ trợ', 'kỹ thuật', 'sửa')) return POLICIES.support;
  if (has('giặt', 'sấy', 'giẻ', 'trạm', 'dock'))
    return 'Có. Trạm sạc đa chức năng tự thu gom bụi, tự giặt và tự sấy giẻ lau, giúp hạn chế ẩm và mùi khó chịu.';
  if (has('thú cưng', 'chó', 'mèo', 'lông'))
    return 'Robot hỗ trợ làm sạch bụi mịn, tóc, lông thú cưng và vụn thức ăn, kèm bộ lọc HEPA giữ lại bụi mịn. Mình chưa có thông số riêng về khả năng chống quấn tóc nên không dám khẳng định thêm.';
  if (has('hepa', 'lọc')) return 'Robot có bộ lọc HEPA giúp giữ lại bụi mịn.';
  if (has('ai', 'vật cản', 'cảm biến'))
    return 'Robot có nhận diện vật cản AI 3D, hỗ trợ tránh chướng ngại vật và tự quay về trạm sạc.';
  if (has('pin', 'diện tích', 'kích thước', 'nặng', 'khối lượng', 'dung tích', 'bao lâu'))
    return 'Thông số này hiện đang cập nhật, mình chưa có dữ liệu xác thực để trả lời. Bạn vui lòng liên hệ cửa hàng để được xác nhận.';
  if (has('tính năng', 'có gì', 'tư vấn', 'chọn'))
    return 'Điểm nổi bật: ' + p.features.join('; ') + '.\n\nXem chi tiết: product-detail.html?id=' + p.id;
  return 'Mình chưa có thông tin xác thực cho câu hỏi này. Bạn thử hỏi về tính năng, giá dự kiến, bảo hành, đổi trả hoặc trạm sạc nhé, hoặc liên hệ cửa hàng để được hỗ trợ.';
}

/* Mở chatbot từ nơi khác (ví dụ nút "Hỏi trợ lý" ở trang chi tiết) và gửi câu hỏi */
window.openChatbotWith = function (question) {
  const win = document.getElementById('chatbot-window');
  const fab = document.getElementById('chatbot-fab');
  if (!win || !fab) return;
  if (win.style.display !== 'flex') fab.click();
  if (question) setTimeout(() => {
    appendUserMessage(question);
    appendBotMessage(answerQuestion(question));
  }, 1700);
};
