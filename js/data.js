/* CLEANNOVA - DATA LAYER (chuẩn hóa theo brief)
   Quy tắc: chỉ ghi thông tin đã xác nhận; chưa có thì "Đang cập nhật".
   Bản dữ liệu cũ (chứa thông số chưa xác thực) lưu tại docs/data.legacy.js.txt. */
const TBD = 'Đang cập nhật';
const BRAND = { name:'CLEANNOVA', slogan:'Cleannova – Nhà sạch, người nhàn.',
  message:'Đem lại sự tự do cho đôi tay – Trả lại thời gian cho yêu thương.' };
const POLICIES = {
  warranty:'Bảo hành tiêu chuẩn 18 tháng.',
  returns:'Đổi sản phẩm trong vòng 30 ngày theo điều kiện áp dụng.',
  support:'Hỗ trợ kỹ thuật tại nhà, phản hồi dự kiến trong 24 giờ.'
};
/* priceStatus:'proposed' = giá do đội phát triển đề xuất theo khoảng 8,5–15 triệu trong brief, chủ shop cần duyệt. */
const PRICE_RANGE = { min:8500000, max:15000000, note:'Khoảng giá dự kiến, chưa phải giá niêm yết.' };

const CATEGORIES = [
  { id:'robot', name:'Robot hút bụi lau nhà', subtitle:'Hút bụi và lau nhà thông minh, tự giặt sấy giẻ', badge:'SẢN PHẨM CHÍNH', image:'assets/images/cat-robot.jpg', count:'1 sản phẩm', icon:'🤖' },
  { id:'other', name:'Máy hút bụi & thiết bị khác', subtitle:TBD, badge:TBD, image:'assets/images/cat-robot.jpg', count:TBD, icon:'🧹', hidden:true },
  { id:'accessories', name:'Phụ kiện & vật tư thay thế', subtitle:'Túi bụi, bộ lọc HEPA, chổi quét, giẻ lau', badge:'VẬT TƯ', image:'assets/images/products/bo-loc-bui.webp', count:'4 sản phẩm', icon:'⚙️', hidden:false },
  { id:'solution', name:'Dung dịch vệ sinh', subtitle:'Dung dịch lau sàn cho robot', badge:'DUNG DỊCH', image:'assets/images/products/dung-dich-lau-san.webp', count:'1 sản phẩm', icon:'💧', hidden:false }
];

