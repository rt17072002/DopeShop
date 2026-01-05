import mongoose from 'mongoose';
import 'dotenv/config';
import  Product  from './models/Product.js';
import Order from './models/Order.js';

const dummyProducts = [
  // ELECTRONICS
  { name: "Premium Wireless Headphones", price: 299, category: "Electronics", stock: 45, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", description: "High-fidelity audio with active noise cancellation and 40-hour battery life.", cloudinary_id: "seed_1" },
  { name: "Minimalist Smart Watch", price: 199, category: "Electronics", stock: 30, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", description: "Sleek fitness tracker with heart rate monitoring and GPS.", cloudinary_id: "seed_2" },
  { name: "Mechanical Gaming Keyboard", price: 129, category: "Electronics", stock: 15, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800", description: "RGB backlit mechanical switches for superior tactile feedback.", cloudinary_id: "seed_3" },
  { name: "Portable Bluetooth Speaker", price: 89, category: "Electronics", stock: 60, image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=800", description: "Waterproof speaker with 360-degree immersive sound.", cloudinary_id: "seed_4" },
  { name: "Professional DSLR Camera", price: 1200, category: "Electronics", stock: 10, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800", description: "Capture stunning photos with this 24.2MP full-frame sensor camera.", cloudinary_id: "seed_5" },
  { name: "Ultra-Slim Laptop", price: 999, category: "Electronics", stock: 20, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800", description: "Powerful performance meets portability with a 13-inch Retina display.", cloudinary_id: "seed_6" },

  // FASHION
  { name: "Classic Leather Jacket", price: 250, category: "Fashion", stock: 12, image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800", description: "Genuine black leather jacket with a timeless biker aesthetic.", cloudinary_id: "seed_7" },
  { name: "Denim Trucker Jacket", price: 85, category: "Fashion", stock: 25, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800", description: "Versatile denim jacket perfect for layering in any season.", cloudinary_id: "seed_8" },
  { name: "Premium Cotton T-Shirt", price: 35, category: "Fashion", stock: 100, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800", description: "Soft, breathable organic cotton tee in a relaxed fit.", cloudinary_id: "seed_9" },
  { name: "Designer Sunglasses", price: 150, category: "Fashion", stock: 40, image: "https://images.unsplash.com/photo-1511499767390-91f19760b0ac?w=800", description: "Polarized lenses with a stylish tortoise shell frame.", cloudinary_id: "seed_10" },
  { name: "Casual Canvas Sneakers", price: 65, category: "Fashion", stock: 55, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800", description: "Comfortable every-day sneakers with a durable rubber sole.", cloudinary_id: "seed_11" },
  { name: "Leather Travel Bag", price: 180, category: "Fashion", stock: 18, image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800", description: "Spacious weekender bag crafted from premium tan leather.", cloudinary_id: "seed_12" },

  // HOME & DECOR
  { name: "Modern Ceramic Vase", price: 45, category: "Home", stock: 35, image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800", description: "Handcrafted white ceramic vase with a minimalist matte finish.", cloudinary_id: "seed_13" },
  { name: "Scented Soy Candle", price: 25, category: "Home", stock: 80, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800", description: "Lavender-infused soy wax candle for a relaxing atmosphere.", cloudinary_id: "seed_14" },
  { name: "Velvet Throw Pillow", price: 40, category: "Home", stock: 50, image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800", description: "Luxury velvet pillow in deep emerald green.", cloudinary_id: "seed_15" },
  { name: "Minimalist Wall Clock", price: 55, category: "Home", stock: 22, image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800", description: "Silent sweeping movement with a clean wooden frame.", cloudinary_id: "seed_16" },
  { name: "Industrial Desk Lamp", price: 75, category: "Home", stock: 14, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800", description: "Adjustable metal lamp with a vintage Edison bulb included.", cloudinary_id: "seed_17" },
  { name: "Plush Area Rug", price: 210, category: "Home", stock: 8, image: "https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=800", description: "Soft shag rug that adds warmth to any living room.", cloudinary_id: "seed_18" },
  { name: "Abstract Canvas Art", price: 320, category: "Home", stock: 5, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800", description: "Hand-painted abstract art on large stretched canvas.", cloudinary_id: "seed_19" },
  { name: "Smart Coffee Maker", price: 160, category: "Home", stock: 15, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800", description: "Program your morning brew directly from your smartphone.", cloudinary_id: "seed_20" },
];

const dummyOrders = [
  {
    customer: { name: "Arjun Mehta", email: "arjun.m@example.com", phone: "9876543210", address: "A-45, Green Park, Delhi" },
    items: [{ product: "695a44f770185d3e8ffb48a8", name: "Premium Wireless Headphones", quantity: 1, price: 299 }],
    totalAmount: 299,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    razorpay_order_id: "order_PR101",
    razorpay_payment_id: "pay_PR101_succ"
  },
  {
    customer: { name: "Priya Sharma", email: "priya.s@gmail.com", phone: "9123456789", address: "Flat 202, Sky High Apts, Mumbai" },
    items: [
      { product: "695a44f770185d3e8ffb48b0", name: "Premium Cotton T-Shirt", quantity: 3, price: 35 },
      { product: "695a44f770185d3e8ffb48b1", name: "Designer Sunglasses", quantity: 1, price: 150 }
    ],
    totalAmount: 255,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    razorpay_order_id: "order_PR102",
    razorpay_payment_id: "pay_PR102_succ"
  },
  {
    customer: { name: "Rohan Das", email: "rohan.d@outlook.com", phone: "9988776655", address: "Sector 15, Gurgaon" },
    items: [{ product: "695a44f770185d3e8ffb48ac", name: "Professional DSLR Camera", quantity: 1, price: 1200 }],
    totalAmount: 1200,
    paymentStatus: "Pending",
    orderStatus: "Processing",
    razorpay_order_id: "order_PR103"
  },
  {
    customer: { name: "Ananya Iyer", email: "ananya.i@example.com", phone: "8877665544", address: "12, Anna Nagar, Chennai" },
    items: [{ product: "695a44f770185d3e8ffb48b5", name: "Scented Soy Candle", quantity: 4, price: 25 }],
    totalAmount: 100,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    razorpay_order_id: "order_PR104",
    razorpay_payment_id: "pay_PR104_succ"
  },
  {
    customer: { name: "Kabir Singh", email: "kabir.s@rediffmail.com", phone: "7766554433", address: "Civil Lines, Chandigarh" },
    items: [
      { product: "695a44f770185d3e8ffb48aa", name: "Mechanical Gaming Keyboard", quantity: 1, price: 129 },
      { product: "695a44f770185d3e8ffb48a9", name: "Minimalist Smart Watch", quantity: 1, price: 199 }
    ],
    totalAmount: 328,
    paymentStatus: "Failed",
    orderStatus: "Cancelled",
    razorpay_order_id: "order_PR105"
  },
  {
    customer: { name: "Meera Nair", email: "meera.n@example.com", phone: "9000111222", address: "Kochi, Kerala" },
    items: [{ product: "695a44f770185d3e8ffb48ad", name: "Ultra-Slim Laptop", quantity: 1, price: 999 }],
    totalAmount: 999,
    paymentStatus: "Paid",
    orderStatus: "Processing",
    razorpay_order_id: "order_PR106",
    razorpay_payment_id: "pay_PR106_succ"
  },
  {
    customer: { name: "Siddharth Varma", email: "sid.v@example.com", phone: "9830098300", address: "Salt Lake, Kolkata" },
    items: [{ product: "695a44f770185d3e8ffb48b2", name: "Casual Canvas Sneakers", quantity: 2, price: 65 }],
    totalAmount: 130,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    razorpay_order_id: "order_PR107",
    razorpay_payment_id: "pay_PR107_succ"
  },
  {
    customer: { name: "Aditi Rao", email: "aditi.r@gmail.com", phone: "9444094440", address: "Jubilee Hills, Hyderabad" },
    items: [{ product: "695a44f770185d3e8ffb48b4", name: "Modern Ceramic Vase", quantity: 1, price: 45 }],
    totalAmount: 45,
    paymentStatus: "Pending",
    orderStatus: "Processing"
  },
  {
    customer: { name: "Vikram Malhotra", email: "v.mal@example.com", phone: "9222092220", address: "Model Town, Ludhiana" },
    items: [{ product: "695a44f770185d3e8ffb48ae", name: "Classic Leather Jacket", quantity: 1, price: 250 }],
    totalAmount: 250,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    razorpay_order_id: "order_PR109",
    razorpay_payment_id: "pay_PR109_succ"
  },
  {
    customer: { name: "Sana Khan", email: "sana.k@example.com", phone: "9111091110", address: "Bandra West, Mumbai" },
    items: [
      { product: "695a44f770185d3e8ffb48b6", name: "Velvet Throw Pillow", quantity: 2, price: 40 },
      { product: "695a44f770185d3e8ffb48b7", name: "Minimalist Wall Clock", quantity: 1, price: 55 }
    ],
    totalAmount: 135,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    razorpay_order_id: "order_PR110",
    razorpay_payment_id: "pay_PR110_succ"
  },
  {
    customer: { name: "Rahul Joshi", email: "rahul.j@example.com", phone: "9555095550", address: "Kothrud, Pune" },
    items: [{ product: "695a44f770185d3e8ffb48bb", name: "Smart Coffee Maker", quantity: 1, price: 160 }],
    totalAmount: 160,
    paymentStatus: "Paid",
    orderStatus: "Processing",
    razorpay_order_id: "order_PR111",
    razorpay_payment_id: "pay_PR111_succ"
  },
  {
    customer: { name: "Ishani Bose", email: "ishani@example.com", phone: "9666096660", address: "Indiranagar, Bangalore" },
    items: [{ product: "695a44f770185d3e8ffb48ba", name: "Abstract Canvas Art", quantity: 1, price: 320 }],
    totalAmount: 320,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    razorpay_order_id: "order_PR112",
    razorpay_payment_id: "pay_PR112_succ"
  },
  {
    customer: { name: "Arjun Kapoor", email: "arjun.k@example.com", phone: "9777097770", address: "Aliganj, Lucknow" },
    items: [{ product: "695a44f770185d3e8ffb48ab", name: "Portable Bluetooth Speaker", quantity: 2, price: 89 }],
    totalAmount: 178,
    paymentStatus: "Pending",
    orderStatus: "Processing"
  },
  {
    customer: { name: "Zara Sheikh", email: "zara.s@example.com", phone: "9888098880", address: "Banjara Hills, Hyderabad" },
    items: [{ product: "695a44f770185d3e8ffb48b3", name: "Leather Travel Bag", quantity: 1, price: 180 }],
    totalAmount: 180,
    paymentStatus: "Paid",
    orderStatus: "Processing",
    razorpay_order_id: "order_PR114",
    razorpay_payment_id: "pay_PR114_succ"
  },
  {
    customer: { name: "Manish Pandey", email: "manish.p@example.com", phone: "9999099990", address: "Mallital, Nainital" },
    items: [{ product: "695a44f770185d3e8ffb48b9", name: "Plush Area Rug", quantity: 1, price: 210 }],
    totalAmount: 210,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    razorpay_order_id: "order_PR115",
    razorpay_payment_id: "pay_PR115_succ"
  },
  {
    customer: { name: "Kritika Sen", email: "kritika.s@example.com", phone: "9000090000", address: "Gariahat, Kolkata" },
    items: [{ product: "695a44f770185d3e8ffb48af", name: "Denim Trucker Jacket", quantity: 1, price: 85 }],
    totalAmount: 85,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    razorpay_order_id: "order_PR116",
    razorpay_payment_id: "pay_PR116_succ"
  },
  {
    customer: { name: "Varun Bajaj", email: "varun.b@example.com", phone: "9111191111", address: "Juhu, Mumbai" },
    items: [{ product: "695a44f770185d3e8ffb48b8", name: "Industrial Desk Lamp", quantity: 1, price: 75 }],
    totalAmount: 75,
    paymentStatus: "Paid",
    orderStatus: "Processing",
    razorpay_order_id: "order_PR117",
    razorpay_payment_id: "pay_PR117_succ"
  },
  {
    customer: { name: "Deepika P.", email: "deepika@example.com", phone: "9222292222", address: "Prabhadevi, Mumbai" },
    items: [{ product: "695a44f770185d3e8ffb48a8", name: "Premium Wireless Headphones", quantity: 1, price: 299 }],
    totalAmount: 299,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    razorpay_order_id: "order_PR118",
    razorpay_payment_id: "pay_PR118_succ"
  },
  {
    customer: { name: "Sameer Goel", email: "sameer.g@example.com", phone: "9333393333", address: "Civil Lines, Kanpur" },
    items: [{ product: "695a44f770185d3e8ffb48a9", name: "Minimalist Smart Watch", quantity: 1, price: 199 }],
    totalAmount: 199,
    paymentStatus: "Pending",
    orderStatus: "Processing"
  },
  {
    customer: { name: "Alia B.", email: "alia.b@example.com", phone: "9444494444", address: "Juhu, Mumbai" },
    items: [{ product: "695a44f770185d3e8ffb48b3", name: "Leather Travel Bag", quantity: 1, price: 180 }],
    totalAmount: 180,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    razorpay_order_id: "order_PR120",
    razorpay_payment_id: "pay_PR120_succ"
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Order.deleteMany();
    await Order.insertMany(dummyOrders);
    console.log("✅ Database Seeded Successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();