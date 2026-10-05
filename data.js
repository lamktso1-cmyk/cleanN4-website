/* ==========================================================================
   CLEANNOVA - DATA LAYER
   Product catalogue, Chatbot decision tree, Vouchers & Cart helpers
   ========================================================================== */

// 1. PRODUCT CATALOGUE
const PRODUCTS = [
  {
    id: 1,
    slug: 'cleannova-ai-x1',
    name: 'CLEANNOVA AI X1',
    series: 'AI Flagship Series',
    tagline: 'Flagship thông minh. Trả lại thời gian cho yêu thương.',
    price: 8990000,
    oldPrice: 10990000,
    discount: 18,
    badge: 'BÁN CHẠY NHẤT',
    badgeType: 'badge-emerald',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviews: 312,
    suction: 8000,
    suctionDisplay: '8.000 Pa',
    battery: 180,
    area: 300,
    noise: '56 dB',
    stock: 42,
    category: 'flagship',
    features: [
      'AI 3D LiDAR thế hệ mới',
      'Trạm sạc tự đổ rác 60 ngày',
      'Tự giặt & sấy khô giẻ lau',
      'Lọc vi khuẩn HEPA 99.9%',
      'Cảm biến chống rơi cầu thang',
      'Điều khiển App Tiếng Việt & Giọng nói'
    ],
    highlights: ['8.000 Pa', 'AI 3D LiDAR', 'Dock Tự Giặt Sấy', '180 Phút Pin'],
    description: 'CLEANNOVA AI X1 là dòng robot hút bụi lau nhà biểu tượng của sự thảnh thơi. Được tích hợp chip AI xử lý đa luồng kết hợp cảm biến LiDAR 3D, AI X1 nhận diện chính xác từng chướng ngại vật từ dây cáp đến đồ chơi trẻ em, tự động giặt sấy giẻ ở nhiệt độ ấm và gom rác tự động suốt 60 ngày không cần chạm tay.',
    specs: {
      'Lực hút tối đa': '8.000 Pa (Turbo Clean)',
      'Hệ thống điều hướng': 'AI 3D Structured Light + LiDAR Laser LDS',
      'Dung tích trạm sạc': 'Túi rác 3.2L + Bình nước sạch 4L',
      'Thời lượng pin': '5.200 mAh (Lên đến 180 phút)',
      'Diện tích làm sạch': 'Tối đa 300 m² sàn',
      'Hệ thống lọc': 'Màng lọc HEPA E11 kháng khuẩn 99.9%',
      'Kết nối thông minh': 'Wi-Fi 2.4/5GHz, App Cleannova Life, Google Home, Alexa',
      'Chế độ bảo hành': '18 Tháng chính hãng • 1 Đổi 1 trong 30 ngày'
    }
  },
  {
    id: 2,
    slug: 'cleannova-ai-x2',
    name: 'CLEANNOVA AI X2',
    series: 'Ultra Intelligent Series',
    tagline: 'Mạnh hơn. Thông minh hơn. Đỉnh cao công nghệ làm sạch.',
    price: 12490000,
    oldPrice: 14990000,
    discount: 17,
    badge: 'MỚI 2026',
    badgeType: 'badge-cyan',
    image: 'https://images.unsplash.com/photo-1563770660941-10a63d5fbab0?w=800&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1563770660941-10a63d5fbab0?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85&auto=format&fit=crop'
    ],
    rating: 5.0,
    reviews: 128,
    suction: 12000,
    suctionDisplay: '12.000 Pa',
    battery: 240,
    area: 400,
    noise: '54 dB',
    stock: 18,
    category: 'flagship',
    features: [
      'Lực hút siêu bão 12.000 Pa',
      'Camera AI RGB nhận diện 68 loại vật cản',
      'Trạm All-in-One sấy giẻ nóng 80°C',
      'Tự động cấp thoát nước tự động',
      'Lau xoay kép áp lực cao 200 vòng/phút',
      'Lọc HEPA H13 khử mùi ion'
    ],
    highlights: ['12.000 Pa', 'Camera AI RGB', 'Sấy Giẻ 80°C', '240 Phút Pin'],
    description: 'CLEANNOVA AI X2 định nghĩa lại tiêu chuẩn làm sạch thượng lưu. Sở hữu lực hút phi thường 12.000Pa cùng camera AI nhận diện thời gian thực với độ chính xác milimet. Trạm sạc All-in-One khép kín tự giặt, khử khuẩn giẻ lau bằng nước nóng và sấy khô 80°C ngăn chặn tuyệt đối ẩm mốc và vi khuẩn.',
    specs: {
      'Lực hút tối đa': '12.000 Pa (Ultra Storm)',
      'Hệ thống điều hướng': 'AI RGB Camera + Dual LiDAR 3D',
      'Dung tích trạm sạc': 'Bình nước 4.5L + Tự pha dung dịch tẩy rửa',
      'Thời lượng pin': '6.400 mAh (Lên đến 240 phút)',
      'Diện tích làm sạch': '400 m² sàn liên tục',
      'Hệ thống lọc': 'HEPA H13 True Medical-grade 99.97%',
      'Kết nối thông minh': 'Wi-Fi 6, Trợ lý giọng nói offline, App Cleannova Pro',
      'Chế độ bảo hành': '24 Tháng chính hãng • Bảo dưỡng tận nhà định kỳ'
    }
  },
  {
    id: 3,
    slug: 'cleannova-pro',
    name: 'CLEANNOVA PRO',
    series: 'Essential Pro Series',
    tagline: 'Hiệu năng chuyên nghiệp trong thiết kế thanh lịch.',
    price: 5990000,
    oldPrice: 7490000,
    discount: 20,
    badge: 'PHỔ BIẾN NHẤT',
    badgeType: 'badge-emerald',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=85&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviews: 589,
    suction: 5000,
    suctionDisplay: '5.000 Pa',
    battery: 150,
    area: 200,
    noise: '58 dB',
    stock: 96,
    category: 'essential',
    features: [
      'Laser LiDAR LDS 360° quét bản đồ siêu tốc',
      'Lực hút mạnh mẽ 5.000 Pa',
      'Tự động tăng lực khi gặp thảm',
      'Hộp rác lớn 450ml + Màng lọc HEPA',
      'Khay nước điện tử 3 cấp độ thẩm thấu',
      'Thiết kế siêu mỏng 8.2cm chui gầm giường tủ'
    ],
    highlights: ['5.000 Pa', 'LiDAR LDS 360°', 'Thân Mỏng 8.2cm', '150 Phút Pin'],
    description: 'CLEANNOVA PRO là giải pháp lý tưởng cho các căn hộ chung cư 2-3 phòng ngủ. Với thân máy siêu mỏng chỉ 8.2cm, PRO dễ dàng luồn lách vào những ngóc ngách hiểm hóc nhất dưới gầm sofa, gầm giường để hút sạch bụi mịn bám lâu ngày.',
    specs: {
      'Lực hút tối đa': '5.000 Pa',
      'Hệ thống điều hướng': 'Laser LDS 360° Vision',
      'Dung tích hộp': 'Hộp bụi 450ml + Hộp nước 300ml',
      'Thời lượng pin': '3.200 mAh (150 phút)',
      'Diện tích làm sạch': '200 m²',
      'Độ dày thân máy': '8.2 cm siêu mỏng',
      'Kết nối thông minh': 'Wi-Fi 2.4GHz, App Cleannova Life',
      'Chế độ bảo hành': '18 Tháng chính hãng'
    }
  },
  {
    id: 4,
    slug: 'cleannova-max',
    name: 'CLEANNOVA MAX',
    series: 'Mansion Prestige Series',
    tagline: 'Công suất cực đại. Chinh phục dinh thự và không gian lớn.',
    price: 18990000,
    oldPrice: 22990000,
    discount: 17,
    badge: 'ĐỘC QUYỀN LUXURY',
    badgeType: 'badge-gold',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=85&auto=format&fit=crop'
    ],
    rating: 5.0,
    reviews: 47,
    suction: 15000,
    suctionDisplay: '15.000 Pa',
    battery: 300,
    area: 600,
    noise: '52 dB',
    stock: 7,
    category: 'luxury',
    features: [
      'Lực hút kỷ lục 15.000 Pa đỉnh cao',
      'Quản lý đa tầng Multi-Floor Mapping (lưu 5 bản đồ)',
      'Trạm Station Full-Titanium tự làm sạch hoàn toàn',
      'Diệt khuẩn bề mặt bằng tia UV-C Sterilization',
      'Màng lọc HEPA H14 đạt tiêu chuẩn phòng mổ',
      'Động cơ không chổi than siêu êm 52dB'
    ],
    highlights: ['15.000 Pa', 'Lưu 5 Bản Đồ Tầng', 'UV-C Diệt Khuẩn', 'HEPA H14 Chuẩn Y Tế'],
    description: 'CLEANNOVA MAX được tạo tác riêng cho những căn biệt thự, penthouse và không gian kiến trúc rộng lớn. Khả năng ghi nhớ 5 tầng lầu, tự nhận diện tầng thông minh và lực hút 15.000Pa không đối thủ, kết hợp công nghệ tia cực tím UV-C tiêu diệt 99.99% mầm bệnh trên sàn nhà.',
    specs: {
      'Lực hút tối đa': '15.000 Pa (Titanium Extreme)',
      'Hệ thống điều hướng': 'Dual LiDAR AI Spatial 3D + Sonar Radar',
      'Thời lượng pin': '8.000 mAh (300 phút liên tục)',
      'Diện tích làm sạch': '600 m² (Nhà nhiều tầng)',
      'Công nghệ diệt khuẩn': 'Khử khuẩn nhiệt độ cao + Đèn UV-C',
      'Độ ồn hoạt động': '52 dB siêu tĩnh lặng',
      'Chế độ bảo hành': '24 Tháng chính hãng • 1 Đổi 1 trong 60 ngày'
    }
  },
  {
    id: 5,
    slug: 'cleannova-pet',
    name: 'CLEANNOVA PET SPECIAL',
    series: 'Pet Friendly Series',
    tagline: 'Giải pháp tuyệt đối cho gia đình nuôi chó mèo.',
    price: 6990000,
    oldPrice: 8990000,
    discount: 22,
    badge: 'PET SPECIAL',
    badgeType: 'badge-cyan',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=85&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviews: 276,
    suction: 9000,
    suctionDisplay: '9.000 Pa',
    battery: 180,
    area: 250,
    noise: '55 dB',
    stock: 33,
    category: 'specialty',
    features: [
      'Chổi cao su chống rối tóc và lông thú cưng độc quyền',
      'AI nhận diện & né chất thải thú cưng thông minh',
      'Hệ thống lọc kép than hoạt tính khử mùi hôi chó mèo',
      'Lực hút chuyên sâu 9.000 Pa hút sạch lông trên thảm',
      'Chế độ hoạt động siêu êm dịu không làm thú cưng hoảng sợ',
      'Trạm hút bụi tự động gom lông vào túi kín vô trùng'
    ],
    highlights: ['9.000 Pa', 'Chống Rối Lông 100%', 'AI Né Thú Cưng', 'Khử Mùi Than Hoạt Tính'],
    description: 'CLEANNOVA PET SPECIAL giải quyết triệt để nỗi ám ảnh lông thú bay khắp nhà và bám dính trên thảm. Thiết kế cụm chổi xoắn kép Silicon 100% không lo quấn tóc, kết hợp bộ lọc carbon hoạt tính hấp thụ mùi đặc trưng của thú cưng, giữ không gian luôn trong lành thơm mát.',
    specs: {
      'Lực hút tối đa': '9.000 Pa (Pet Hair Turbo)',
      'Hệ thống điều hướng': 'AI Pet Obstacle Avoidance + LDS LiDAR',
      'Bộ lọc chuyên sâu': 'HEPA + Màng Carbon hoạt tính khử mùi',
      'Thời lượng pin': '5.200 mAh (180 phút)',
      'Diện tích làm sạch': '250 m²',
      'Chế độ bảo hành': '18 Tháng chính hãng • Tặng 2 năm túi rác khử mùi'
    }
  },
  {
    id: 6,
    slug: 'cleannova-lite',
    name: 'CLEANNOVA LITE',
    series: 'Smart Entry Series',
    tagline: 'Bước khởi đầu hoàn hảo vào thế giới nhà thông minh.',
    price: 3490000,
    oldPrice: 4490000,
    discount: 22,
    badge: 'GIÁ TỐI ƯU',
    badgeType: 'badge-emerald',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=85&auto=format&fit=crop'
    ],
    rating: 4.6,
    reviews: 1024,
    suction: 3000,
    suctionDisplay: '3.000 Pa',
    battery: 120,
    area: 150,
    noise: '62 dB',
    stock: 200,
    category: 'essential',
    features: [
      'Điều hướng thông minh Smart Gyro-Mapping',
      'Vừa hút bụi vừa lau nhà đồng thời',
      'Màng lọc bụi mịn HEPA tiêu chuẩn',
      'Tự động quay về dock sạc khi pin yếu',
      'Kết nối ứng dụng điện thoại tiện lợi',
      'Độ bền cao, chi phí bảo trì cực thấp'
    ],
    highlights: ['3.000 Pa', 'Smart Gyro-Nav', 'Hút & Lau 2-trong-1', 'Giá Dễ Tiếp Cận'],
    description: 'CLEANNOVA LITE là giải pháp tuyệt vời cho sinh viên, người độc thân hoặc các gia đình trẻ sống tại căn hộ studio. Đầy đủ tính năng lau hút thông minh, kết nối app tiện lợi với mức giá dễ tiếp cận nhất thị trường.',
    specs: {
      'Lực hút tối đa': '3.000 Pa',
      'Hệ thống điều hướng': 'Gyroscope + Cảm biến quang học',
      'Thời lượng pin': '2.600 mAh (120 phút)',
      'Diện tích làm sạch': '150 m²',
      'Kết nối thông minh': 'Wi-Fi 2.4GHz, App Cleannova',
      'Chế độ bảo hành': '12 Tháng chính hãng'
    }
  }
];

