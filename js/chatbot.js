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
        <img class="cb-fab-logo" src="assets/logo/cleannova-mark.svg" alt="" width="40" height="40">
        <span class="chatbot-live-dot"></span>
      </div>
    </div>

    <!-- Chatbot Window -->
    <div id="chatbot-window" class="chatbot-window-box">
      <!-- Header -->
      <div class="chatbot-win-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="chatbot-avatar"><img src="assets/logo/cleannova-mark.svg" alt="" width="30" height="30"></div>
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
        <div style="font-weight: 800; color: #A68032; font-size: 1.1rem; margin: 4px 0;">${product.price ? formatPriceHTML(product.price) : 'Giá dự kiến ' + formatPrice(PRICE_RANGE.min) + ' – ' + formatPrice(PRICE_RANGE.max)}</div>
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
      <button class="chatbot-opt-btn" onclick="startChatbotFlow()" style="width: 100%; text-align: center; border-color: #C5A059; color: #A68032;">
        ↺ Bắt đầu tư vấn lại
      </button>
      ${['Giá bao nhiêu?','Bảo hành thế nào?','Trạm sạc làm gì?','Có phụ kiện nào?'].map(q => `<button class="chatbot-opt-btn" onclick="askChip('${q}')">${q}</button>`).join('')}
    `;
  });
}

window.askChip = function (q) {
  appendUserMessage(q);
  appendBotMessage(answerQuestion(q));
};

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
    .chatbot-fab-btn { position: fixed; bottom: 24px; right: 24px; z-index: 999; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: transform .3s cubic-bezier(.16,1,.3,1); }
    .chatbot-fab-btn:hover { transform: translateY(-3px); }
    .chatbot-fab-tooltip {
      background: #fff; color: #18181B; font-weight: 600; font-size: .8125rem; padding: 8px 16px; border-radius: 999px;
      box-shadow: 0 6px 20px rgba(0,0,0,.08); border: 1px solid rgba(197,160,89,.32);
      animation: cbHint 6s ease-in-out infinite;
    }
    @keyframes cbHint { 0%, 70%, 100% { opacity: 1; transform: none; } 82% { transform: translateX(-4px); } }
    .chatbot-fab-circle {
      width: 58px; height: 58px; border-radius: 50%; position: relative; color: #fff;
      background: linear-gradient(135deg, #E0C283 0%, #C5A059 55%, #A68032 100%);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 10px 26px rgba(197,160,89,.42);
    }
    .chatbot-fab-circle::before { content: ''; position: absolute; inset: -6px; border-radius: 50%; border: 1px solid rgba(197,160,89,.45); animation: cbRing 3.2s ease-out infinite; }
    @keyframes cbRing { 0% { transform: scale(.9); opacity: .8; } 100% { transform: scale(1.35); opacity: 0; } }
    .chatbot-live-dot { position: absolute; top: 2px; right: 2px; width: 13px; height: 13px; border-radius: 50%; background: #347A57; border: 2px solid #fff; }

    .chatbot-window-box {
      display: none; position: fixed; bottom: 96px; right: 24px; width: 384px; max-width: calc(100vw - 32px);
      height: 560px; max-height: calc(100vh - 120px); background: #fff; border-radius: 24px;
      box-shadow: 0 28px 70px rgba(0,0,0,.16), 0 6px 20px rgba(197,160,89,.14);
      border: 1px solid rgba(197,160,89,.32); z-index: 1000; flex-direction: column; overflow: hidden;
      transform-origin: bottom right; animation: cbOpen .45s cubic-bezier(.16,1,.3,1);
      font-family: var(--font-ui, 'Be Vietnam Pro', sans-serif);
    }
    @keyframes cbOpen { from { opacity: 0; transform: translateY(18px) scale(.94); } to { opacity: 1; transform: none; } }
    .chatbot-win-header {
      background: linear-gradient(135deg, #FFFFFF 0%, #FAF8F4 100%); border-bottom: 1px solid rgba(197,160,89,.28);
      padding: 16px 18px; display: flex; justify-content: space-between; align-items: center; position: relative;
    }
    .chatbot-win-header::after { content: ''; position: absolute; left: 0; bottom: -1px; height: 2px; width: 100%; background: linear-gradient(90deg, transparent, #C5A059, transparent); }
    .chatbot-win-header [style*="color: #FFFFFF"] { color: #18181B !important; font-family: var(--font-heading, serif); font-size: 1rem !important; }
    .chatbot-win-header [style*="color: #C6A667"] { color: #A68032 !important; }
    .chatbot-avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #E0C283, #C5A059); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; box-shadow: 0 4px 12px rgba(197,160,89,.35); }
    .chatbot-tool-btn { background: #F5F5F7; border: none; color: #71717A; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .25s; }
    .chatbot-tool-btn:hover { background: rgba(197,160,89,.16); color: #A68032; transform: rotate(90deg); }

    .chatbot-messages-stream { flex: 1; padding: 18px; overflow-y: auto; background: #FBFAF7; display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth; }
    .chatbot-msg { max-width: 86%; padding: 11px 15px; border-radius: 18px; font-size: .875rem; line-height: 1.55; animation: cbMsg .4s cubic-bezier(.16,1,.3,1) both; }
    @keyframes cbMsg { from { opacity: 0; transform: translateY(10px) scale(.97); } to { opacity: 1; transform: none; } }
    .chatbot-msg.bot { align-self: flex-start; background: #fff; color: #27272A; border: 1px solid rgba(0,0,0,.06); border-bottom-left-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,.04); }
    .chatbot-msg.user { align-self: flex-end; background: linear-gradient(135deg, #D4B26C, #C5A059); color: #fff; border-bottom-right-radius: 5px; box-shadow: 0 4px 12px rgba(197,160,89,.28); }

    .chatbot-typing-bar { padding: 0 18px 10px; background: #FBFAF7; }
    .typing-bubble { display: inline-flex; gap: 5px; background: #fff; padding: 10px 14px; border-radius: 16px; border: 1px solid rgba(0,0,0,.06); }
    .typing-dot { width: 6px; height: 6px; background: #C5A059; border-radius: 50%; animation: cbDot 1.1s ease-in-out infinite; }
    .typing-dot:nth-child(2) { animation-delay: .15s; } .typing-dot:nth-child(3) { animation-delay: .3s; }
    @keyframes cbDot { 0%, 60%, 100% { transform: translateY(0); opacity: .45; } 30% { transform: translateY(-5px); opacity: 1; } }

    #chatbot-form { background: #fff; }
    #chatbot-input { transition: border-color .25s, box-shadow .25s; font-size: .875rem; }
    #chatbot-input:focus { outline: none; border-color: #C5A059 !important; box-shadow: 0 0 0 3px rgba(197,160,89,.16); }
    .chatbot-options-stream { padding: 12px 14px; background: #fff; border-top: 1px solid rgba(0,0,0,.05); display: flex; flex-wrap: wrap; gap: 8px; max-height: 150px; overflow-y: auto; }
    .chatbot-options-stream:empty { display: none; }
    .chatbot-opt-btn {
      background: #fff; border: 1.5px solid rgba(197,160,89,.4); padding: 8px 14px; border-radius: 999px; font-size: .8125rem; font-weight: 600;
      color: #A68032; cursor: pointer; text-align: left; font-family: inherit; animation: cbMsg .4s cubic-bezier(.16,1,.3,1) both;
      transition: all .25s cubic-bezier(.22,.61,.36,1);
    }
    .chatbot-opt-btn:hover { background: linear-gradient(135deg, #D4B26C, #C5A059); border-color: #C5A059; color: #fff; transform: translateY(-2px); box-shadow: 0 6px 14px rgba(197,160,89,.3); }
    .chatbot-recom-card { background: #fff; border: 1px solid rgba(197,160,89,.32); border-radius: 16px; padding: 12px; display: flex; gap: 12px; align-items: center; margin-top: 4px; box-shadow: 0 6px 18px rgba(197,160,89,.12); animation: cbMsg .5s cubic-bezier(.16,1,.3,1) both; }
    .chatbot-recom-card img { width: 70px; height: 70px; border-radius: 10px; object-fit: cover; }
    @media (max-width: 480px) { .chatbot-fab-tooltip { display: none; } .chatbot-window-box { right: 16px; bottom: 90px; } }
    @media (prefers-reduced-motion: reduce) { .chatbot-fab-circle::before, .chatbot-fab-tooltip { animation: none; } }
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
    return `Khoảng giá dự kiến là ${formatPrice(PRICE_RANGE.min)} – ${formatPrice(PRICE_RANGE.max)}. Đây chưa phải giá niêm yết chính thức, bạn vui lòng liên hệ để được báo giá.`;
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