const PRODUCTS = [{
  id:1, slug:'robot-hut-bui-lau-nha-cleannova', name:'Robot hút bụi lau nhà thông minh CLEANNOVA',
  series:'CLEANNOVA', tagline:'Hút bụi & lau nhà | 8.000 Pa | AI 3D | Trạm sạc tự giặt, tự sấy',
  price:10500000, priceStatus:'proposed', priceRange:PRICE_RANGE, oldPrice:0, discount:0, badge:'SẢN PHẨM CHÍNH', badgeType:'badge-gold',
  image:'assets/images/products/gallery/robot-07-robot-tram-sac.webp', cardImage:'assets/images/products/gallery/robot-card-dock.webp', imageNote:'Ảnh minh họa concept, không phải ảnh sản phẩm thực.',
  gallery:[{src:'assets/images/products/gallery/robot-02-goc-nghieng.webp',thumb:'assets/images/products/gallery/robot-02-goc-nghieng-thumb.webp',label:'Góc nghiêng'},{src:'assets/images/products/gallery/robot-03-mat-tren.webp',thumb:'assets/images/products/gallery/robot-03-mat-tren-thumb.webp',label:'Mặt trên'},{src:'assets/images/products/gallery/robot-04-cam-bien.webp',thumb:'assets/images/products/gallery/robot-04-cam-bien-thumb.webp',label:'Cận cảnh cảm biến'},{src:'assets/images/products/gallery/robot-05-mat-ben.webp',thumb:'assets/images/products/gallery/robot-05-mat-ben-thumb.webp',label:'Mặt bên'},{src:'assets/images/products/gallery/robot-07-robot-tram-sac.webp',thumb:'assets/images/products/gallery/robot-07-robot-tram-sac-thumb.webp',label:'Robot kèm trạm sạc'},{src:'assets/images/products/gallery/robot-08-tram-sac-goc-nghieng.webp',thumb:'assets/images/products/gallery/robot-08-tram-sac-goc-nghieng-thumb.webp',label:'Trạm sạc góc nghiêng'},{src:'assets/images/products/gallery/robot-09-tram-sac-mat-truoc.webp',thumb:'assets/images/products/gallery/robot-09-tram-sac-mat-truoc-thumb.webp',label:'Trạm sạc mặt trước'},{src:'assets/images/products/gallery/robot-10-tram-sac-khoang-sac.webp',thumb:'assets/images/products/gallery/robot-10-tram-sac-khoang-sac-thumb.webp',label:'Chi tiết khoang sạc'},{src:'assets/images/products/gallery/robot-11-hop-kem-tram-sac.webp',thumb:'assets/images/products/gallery/robot-11-hop-kem-tram-sac-thumb.webp',label:'Bao bì hộp kèm trạm sạc'}], rating:0, reviews:0,
  suction:8000, suctionDisplay:'8.000 Pa', battery:0, area:0, noise:TBD, stock:null,
  category:'robot', categoryName:'Robot hút bụi lau nhà', specsSummary:'8.000 Pa | AI 3D | HEPA',
  features:['Hút bụi và lau nhà, công suất hút khoảng 8.000 Pa','Làm sạch bụi mịn, tóc, lông thú cưng, vụn thức ăn','Bộ lọc HEPA giữ lại bụi mịn','Nhận diện vật cản AI 3D, hỗ trợ tránh chướng ngại vật','Tự động quay về trạm sạc','Trạm sạc tự thu gom bụi, giặt và sấy giẻ lau, hạn chế ẩm và mùi'],
  highlights:['8.000 Pa','AI 3D','HEPA','Trạm tự giặt & sấy'],
  description:'Robot hút bụi lau nhà thông minh giúp bạn giảm thời gian dọn dẹp: hút bụi, lau sàn, tự tránh vật cản và tự về sạc. Trạm sạc đa chức năng tự thu gom bụi, giặt và sấy giẻ lau.',
  specs:{'Công suất hút':'Khoảng 8.000 Pa','Nhận diện vật cản':'AI 3D','Bộ lọc':'HEPA','Trạm sạc':'Thu gom bụi, giặt và sấy giẻ lau tự động','Dung lượng pin':TBD,'Thời gian hoạt động':TBD,'Diện tích làm sạch':TBD,'Kích thước':TBD,'Khối lượng':TBD,'Dung tích hộp bụi / bình nước':TBD,'Bảo hành':'18 tháng','Đổi trả':'30 ngày theo điều kiện áp dụng','Hỗ trợ kỹ thuật':'Tại nhà, phản hồi dự kiến trong 24 giờ'}
},
  {
  id:2, slug:'tui-dung-bui-cleannova', name:'Túi đựng bụi CLEANNOVA', series:'Phụ kiện CLEANNOVA', tagline:'Vật tư thay thế cho robot CLEANNOVA',
  price:149000, priceStatus:'proposed', oldPrice:0, discount:0, badge:'VẬT TƯ', badgeType:'badge-gold',
  image:'assets/images/products/gallery/tui-01-tong-quan.webp', gallery:[{src:'assets/images/products/gallery/tui-01-tong-quan.webp',thumb:'assets/images/products/gallery/tui-01-tong-quan-thumb.webp',label:'Tổng quan'},{src:'assets/images/products/gallery/tui-02-mat-truoc.webp',thumb:'assets/images/products/gallery/tui-02-mat-truoc-thumb.webp',label:'Mặt trước'},{src:'assets/images/products/gallery/tui-03-mat-sau.webp',thumb:'assets/images/products/gallery/tui-03-mat-sau-thumb.webp',label:'Mặt bên / mặt sau'},{src:'assets/images/products/gallery/tui-04-chi-tiet.webp',thumb:'assets/images/products/gallery/tui-04-chi-tiet-thumb.webp',label:'Chi tiết đầu kết nối'}], imageNote:'Ảnh minh họa concept, chưa phải ảnh chụp sản phẩm thực.', rating:0, reviews:0, suction:0, suctionDisplay:TBD, battery:0, area:0, noise:TBD, stock:null,
  category:'accessories', categoryName:'Phụ kiện & vật tư thay thế', specsSummary:'Dùng cho robot CLEANNOVA',
  features:["Vật tư thay thế dành cho robot CLEANNOVA", "Dùng với trạm sạc thu gom bụi"], highlights:["Vật tư chính hãng", "Dễ thay thế"],
  description:'Túi đựng bụi thay thế dành cho robot hút bụi lau nhà CLEANNOVA.',
  specs:{'Tương thích':'Robot hút bụi lau nhà CLEANNOVA','Quy cách đóng gói':TBD,'Chất liệu / thành phần':TBD,'Tuổi thọ khuyến nghị':TBD}
  },
  {
  id:3, slug:'bo-loc-hepa-cleannova', name:'Bộ lọc HEPA CLEANNOVA', series:'Phụ kiện CLEANNOVA', tagline:'Giữ lại bụi mịn cho robot CLEANNOVA',
  price:249000, priceStatus:'proposed', oldPrice:0, discount:0, badge:'VẬT TƯ', badgeType:'badge-gold',
  image:'assets/images/products/gallery/loc-01-tong-quan.webp', gallery:[{src:'assets/images/products/gallery/loc-01-tong-quan.webp',thumb:'assets/images/products/gallery/loc-01-tong-quan-thumb.webp',label:'Tổng quan'},{src:'assets/images/products/gallery/loc-02-mat-truoc.webp',thumb:'assets/images/products/gallery/loc-02-mat-truoc-thumb.webp',label:'Mặt trước'},{src:'assets/images/products/gallery/loc-03-mat-ben.webp',thumb:'assets/images/products/gallery/loc-03-mat-ben-thumb.webp',label:'Mặt bên'},{src:'assets/images/products/gallery/loc-04-chi-tiet.webp',thumb:'assets/images/products/gallery/loc-04-chi-tiet-thumb.webp',label:'Chi tiết màng lọc HEPA'},{src:'assets/images/products/gallery/loc-05-hop.webp',thumb:'assets/images/products/gallery/loc-05-hop-thumb.webp',label:'Bao bì hộp'}], imageNote:'Ảnh minh họa concept, chưa phải ảnh chụp sản phẩm thực.', rating:0, reviews:0, suction:0, suctionDisplay:TBD, battery:0, area:0, noise:TBD, stock:null,
  category:'accessories', categoryName:'Phụ kiện & vật tư thay thế', specsSummary:'Dùng cho robot CLEANNOVA',
  features:["Bộ lọc HEPA giữ lại bụi mịn", "Phụ kiện thay thế dành cho robot CLEANNOVA"], highlights:["HEPA", "Thay thế định kỳ"],
  description:'Bộ lọc HEPA thay thế dành cho robot CLEANNOVA, giúp giữ lại bụi mịn.',
  specs:{'Tương thích':'Robot hút bụi lau nhà CLEANNOVA','Quy cách đóng gói':TBD,'Chất liệu / thành phần':TBD,'Tuổi thọ khuyến nghị':TBD}
  },
  {
  id:4, slug:'choi-quet-canh-cleannova', name:'Chổi quét cạnh CLEANNOVA', series:'Phụ kiện CLEANNOVA', tagline:'Chổi thay thế cho robot CLEANNOVA',
  price:189000, priceStatus:'proposed', oldPrice:0, discount:0, badge:'VẬT TƯ', badgeType:'badge-gold',
  image:'assets/images/products/gallery/choi-01-tong-quan.webp', gallery:[{src:'assets/images/products/gallery/choi-01-tong-quan.webp',thumb:'assets/images/products/gallery/choi-01-tong-quan-thumb.webp',label:'Tổng quan'},{src:'assets/images/products/gallery/choi-02-nhin-tren.webp',thumb:'assets/images/products/gallery/choi-02-nhin-tren-thumb.webp',label:'Nhìn từ trên'},{src:'assets/images/products/gallery/choi-03-nhin-ngang.webp',thumb:'assets/images/products/gallery/choi-03-nhin-ngang-thumb.webp',label:'Nhìn ngang'},{src:'assets/images/products/gallery/choi-04-chi-tiet.webp',thumb:'assets/images/products/gallery/choi-04-chi-tiet-thumb.webp',label:'Chi tiết sản phẩm'},{src:'assets/images/products/gallery/choi-05-hop.webp',thumb:'assets/images/products/gallery/choi-05-hop-thumb.webp',label:'Bao bì hộp'}], imageNote:'Ảnh minh họa concept, chưa phải ảnh chụp sản phẩm thực.', rating:0, reviews:0, suction:0, suctionDisplay:TBD, battery:0, area:0, noise:TBD, stock:null,
  category:'accessories', categoryName:'Phụ kiện & vật tư thay thế', specsSummary:'Dùng cho robot CLEANNOVA',
  features:["Hỗ trợ gom bụi, tóc và lông thú cưng", "Phụ kiện thay thế dành cho robot CLEANNOVA"], highlights:["Phụ kiện thay thế"],
  description:'Chổi quét thay thế dành cho robot CLEANNOVA, hỗ trợ gom bụi, tóc và lông thú cưng.',
  specs:{'Tương thích':'Robot hút bụi lau nhà CLEANNOVA','Quy cách đóng gói':TBD,'Chất liệu / thành phần':TBD,'Tuổi thọ khuyến nghị':TBD}
  },
  {
  id:5, slug:'khan-lau-thay-cleannova', name:'Khăn lau thay thế CLEANNOVA', series:'Phụ kiện CLEANNOVA', tagline:'Khăn lau dành cho robot CLEANNOVA',
  price:179000, priceStatus:'proposed', oldPrice:0, discount:0, badge:'VẬT TƯ', badgeType:'badge-gold',
  image:'assets/images/products/gallery/khan-01-tong-quan.webp', gallery:[{src:'assets/images/products/gallery/khan-01-tong-quan.webp',thumb:'assets/images/products/gallery/khan-01-tong-quan-thumb.webp',label:'Tổng quan'},{src:'assets/images/products/gallery/khan-02-mat-tren.webp',thumb:'assets/images/products/gallery/khan-02-mat-tren-thumb.webp',label:'Mặt trên'},{src:'assets/images/products/gallery/khan-03-mat-ngang.webp',thumb:'assets/images/products/gallery/khan-03-mat-ngang-thumb.webp',label:'Mặt ngang - độ dày'},{src:'assets/images/products/gallery/khan-04-chi-tiet.webp',thumb:'assets/images/products/gallery/khan-04-chi-tiet-thumb.webp',label:'Chi tiết sợi microfiber'},{src:'assets/images/products/gallery/khan-05-hop.webp',thumb:'assets/images/products/gallery/khan-05-hop-thumb.webp',label:'Bao bì hộp'}], imageNote:'Ảnh minh họa concept, chưa phải ảnh chụp sản phẩm thực.', rating:0, reviews:0, suction:0, suctionDisplay:TBD, battery:0, area:0, noise:TBD, stock:null,
  category:'accessories', categoryName:'Phụ kiện & vật tư thay thế', specsSummary:'Dùng cho robot CLEANNOVA',
  features:["Dùng với trạm sạc tự giặt và sấy giẻ lau", "Phụ kiện thay thế dành cho robot CLEANNOVA"], highlights:["Khăn lau thay thế"],
  description:'Khăn lau thay thế dành cho robot CLEANNOVA, dùng với trạm sạc tự giặt và sấy giẻ.',
  specs:{'Tương thích':'Robot hút bụi lau nhà CLEANNOVA','Quy cách đóng gói':TBD,'Chất liệu / thành phần':TBD,'Tuổi thọ khuyến nghị':TBD}
  },
  {
  id:6, slug:'dung-dich-lau-san-cleannova', name:'Dung dịch lau sàn dành cho robot', series:'Phụ kiện CLEANNOVA', tagline:'Dung dịch vệ sinh chuyên dụng cho robot',
  price:129000, priceStatus:'proposed', oldPrice:0, discount:0, badge:'DUNG DỊCH', badgeType:'badge-gold',
  image:'assets/images/products/gallery/dd-01-tong-quan.webp', gallery:[{src:'assets/images/products/gallery/dd-01-tong-quan.webp',thumb:'assets/images/products/gallery/dd-01-tong-quan-thumb.webp',label:'Tổng quan'},{src:'assets/images/products/gallery/dd-02-mat-truoc.webp',thumb:'assets/images/products/gallery/dd-02-mat-truoc-thumb.webp',label:'Mặt trước'},{src:'assets/images/products/gallery/dd-03-goc-nghieng.webp',thumb:'assets/images/products/gallery/dd-03-goc-nghieng-thumb.webp',label:'Góc nghiêng'},{src:'assets/images/products/gallery/dd-04-mat-sau.webp',thumb:'assets/images/products/gallery/dd-04-mat-sau-thumb.webp',label:'Mặt sau'},{src:'assets/images/products/gallery/dd-05-chi-tiet.webp',thumb:'assets/images/products/gallery/dd-05-chi-tiet-thumb.webp',label:'Chi tiết nắp vặn'},{src:'assets/images/products/gallery/dd-06-hop.webp',thumb:'assets/images/products/gallery/dd-06-hop-thumb.webp',label:'Bao bì hộp'}], imageNote:'Ảnh minh họa concept, chưa phải ảnh chụp sản phẩm thực.', rating:0, reviews:0, suction:0, suctionDisplay:TBD, battery:0, area:0, noise:TBD, stock:null,
  category:'solution', categoryName:'Dung dịch vệ sinh', specsSummary:'Dùng cho robot CLEANNOVA',
  features:["Dung dịch lau sàn dành cho robot"], highlights:["Dung dịch chuyên dụng"],
  description:'Dung dịch lau sàn dành cho robot lau nhà CLEANNOVA.',
  specs:{'Tương thích':'Robot hút bụi lau nhà CLEANNOVA','Quy cách đóng gói':TBD,'Chất liệu / thành phần':TBD,'Tuổi thọ khuyến nghị':TBD}
  }
];