// 2. ACCESSORIES
const ACCESSORIES = [
  {
    id: 101,
    name: 'Bộ Lọc HEPA Kháng Khuẩn Cleannova H13',
    price: 290000,
    oldPrice: 390000,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&q=80',
    stock: 450,
    category: 'accessories'
  },
  {
    id: 102,
    name: 'Chổi Quét Cạnh Chống Rối Tóc Cleannova (Set 6 cái)',
    price: 350000,
    oldPrice: 450000,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
    stock: 220,
    category: 'accessories'
  },
  {
    id: 103,
    name: 'Cặp Khăn Lau Xoay Kép Vi Sợi Microfiber Cao Cấp',
    price: 190000,
    oldPrice: 250000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    stock: 310,
    category: 'accessories'
  },
  {
    id: 104,
    name: 'Dung Dịch Lau Sàn Kháng Khuẩn Tự Nhiên Cleannova 1000ml',
    price: 250000,
    oldPrice: 320000,
    image: 'https://images.unsplash.com/photo-1563770660941-10a63d5fbab0?w=400&q=80',
    stock: 380,
    category: 'accessories'
  }
];

// 3. REVIEWS DATA
const REVIEWS = [
  {
    id: 1,
    productId: 1,
    author: 'Nguyễn Thị Lan Anh',
    role: 'Chung cư Masteri Thảo Điền, TP.HCM',
    avatar: 'LA',
    rating: 5,
    date: '15/09/2026',
    content: 'Nhà mình nuôi 2 bé mèo Anh lông dài nên trước đây ngày nào cũng phải quét và hút bụi 2 lần mệt phờ. Từ khi dùng Cleannova AI X1, việc dọn nhà nhẹ tênh. Robot tự lên lịch dọn lúc mình đi làm, né khay ăn của mèo cực khéo. Trạm sạc tự giặt và sấy khô giẻ lau là cứu tinh tuyệt đối!',
    helpful: 89,
    verified: true
  },
  {
    id: 2,
    productId: 1,
    author: 'Trần Minh Đức',
    role: 'Kỹ sư công nghệ, Vinhomes Ocean Park, Hà Nội',
    avatar: 'MD',
    rating: 5,
    date: '08/09/2026',
    content: 'Mình làm mảng tech nên soi thuật toán rất kỹ. Cảm biến LiDAR 3D của Cleannova vẽ bản đồ 3D ngôi nhà cực kỳ chi tiết, né dây sạc điện thoại và dép đi trong nhà chuẩn xác từng centimet. Lực hút 8000Pa hút sạch cả bụi cát mịn trong khe gạch.',
    helpful: 54,
    verified: true
  },
  {
    id: 3,
    productId: 3,
    author: 'Phạm Hồng Nhung',
    role: 'Nhân viên văn phòng, Q. Bình Thạnh',
    avatar: 'HN',
    rating: 5,
    date: '22/08/2026',
    content: 'Cleannova PRO mỏng dính chỉ hơn 8cm, chui lọt gầm giường với gầm sofa phòng khách lấy ra cả đống bụi tích tụ bấy lâu. App tiếng Việt trực quan, bố mẹ mình ở nhà cũng tự bấm nút điều khiển được dễ dàng.',
    helpful: 37,
    verified: true
  },
  {
    id: 4,
    productId: 2,
    author: 'Lê Hoàng Quân',
    role: 'Chủ biệt thự Splendora, Hà Nội',
    avatar: 'HQ',
    rating: 5,
    date: '01/10/2026',
    content: 'Đã dùng qua nhiều dòng robot của Đức và Mỹ, nhưng AI X2 của Cleannova thực sự vượt trội. Lực hút 12000Pa mạnh khủng khiếp, trạm sạc tự bơm nước giặt giẻ nóng 80 độ diệt khuẩn hoàn toàn. Rất đáng đồng tiền bát gạo.',
    helpful: 112,
    verified: true
  }
];

