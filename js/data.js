/* ==========================================================================
   N4 CLEANOVA - DATA LAYER
   Brand: N4 CLEANOVA (Smart Clean • Better Life)
   Theme: White & Gold Luxury Aesthetic
   Products • Categories • Reviews • Storage Helpers
   ========================================================================== */

// 1. PRODUCT CATEGORIES (6 Core Pillars)
const CATEGORIES = [
  {
    id: 'robot',
    name: 'Robot hút bụi',
    subtitle: 'Tự động làm sạch hoàn hảo với LiDAR 360°',
    badge: 'ĐỈNH CAO CÔNG NGHỆ',
    image: 'assets/images/cat-robot.jpg',
    count: '3 mẫu robot',
    icon: '🤖'
  },
  {
    id: 'cordless',
    name: 'Máy hút bụi',
    subtitle: 'Không dây siêu nhẹ 1.2kg, pin 60 phút',
    badge: 'THẾ HỆ MỚI 2026',
    image: 'assets/images/cat-cordless.jpg',
    count: '2 dòng máy',
    icon: '🧹'
  },
  {
    id: 'cleaning',
    name: 'Thiết bị vệ sinh',
    subtitle: 'Máy hút lau sàn khô ướt diệt khuẩn 99.9%',
    badge: 'CÔNG NGHỆ HYDRO',
    image: 'assets/images/cat-cleaning.jpg',
    count: '1 sản phẩm',
    icon: '💧'
  },
  {
    id: 'waste',
    name: 'Thiết bị dọn rác',
    subtitle: 'Trạm sạc gom rác khép kín 60 ngày',
    badge: 'TỰ ĐỘNG ALL-IN-ONE',
    image: 'assets/images/cat-waste.jpg',
    count: '2 thiết bị',
    icon: '🗑️'
  },
  {
    id: 'accessories',
    name: 'Phụ kiện',
    subtitle: 'Màng lọc HEPA H13, chổi lăn & giẻ lau vi sợi',
    badge: 'ZIN CHÍNH HÃNG',
    image: 'assets/images/cat-accessories.jpg',
    count: '12 phụ kiện',
    icon: '⚙️'
  },
  {
    id: 'parts',
    name: 'Linh kiện',
    subtitle: 'Pin lithium dung lượng cao, cảm biến LiDAR',
    badge: 'TIÊU CHUẨN N4',
    image: 'assets/images/cat-parts.jpg',
    count: '8 linh kiện',
    icon: '🔋'
  }
];

