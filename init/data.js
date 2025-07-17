const sampleProducts = [
  {
    name: "iPhone 14 Pro",
    description: "Latest iPhone with advanced camera system and A16 Bionic chip. Perfect for photography enthusiasts and power users.",
    images: [{
      filename: "iphone14pro",
      url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 99999,
    originalPrice: 119999,
    stock: 15,
    brand: "Apple",
    category: "Electronics"
  },
  {
    name: "Samsung 55-inch 4K Smart TV",
    description: "Crystal clear 4K resolution with smart features. Perfect for home entertainment and streaming.",
    images: [{
      filename: "samsungtv",
      url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 45999,
    originalPrice: 59999,
    stock: 8,
    brand: "Samsung",
    category: "Electronics"
  },
  {
    name: "MacBook Air M2",
    description: "Ultra-thin laptop with M2 chip, perfect for work and creativity. All-day battery life.",
    images: [{
      filename: "macbookair",
      url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 89999,
    originalPrice: 99999,
    stock: 12,
    brand: "Apple",
    category: "Electronics"
  },
  {
    name: "Sony WH-1000XM4 Headphones",
    description: "Industry-leading noise canceling wireless headphones with exceptional sound quality.",
    images: [{
      filename: "sonyheadphones",
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 24999,
    originalPrice: 29999,
    stock: 20,
    brand: "Sony",
    category: "Electronics"
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Air Max technology. Perfect for daily wear and athletic activities.",
    images: [{
      filename: "nikeairmax",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 8999,
    originalPrice: 12999,
    stock: 25,
    brand: "Nike",
    category: "Clothing"
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Premium running shoes with responsive cushioning. Ideal for long-distance running.",
    images: [{
      filename: "adidasultraboost",
      url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 15999,
    originalPrice: 18999,
    stock: 18,
    brand: "Adidas",
    category: "Sports"
  },
  {
    name: "Levi's 501 Original Jeans",
    description: "Classic straight-fit jeans with timeless style. Perfect for everyday wear.",
    images: [{
      filename: "levisjeans",
      url: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 3999,
    originalPrice: 5999,
    stock: 30,
    brand: "Levi's",
    category: "Clothing"
  },
  {
    name: "KitchenAid Stand Mixer",
    description: "Professional grade stand mixer for all your baking needs. Multiple attachments included.",
    images: [{
      filename: "kitchenaid",
      url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 24999,
    originalPrice: 29999,
    stock: 12,
    brand: "KitchenAid",
    category: "Home & Garden"
  },
  {
    name: "Philips Hue Smart Bulb Set",
    description: "Smart LED bulbs that can be controlled via app. Create the perfect ambiance.",
    images: [{
      filename: "philipshue",
      url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 3999,
    originalPrice: 5999,
    stock: 35,
    brand: "Philips",
    category: "Home & Garden"
  },
  {
    name: "Wilson Tennis Racket",
    description: "Professional tennis racket with excellent control and power. Perfect for serious players.",
    images: [{
      filename: "wilsontennis",
      url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 8999,
    originalPrice: 11999,
    stock: 15,
    brand: "Wilson",
    category: "Sports"
  },
  {
    name: "The Alchemist by Paulo Coelho",
    description: "Bestselling novel about following your dreams. A must-read for personal development.",
    images: [{
      filename: "alchemist",
      url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 299,
    originalPrice: 399,
    stock: 50,
    brand: "HarperCollins",
    category: "Books"
  },
  {
    name: "Atomic Habits by James Clear",
    description: "Transform your life with tiny changes that lead to remarkable results.",
    images: [{
      filename: "atomichabits",
      url: "https://images.unsplash.com/photo-1543002584-b014baeb5235?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 399,
    originalPrice: 499,
    stock: 40,
    brand: "Penguin",
    category: "Books"
  },
  {
    name: "L'Oreal Paris Skincare Set",
    description: "Complete skincare routine with cleanser, toner, and moisturizer. Suitable for all skin types.",
    images: [{
      filename: "loreal",
      url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 1499,
    originalPrice: 1999,
    stock: 30,
    brand: "L'Oreal",
    category: "Beauty & Health"
  },
  {
    name: "Dyson Airwrap Multi-styler",
    description: "Revolutionary hair styling tool that dries, styles, and shapes hair with no extreme heat.",
    images: [{
      filename: "dysonairwrap",
      url: "https://images.unsplash.com/photo-1522338140269-f46f5913618a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 39999,
    originalPrice: 44999,
    stock: 8,
    brand: "Dyson",
    category: "Beauty & Health"
  },
  {
    name: "LEGO Star Wars Millennium Falcon",
    description: "Detailed LEGO set with 1,329 pieces. Perfect for Star Wars fans and collectors.",
    images: [{
      filename: "legomillennium",
      url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 8999,
    originalPrice: 11999,
    stock: 5,
    brand: "LEGO",
    category: "Toys & Games"
  },
  {
    name: "Nintendo Switch OLED",
    description: "Latest Nintendo Switch with 7-inch OLED screen. Perfect for gaming on the go.",
    images: [{
      filename: "nintendoswitch",
      url: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 24999,
    originalPrice: 29999,
    stock: 10,
    brand: "Nintendo",
    category: "Toys & Games"
  },
  {
    name: "Car Dashboard Camera",
    description: "1080p HD dash cam with night vision and loop recording. Essential for road safety.",
    images: [{
      filename: "dashcam",
      url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 3999,
    originalPrice: 4999,
    stock: 22,
    brand: "Garmin",
    category: "Automotive"
  },
  {
    name: "Car Phone Mount",
    description: "Universal car phone holder with suction cup mount. Perfect for navigation and hands-free calls.",
    images: [{
      filename: "carmount",
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 999,
    originalPrice: 1499,
    stock: 45,
    brand: "iOttie",
    category: "Automotive"
  },
  {
    name: "Diamond Stud Earrings",
    description: "Classic diamond stud earrings in 14k white gold. Perfect for special occasions.",
    images: [{
      filename: "diamondearrings",
      url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 29999,
    originalPrice: 39999,
    stock: 3,
    brand: "Tiffany & Co.",
    category: "Jewelry"
  },
  {
    name: "Gold Chain Necklace",
    description: "Elegant 18k gold chain necklace. Timeless piece for any occasion.",
    images: [{
      filename: "goldnecklace",
      url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 15999,
    originalPrice: 19999,
    stock: 7,
    brand: "Cartier",
    category: "Jewelry"
  },
  {
    name: "Pet Food Bowl Set",
    description: "Stainless steel pet bowls with non-slip base. Perfect for cats and dogs.",
    images: [{
      filename: "petbowls",
      url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 899,
    originalPrice: 1299,
    stock: 40,
    brand: "PetSafe",
    category: "Pet Supplies"
  },
  {
    name: "Pet GPS Tracker",
    description: "GPS tracking collar for pets. Never lose your furry friend again.",
    images: [{
      filename: "petgps",
      url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 2999,
    originalPrice: 3999,
    stock: 15,
    brand: "Whistle",
    category: "Pet Supplies"
  },
  {
    name: "Wireless Bluetooth Mouse",
    description: "Ergonomic wireless mouse with precision tracking. Compatible with all devices.",
    images: [{
      filename: "bluetoothmouse",
      url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 1299,
    originalPrice: 1799,
    stock: 35,
    brand: "Logitech",
    category: "Office Supplies"
  },
  {
    name: "Ergonomic Office Chair",
    description: "Comfortable office chair with lumbar support. Perfect for long work hours.",
    images: [{
      filename: "officechair",
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 8999,
    originalPrice: 12999,
    stock: 12,
    brand: "Herman Miller",
    category: "Office Supplies"
  },
  {
    name: "Baby Monitor with Camera",
    description: "HD video baby monitor with night vision and two-way audio. Peace of mind for parents.",
    images: [{
      filename: "babymonitor",
      url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 5999,
    originalPrice: 7999,
    stock: 15,
    brand: "Motorola",
    category: "Baby Products"
  },
  {
    name: "Baby Stroller Travel System",
    description: "Complete travel system with stroller, car seat, and base. Perfect for newborns to toddlers.",
    images: [{
      filename: "babystroller",
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    }],
    price: 19999,
    originalPrice: 24999,
    stock: 8,
    brand: "Graco",
    category: "Baby Products"
  }
];

module.exports = { data: sampleProducts };