// 4. VOUCHERS
const VOUCHERS = {
  'CLEANNOVA1000': { code: 'CLEANNOVA1000', discount: 1000000, type: 'fixed', label: 'Giảm 1.000.000₫' },
  'CLEAN10': { code: 'CLEAN10', discount: 0.10, type: 'percent', label: 'Giảm 10% đơn hàng' },
  'SMART20': { code: 'SMART20', discount: 0.20, type: 'percent', label: 'Giảm 20% cho thành viên mới' },
  'NEWUSER': { code: 'NEWUSER', discount: 500000, type: 'fixed', label: 'Ưu đãi khách hàng mới -500k' }
};

// 5. CHATBOT CONSULTATION DECISION TREE
const CHATBOT_FLOW = {
  welcome: {
    message: 'Xin chào! Tôi là Trợ lý AI Cleannova ✦\n\nTôi sẽ giúp bạn tìm ra mẫu robot hút bụi lau nhà thông minh tương thích hoàn hảo với không gian sống của bạn. Hãy chọn một vài câu hỏi nhanh nhé!',
    next: 'q1',
    type: 'text'
  },
  q1: {
    message: 'Diện tích mặt sàn nhà bạn khoảng bao nhiêu m²?',
    type: 'options',
    options: [
      { label: 'Dưới 60 m² (Studio / Căn hộ nhỏ)', value: 'small', next: 'q2' },
      { label: '60 – 120 m² (Căn hộ 2–3 phòng ngủ)', value: 'medium', next: 'q2' },
      { label: '120 – 250 m² (Nhà phố / Penthouse)', value: 'large', next: 'q2' },
      { label: 'Trên 250 m² (Biệt thự / Đa tầng)', value: 'mansion', next: 'q2' }
    ]
  },
  q2: {
    message: 'Gia đình bạn có nuôi chó hoặc mèo không?',
    type: 'options',
    options: [
      { label: '🐾 Có, nuôi chó/mèo (Nhiều lông rụng)', value: 'pet', next: 'q3' },
      { label: '🏠 Không nuôi thú cưng', value: 'nopet', next: 'q3' }
    ]
  },
  q3: {
    message: 'Mức ngân sách bạn dự định đầu tư cho sự thảnh thơi?',
    type: 'options',
    options: [
      { label: 'Dưới 5 triệu (Tiết kiệm)', value: 'budget_low', next: 'result' },
      { label: '5 – 10 triệu (Phổ thông cao cấp)', value: 'budget_mid', next: 'result' },
      { label: '10 – 15 triệu (Flagship toàn năng)', value: 'budget_high', next: 'result' },
      { label: 'Trên 15 triệu (Dinh thự xa hoa)', value: 'budget_ultra', next: 'result' }
    ]
  }
};