// 2. PRODUCT CATALOGUE
const PRODUCTS = [
  {
    id: 1,
    slug: 'robot-hut-bui-n4-pro',
    name: 'Robot hút bụi N4 Pro',
    series: 'N4 Flagship Series',
    tagline: 'Lực hút 5000Pa | Điều hướng LiDAR 360° | Tự động làm sạch hoàn hảo',
    price: 8990000,
    oldPrice: 10990000,
    discount: 18,
    badge: 'BÁN CHẠY NHẤT',
    badgeType: 'badge-gold',
    image: 'assets/images/cat-robot.jpg',
    gallery: [
      'assets/images/cat-robot.jpg',
      'assets/images/cat-waste.jpg',
      'assets/images/lidar-tech.jpg',
      'assets/images/cat-parts.jpg'
    ],
    rating: 4.9,
    reviews: 428,
    suction: 5000,
    suctionDisplay: '5.000 Pa',
    battery: 180,
    area: 300,
    noise: '54 dB',
    stock: 45,
    category: 'robot',
    categoryName: 'Robot hút bụi',
    specsSummary: 'Lực hút 5000Pa | LiDAR 360°',
    features: [
      'Cảm biến LiDAR 3D quét bản đồ siêu tốc 360°',
      'Lực hút động cơ bão 5.000 Pa hút sạch bụi mịn khe sàn',
      'Tự động giặt sấy giẻ nóng khử khuẩn 99.9%',
      'Túi chứa bụi khép kín 60 ngày không chạm tay',
      'Kết nối App điện thoại Tiếng Việt + Hỗ trợ giọng nói'
    ],
    highlights: ['5.000 Pa', 'LiDAR 3D', 'Dock Tự Giặt', 'Pin 180 Phút'],
    description: 'Robot hút bụi N4 Pro là biểu tượng đột phá công nghệ vệ sinh nhà thông minh. Trang bị hệ thống định vị LiDAR laser thế hệ mới kết hợp thuật toán AI nhận diện chướng ngại vật milimet, mang lại không gian sống sạch tinh khiết chuẩn khách sạn 5 sao.',
    specs: {
      'Lực hút tối đa': '5.000 Pa (Turbo Clean)',
      'Hệ thống điều hướng': 'Laser LiDAR LDS 360° + AI 3D Structured Light',
      'Thời lượng pin': '5.200 mAh (Lên đến 180 phút liên tục)',
      'Dung tích trạm sạc': 'Túi rác 3.2L + Bình nước sạch 4L',
      'Diện tích làm sạch': 'Tối đa 300 m² sàn',
      'Màng lọc': 'HEPA H13 kháng khuẩn 99.97%',
      'Kết nối thông minh': 'Wi-Fi 2.4/5GHz, N4 Smart App, Google Home, Alexa',
      'Bảo hành': '12 Tháng chính hãng • 1 Đổi 1 trong 30 ngày'
    }
  },
  {
    id: 2,
    slug: 'may-hut-bui-cam-tay-n4-air',
    name: 'Máy hút bụi cầm tay N4 Air',
    series: 'N4 Air Wireless Series',
    tagline: 'Không dây | Pin 60 phút | Trọng lượng lông vũ 1.2kg siêu linh hoạt',
    price: 4990000,
    oldPrice: 5990000,
    discount: 17,
    badge: 'MỚI 2026',
    badgeType: 'badge-gold',
    image: 'assets/images/cat-cordless.jpg',
    gallery: [
      'assets/images/cat-cordless.jpg',
      'assets/images/cat-accessories.jpg',
      'assets/images/luxury-room.jpg'
    ],
    rating: 4.8,
    reviews: 196,
    suction: 22000,
    suctionDisplay: '22.000 Pa',
    battery: 60,
    area: 180,
    noise: '58 dB',
    stock: 28,
    category: 'cordless',
    categoryName: 'Máy hút bụi cầm tay',
    specsSummary: 'Không dây | Pin 60 phút',
    features: [
      'Động cơ Digital Không chổi than tốc độ 120.000 vòng/phút',
      'Pin Lithium rời dung lượng cao hoạt động 60 phút liên tục',
      'Đèn LED trợ sáng soi rõ hạt bụi li ti trên sàn gỗ',
      'Thiết kế cân bằng công thái học chỉ nặng 1.2kg',
      'Đa dạng 5 đầu hút chuyên dụng cho sofa, ô tô, rèm cửa'
    ],
    highlights: ['Không Dây', 'Pin 60 Phút', '1.2 kg Siêu Nhẹ', '22.000 Pa'],
    description: 'N4 Air mang lại trải nghiệm hút bụi tự do hoàn toàn không dây. Nhỏ gọn, linh hoạt, công suất hút vượt trội dễ dàng làm sạch từ trần nhà, khe sofa, bàn làm việc đến nội thất xe hơi.',
    specs: {
      'Lực hút tối đa': '22.000 Pa (150 AW)',
      'Thời lượng pin': '60 phút (Chế độ Eco) / 15 phút (Max Turbo)',
      'Trọng lượng thân máy': '1.2 kg',
      'Hộp chứa bụi': '0.6L (Đổ rác 1 nút bấm)',
      'Bộ lọc': 'Hệ thống lọc 5 cấp độ HEPA lọc sạch 99.9%',
      'Bảo hành': '12 Tháng chính hãng'
    }
  },
  {
    id: 3,
    slug: 'bo-loc-hepa-n4',
    name: 'Bộ lọc HEPA N4',
    series: 'Phụ kiện chính hãng',
    tagline: 'Lọc bụi mịn PM2.5 & PM0.3 | Khử mùi than hoạt tính',
    price: 490000,
    oldPrice: 590000,
    discount: 17,
    badge: 'LINH KIỆN ZIN',
    badgeType: 'badge-gold',
    image: 'assets/images/cat-accessories.jpg',
    gallery: [
      'assets/images/cat-accessories.jpg',
      'assets/images/cat-parts.jpg'
    ],
    rating: 4.9,
    reviews: 312,
    suction: 0,
    suctionDisplay: 'Tiêu chuẩn H13',
    battery: 0,
    area: 0,
    noise: '0 dB',
    stock: 240,
    category: 'accessories',
    categoryName: 'Phụ kiện',
    specsSummary: 'Lọc bụi mịn, khử mùi',
    features: [
      'Màng sợi thủy tinh đa lớp giữ lại 99.97% hạt bụi PM0.3',
      'Lớp phủ ion bạc kháng khuẩn ngăn nấm mốc phát triển',
      'Có thể giặt sạch bằng nước và tái sử dụng nhiều lần',
      'Tương thích hoàn hảo cho N4 Pro và N4 Ultra'
    ],
    highlights: ['Chuẩn H13', 'Khử Mùi', 'Kháng Khuẩn 99.9%', 'Độ Bền Cao'],
    description: 'Bộ lọc HEPA chính hãng cho hệ sinh thái N4 Cleanova. Giữ không khí trong lành, bảo vệ tối đa hệ hô hấp của trẻ nhỏ và người dễ dị ứng.',
    specs: {
      'Tiêu chuẩn lọc': 'HEPA H13 Medical Grade',
      'Kích thước hạt giữ lại': '0.3 micromet',
      'Tuổi thọ khuyến nghị': '3 - 6 tháng / màng lọc',
      'Quy cách đóng gói': 'Hộp 2 chiếc nguyên seal'
    }
  },
  {
    id: 4,
    slug: 'choi-canh-n4-pro',
    name: 'Chổi cạnh N4',
    series: 'Phụ kiện chính hãng',
    tagline: 'Làm sạch góc khuất | Cao su dẻo chống rối tóc 100%',
    price: 290000,
    oldPrice: 350000,
    discount: 17,
    badge: 'CHỐNG RỐI',
    badgeType: 'badge-gold',
    image: 'assets/images/cat-accessories.jpg',
    gallery: [
      'assets/images/cat-accessories.jpg'
    ],
    rating: 4.8,
    reviews: 215,
    suction: 0,
    suctionDisplay: 'Góc 360°',
    battery: 0,
    area: 0,
    noise: '0 dB',
    stock: 350,
    category: 'accessories',
    categoryName: 'Phụ kiện',
    specsSummary: 'Làm sạch góc khuất',
    features: [
      '3 chùm lông sợi nylon mật độ cao quét sạch chân tường',
      'Chất liệu silicone nhiệt dẻo TPU bền bỉ không làm xước sàn',
      'Cấu trúc chống quấn tóc thông minh tháo lắp không cần tua vít'
    ],
    highlights: ['Quét Góc Sâu', 'Chống Rối', 'Silicon TPU', 'Combo 4 Cây'],
    description: 'Cặp chổi quét cạnh chuyên dụng N4 giúp gom triệt để rác vụn, tóc rụng và bụi bẩn bám dọc chân tường vào họng hút của robot.',
    specs: {
      'Chất liệu': 'Nhựa nhiệt dẻo TPU + Sợi lông đàn hồi',
      'Đóng gói': 'Set 4 chiếc',
      'Khả năng tương thích': 'N4 Pro, N4 Ultra, N4 Lite'
    }
  },
  {
    id: 5,
    slug: 'robot-hut-bui-n4-ultra-ai',
    name: 'Robot hút bụi N4 Ultra AI',
    series: 'N4 Prestige Series',
    tagline: 'Lực hút kỷ lục 12.000Pa | Camera AI RGB 3D | Dock sấy nóng 80°C',
    price: 13990000,
    oldPrice: 16990000,
    discount: 18,
    badge: 'CÔNG NGHỆ ĐỈNH CAO',
    badgeType: 'badge-gold',
    image: 'assets/images/cat-waste.jpg',
    gallery: [
      'assets/images/cat-waste.jpg',
      'assets/images/cat-robot.jpg',
      'assets/images/cat-parts.jpg',
      'assets/images/luxury-room.jpg'
    ],
    rating: 5.0,
    reviews: 184,
    suction: 12000,
    suctionDisplay: '12.000 Pa',
    battery: 240,
    area: 450,
    noise: '52 dB',
    stock: 19,
    category: 'robot',
    categoryName: 'Robot hút bụi',
    specsSummary: '12.000Pa | AI Dual LiDAR',
    features: [
      'Động cơ bão từ cực đại 12.000 Pa hút sạch mọi loại rác',
      'Camera AI RGB nhận diện 68 loại vật cản theo thời gian thực',
      'Trạm All-in-One tự cấp nước, tự giặt giẻ sấy nóng 80°C',
      'Pin dung lượng khủng 6.400 mAh dọn dẹp liên tục 4 tiếng',
      'Lau xoay kép áp lực cao đánh bay vết bẩn cà phê khô cứng'
    ],
    highlights: ['12.000 Pa', 'Camera AI RGB', 'Sấy Nóng 80°C', 'Pin 240 Phút'],
    description: 'N4 Ultra AI đỉnh cao công nghệ làm sạch tự động. Được trang bị chip xử lý NPU độc quyền, tự động lập sơ đồ 3D ngôi nhà và giải phóng hoàn toàn đôi tay của gia chủ.',
    specs: {
      'Lực hút tối đa': '12.000 Pa (Ultra Storm)',
      'Hệ thống điều hướng': 'Dual LiDAR AI Spatial 3D + RGB Camera',
      'Thời lượng pin': '6.400 mAh (240 phút)',
      'Diện tích làm sạch': '450 m² (Hỗ trợ 5 tầng lầu)',
      'Bảo hành': '24 Tháng chính hãng • Bảo dưỡng tận nơi'
    }
  },
  {
    id: 6,
    slug: 'may-ve-sinh-lau-san-n4-hydro',
    name: 'Máy lau sàn hút bụi N4 Hydro Clean',
    series: 'N4 Hydro Series',
    tagline: 'Hút bụi & Lau sàn 2-in-1 | Tự làm sạch con lăn | Diệt khuẩn 99.9%',
    price: 6890000,
    oldPrice: 7990000,
    discount: 14,
    badge: 'CÔNG NGHỆ HYDRO',
    badgeType: 'badge-gold',
    image: 'assets/images/cat-cleaning.jpg',
    gallery: [
      'assets/images/cat-cleaning.jpg',
      'assets/images/cat-accessories.jpg'
    ],
    rating: 4.9,
    reviews: 142,
    suction: 16000,
    suctionDisplay: '16.000 Pa',
    battery: 45,
    area: 220,
    noise: '62 dB',
    stock: 22,
    category: 'cleaning',
    categoryName: 'Thiết bị vệ sinh',
    specsSummary: 'Hút & Lau đồng thời | Điện phân nước',
    features: [
      'Hút rác khô và nước bẩn cùng lúc chỉ qua 1 lần đẩy',
      'Hệ thống tạo nước điện phân khử khuẩn tức thì không hoá chất',
      'Chế độ tự giặt con lăn và sấy ly tâm chống mùi',
      'Màn hình LED màu thông minh hiển thị mức độ bẩn thời gian thực'
    ],
    highlights: ['Hút & Lau 2-in-1', 'Điện Phân Diệt Khuẩn', 'Tự Làm Sạch', 'Pin 45 Phút'],
    description: 'N4 Hydro Clean cách mạng hóa việc lau dọn sàn cứng. Vết tương cà, dầu mỡ, sữa đổ hay lông tóc đều được hút và lau sạch bong chỉ trong một lượt đi.',
    specs: {
      'Lực hút': '16.000 Pa',
      'Bình nước sạch': '800 ml',
      'Bình nước bẩn': '650 ml',
      'Thời lượng pin': '45 phút liên tục',
      'Bảo hành': '12 Tháng chính hãng'
    }
  },
  {
    id: 7,
    slug: 'tram-gom-rac-n4-station',
    name: 'Trạm gom rác tự động N4 Station',
    series: 'N4 Dock Series',
    tagline: 'Tự động hút rác vào túi kín 3.2L | Kháng khuẩn 60 ngày | Sạc siêu tốc',
    price: 3690000,
    oldPrice: 4290000,
    discount: 14,
    badge: 'THIẾT BỊ DỌN RÁC',
    badgeType: 'badge-gold',
    image: 'assets/images/cat-waste.jpg',
    gallery: [
      'assets/images/cat-waste.jpg',
      'assets/images/cat-robot.jpg'
    ],
    rating: 4.9,
    reviews: 88,
    suction: 28000,
    suctionDisplay: '28.000 Pa (Xả)',
    battery: 0,
    area: 0,
    noise: '68 dB (15 giây)',
    stock: 35,
    category: 'waste',
    categoryName: 'Thiết bị dọn rác',
    specsSummary: 'Túi rác 3.2L | 60 ngày rảnh tay',
    features: [
      'Lực hút xả cực mạnh 28.000 Pa rút sạch bụi trong 15 giây',
      'Túi chứa rác kháng khuẩn than hoạt tính khoá mùi tuyệt đối',
      'Đèn UV-C diệt khuẩn tự động bên trong khoang chứa rác',
      'Tương thích hoàn hảo với robot N4 Pro và N4 Ultra'
    ],
    highlights: ['60 Ngày Rảnh Tay', 'Túi Lọc 3.2L', 'Khử Trùng UV-C', 'Bảo Vệ Sức Khoẻ'],
    description: 'Trạm gom rác tự động N4 Station nâng tầm tiện nghi. Mỗi lần robot hoàn thành chu trình dọn dẹp, toàn bộ rác sẽ được tự động rút vào túi kháng khuẩn, bạn hoàn toàn không lo bụi bay vào mắt mũi.',
    specs: {
      'Dung tích túi rác': '3.2 Lít',
      'Thời gian xả bụi': '15 giây / lần',
      'Công nghệ khử mùi': 'Than hoạt tính + Tia UV-C',
      'Bảo hành': '12 Tháng chính hãng'
    }
  },
  {
    id: 8,
    slug: 'cam-bien-lidar-pin-n4',
    name: 'Cảm biến Laser LiDAR N4 Precision',
    series: 'Linh kiện chính hãng',
    tagline: 'Mô-đun quét laser 360° | Tần số quét 2.080 điểm/giây | Độ chính xác milimet',
    price: 1190000,
    oldPrice: 1390000,
    discount: 14,
    badge: 'LINH KIỆN ZIN',
    badgeType: 'badge-gold',
    image: 'assets/images/cat-parts.jpg',
    gallery: [
      'assets/images/cat-parts.jpg'
    ],
    rating: 5.0,
    reviews: 64,
    suction: 0,
    suctionDisplay: 'Quét 360°',
    battery: 0,
    area: 0,
    noise: '0 dB',
    stock: 40,
    category: 'parts',
    categoryName: 'Linh kiện',
    specsSummary: 'Độ nhạy milimet | Chuẩn N4 Factory',
    features: [
      'Mô-đun quang học nguyên bản N4 Factory sản xuất',
      'Vỏ hợp kim mạ champagne gold tản nhiệt vượt trội',
      'Dễ dàng thay thế với đầu cắm pin-to-pin an toàn'
    ],
    highlights: ['Zin Chính Hãng', 'Độ Nhạy Cao', 'Mạ Gold Tinh Xảo', 'Bảo Hành 6 Tháng'],
    description: 'Cảm biến mắt thần LiDAR thế hệ mới dành cho robot hút bụi N4, đảm bảo khả năng quét địa hình và né tránh vật cản chính xác 100% như máy mới xuất xưởng.',
    specs: {
      'Công nghệ': 'Laser Time-of-Flight (ToF) 360°',
      'Giao tiếp': 'UART Serial Interface',
      'Bảo hành': '6 Tháng chính hãng'
    }
  },
  {
    id: 9,
    slug: 'robot-hut-bui-n4-lite',
    name: 'Robot hút bụi N4 Lite',
    series: 'N4 Smart Series',
    tagline: 'Nhỏ gọn mỏng nhẹ 7.9cm | Hút lau 2 trong 1 | Giá tối ưu cho chung cư',
    price: 3490000,
    oldPrice: 4290000,
    discount: 19,
    badge: 'GIÁ TỐI ƯU',
    badgeType: 'badge-gold',
    image: 'assets/images/cat-robot.jpg',
    gallery: [
      'assets/images/cat-robot.jpg',
      'assets/images/luxury-room.jpg'
    ],
    rating: 4.7,
    reviews: 642,
    suction: 3200,
    suctionDisplay: '3.200 Pa',
    battery: 120,
    area: 160,
    noise: '59 dB',
    stock: 80,
    category: 'robot',
    categoryName: 'Robot hút bụi',
    specsSummary: '3.200Pa | Thân mỏng 7.9cm',
    features: [
      'Thân máy siêu mỏng chỉ 7.9cm luồn lách gầm tủ, gầm giường',
      'Lực hút 3.200 Pa kèm bình nước điều tiết điện tử',
      'Cảm biến chống rơi cầu thang và chống va đập thông minh',
      'Tự động quay về dock nạp năng lượng khi pin dưới 15%'
    ],
    highlights: ['3.200 Pa', 'Mỏng 7.9cm', 'Hút & Lau', 'Pin 120 Phút'],
    description: 'N4 Lite là sự lựa chọn hoàn hảo cho các căn hộ studio, căn hộ 1-2 phòng ngủ. Vận hành êm ái, thân máy mỏng dễ dàng làm sạch mọi góc khuất.',
    specs: {
      'Lực hút tối đa': '3.200 Pa',
      'Chiều cao thân máy': '7.9 cm',
      'Thời lượng pin': '2.600 mAh (120 phút)',
      'Dung tích hộp bụi': '450 ml + Hộp nước 250 ml',
      'Bảo hành': '12 Tháng chính hãng'
    }
  }
];