/* Mã giảm giá: chưa có chương trình khuyến mãi nào được công bố. Thêm mã tại đây khi có, ví dụ:
   VOUCHERS['MA'] = { code:'MA', type:'fixed'|'percent', discount:..., label:'...' } */
const VOUCHERS = {};

// 3. HELPER FUNCTIONS
/* Giá hiển thị kiểu hóa đơn: "10.500.000 ₫" — ký hiệu ₫ nhỏ, chữ thường (không đậm) */
function formatPrice(val) {
  if (typeof val !== 'number') return 'Liên hệ';
  return val.toLocaleString('vi-VN') + ' ₫';
}
function formatPriceHTML(val) {
  if (typeof val !== 'number') return 'Liên hệ';
  return val.toLocaleString('vi-VN') + '<span class="cur">₫</span>';
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

// 4. CART STORAGE HELPERS
function getCart() {
  try {
    const raw = localStorage.getItem('cleannova_cart');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('cleannova_cart', JSON.stringify(cart));
  if (typeof updateCartBadge === 'function') {
    updateCartBadge();
  }
}

function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const prod = getProductById(productId);
  if (!prod) return false;
  if (typeof prod.price !== 'number') { if (typeof showToast==='function') showToast('Sản phẩm chưa có giá niêm yết, vui lòng liên hệ để được báo giá.','ℹ️'); return false; }
  const inCart = (cart.find(i=>i.id===prod.id)||{}).quantity||0;
  if (typeof prod.stock==='number' && inCart+quantity>prod.stock) { if (typeof showToast==='function') showToast('Số lượng vượt tồn kho hiện có.','⚠️'); return false; }

  const existing = cart.find(item => item.id === prod.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image,
      series: prod.series,
      specsSummary: prod.specsSummary || '',
      quantity: quantity
    });
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== Number(productId));
  saveCart(cart);
}

function updateCartQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(i => i.id === Number(productId));
  if (item) {
    const prod = getProductById(productId);
    let q = Math.max(1, quantity);
    if (prod && typeof prod.stock === 'number' && q > prod.stock) {
      q = Math.max(1, prod.stock);
      if (typeof showToast === 'function') showToast('Số lượng vượt tồn kho hiện có.', '⚠️');
    }
    item.quantity = q;
    saveCart(cart);
  }
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// 5. TECH SHOWCASE (chỉ nội dung đã xác nhận trong brief)
const TECH_DETAILS = {
  ai:{title:'Nhận diện vật cản AI 3D',desc:'Hỗ trợ tránh chướng ngại vật và tự động quay về trạm sạc, giảm nhu cầu can thiệp thủ công.',metricVal:'AI 3D',metricLbl:'Nhận diện vật cản',img:'assets/images/cat-robot.jpg'},
  suction:{title:'Lực hút khoảng 8.000 Pa',desc:'Làm sạch bụi mịn, tóc, lông thú cưng và vụn thức ăn. Bộ lọc HEPA giữ lại bụi mịn.',metricVal:'8.000 Pa',metricLbl:'Công suất hút',img:'assets/images/cat-robot.jpg'},
  dock:{title:'Trạm sạc đa chức năng',desc:'Tự động thu gom bụi, giặt và sấy giẻ lau, giúp hạn chế tình trạng ẩm và mùi khó chịu.',metricVal:'3 bước',metricLbl:'Thu bụi • Giặt giẻ • Sấy giẻ',img:'assets/images/cat-robot.jpg'}
};