function getChatbotRecommendation(answers) {
  const { area, pet, budget } = answers;
  if (budget === 'budget_low') {
    return pet === 'pet' ? PRODUCTS.find(p => p.id === 3) : PRODUCTS.find(p => p.id === 6);
  }
  if (budget === 'budget_mid') {
    return pet === 'pet' ? PRODUCTS.find(p => p.id === 5) : PRODUCTS.find(p => p.id === 1);
  }
  if (budget === 'budget_high') {
    return PRODUCTS.find(p => p.id === 2);
  }
  if (budget === 'budget_ultra' || area === 'mansion') {
    return PRODUCTS.find(p => p.id === 4);
  }
  return PRODUCTS.find(p => p.id === 1);
}

// 6. CART UTILITIES
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cleannova-cart') || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('cleannova-cart', JSON.stringify(cart));
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const idNum = Number(productId);
  const product = PRODUCTS.find(p => p.id === idNum) || ACCESSORIES.find(a => a.id === idNum);
  if (!product) return false;

  const idx = cart.findIndex(item => item.id === idNum);
  if (idx > -1) {
    cart[idx].qty += qty;
  } else {
    cart.push({
      id: idNum,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: qty
    });
  }
  saveCart(cart);
  updateCartBadge();
  return true;
}

function removeFromCart(productId) {
  const idNum = Number(productId);
  saveCart(getCart().filter(item => item.id !== idNum));
  updateCartBadge();
}