// 3. HELPER FUNCTIONS
function formatPrice(val) {
  if (typeof val !== 'number') return '0đ';
  return val.toLocaleString('vi-VN') + 'đ';
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
  if (!prod) return;

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
    item.quantity = Math.max(1, quantity);
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

// 5. TECH SHOWCASE DETAILS
const TECH_DETAILS = {
  lidar: {
    title: 'Hệ Thống Laser LiDAR LDS 360° + AI Vision',
    desc: 'Cảm biến laser LiDAR viền champagne gold của N4 quét 2.080 điểm/giây với độ chính xác milimet. Tái hiện bản đồ 3D ngôi nhà thời gian thực, chủ động né dây sạc, dép, thú cưng và vật cản mà không hề va chạm.',
    metricVal: '2.080',
    metricLbl: 'Điểm quét laser / giây',
    img: 'assets/images/lidar-tech.jpg'
  },
  ai: {
    title: 'Chip Xử Lý AI NPU Đa Luồng Thông Minh',
    desc: 'Bộ vi xử lý NPU thế hệ mới nhận diện và phân loại hơn 68 loại đồ vật quen thuộc trong gia đình. Tự động điều chỉnh công suất hút và lực nén lau phù hợp cho từng loại bề mặt sàn gỗ, sàn đá hay thảm nỉ.',
    metricVal: '< 1 cm',
    metricLbl: 'Độ chính xác né tránh vật cản',
    img: 'assets/images/cat-robot.jpg'
  },
  suction: {
    title: 'Động Cơ Áp Suất Bão 5000Pa - 12000Pa',
    desc: 'Động cơ tuabin không chổi than tạo luồng khí xoáy áp lực cao, cuốn phăng từ lông thú, phấn hoa đến các hạt bụi mịn PM0.3 nằm sâu trong rãnh ron sàn nhà.',
    metricVal: '5000Pa',
    metricLbl: 'Lực hút tiêu chuẩn N4 Pro',
    img: 'assets/images/cat-waste.jpg'
  },
  dock: {
    title: 'Trạm Sạc All-in-One Tự Giặt & Khử Khuẩn 80°C',
    desc: 'Hệ thống tự động xả bụi vào túi kháng khuẩn 60 ngày, bơm nước nóng giặt sạch giẻ lau xoay kép và sấy khô bằng luồng khí nóng 80°C, triệt tiêu 99.9% vi khuẩn và mùi ẩm mốc.',
    metricVal: '60 Ngày',
    metricLbl: 'Hoàn toàn không chạm tay vào rác',
    img: 'assets/images/cat-waste.jpg'
  }
};