function updateCartQty(productId, qty) {
  const idNum = Number(productId);
  const cart = getCart();
  const idx = cart.findIndex(item => item.id === idNum);
  if (idx > -1) {
    if (qty <= 0) {
      cart.splice(idx, 1);
    } else {
      cart[idx].qty = qty;
    }
    saveCart(cart);
    updateCartBadge();
  }
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge, #cart-count, .header-cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function getProductById(id) {
  const idNum = Number(id);
  return PRODUCTS.find(p => p.id === idNum) || ACCESSORIES.find(a => a.id === idNum) || null;
}

// 7. FORMAT HELPERS
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN').format(price) + '₫';
}

function renderStars(rating) {
  const full = Math.floor(rating);
  let s = '';
  for (let i = 0; i < full; i++) s += '★';
  if (rating % 1 >= 0.5) s += '★';
  while (s.length < 5) s += '☆';
  return s;
}

// 8. ADMIN MOCK DATA
const ADMIN_DATA = {
  kpi: {
    revenueToday: 148500000,
    growth: 34.2,
    ordersToday: 24,
    itemsSold: 38,
    inventoryCount: 396
  },
  revenueMonthly: [
    { month: 'T4', value: 180 },
    { month: 'T5', value: 240 },
    { month: 'T6', value: 210 },
    { month: 'T7', value: 320 },
    { month: 'T8', value: 290 },
    { month: 'T9', value: 460 },
    { month: 'T10', value: 520 }
  ],
  orders: [
    { id: '#CN-2026-8901', customer: 'Nguyễn Văn Hùng', product: 'CLEANNOVA AI X1', total: 8990000, date: '05/10/2026', status: 'shipping', statusText: 'Đang giao' },
    { id: '#CN-2026-8902', customer: 'Trần Thị Thu Trang', product: 'CLEANNOVA AI X2', total: 12490000, date: '05/10/2026', status: 'processing', statusText: 'Đang xử lý' },
    { id: '#CN-2026-8903', customer: 'Lê Hoàng Quân', product: 'CLEANNOVA MAX', total: 18990000, date: '04/10/2026', status: 'completed', statusText: 'Đã hoàn tất' },
    { id: '#CN-2026-8904', customer: 'Vũ Minh Anh', product: 'CLEANNOVA PET SPECIAL', total: 6990000, date: '04/10/2026', status: 'completed', statusText: 'Đã hoàn tất' },
    { id: '#CN-2026-8905', customer: 'Đỗ Quốc Bảo', product: 'CLEANNOVA PRO', total: 5990000, date: '03/10/2026', status: 'completed', statusText: 'Đã hoàn tất' },
    { id: '#CN-2026-8906', customer: 'Phạm Thanh Mai', product: 'CLEANNOVA LITE', total: 3490000, date: '03/10/2026', status: 'completed', statusText: 'Đã hoàn tất' }
  ],
  inventory: [
    { id: 1, name: 'CLEANNOVA AI X1', stock: 42, sold: 312, price: 8990000, status: 'in-stock' },
    { id: 2, name: 'CLEANNOVA AI X2', stock: 18, sold: 128, price: 12490000, status: 'low-stock' },
    { id: 3, name: 'CLEANNOVA PRO', stock: 96, sold: 589, price: 5990000, status: 'in-stock' },
    { id: 4, name: 'CLEANNOVA MAX', stock: 7, sold: 47, price: 18990000, status: 'low-stock' },
    { id: 5, name: 'CLEANNOVA PET SPECIAL', stock: 33, sold: 276, price: 6990000, status: 'in-stock' },
    { id: 6, name: 'CLEANNOVA LITE', stock: 200, sold: 1024, price: 3490000, status: 'in-stock' },
    { id: 101, name: 'Bộ lọc HEPA Cleannova H13', stock: 450, sold: 890, price: 290000, status: 'in-stock' },
    { id: 102, name: 'Chổi quét cạnh chống rối', stock: 220, sold: 415, price: 350000, status: 'in-stock' },
    { id: 103, name: 'Khăn lau xoay microfiber', stock: 310, sold: 610, price: 190000, status: 'in-stock' },
    { id: 104, name: 'Dung dịch lau sàn 1000ml', stock: 380, sold: 650, price: 250000, status: 'in-stock' }
  ]
};
