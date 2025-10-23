import type { Product } from './types.ts';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Aura Smart Lamp',
    category: 'Lighting',
    price: 129.99,
    description: 'The Aura Smart Lamp is a fusion of nature and technology. Crafted from sustainably sourced wood, it features customizable light colors and brightness, controllable via voice command or our mobile app. Its minimalist design complements any modern living space.',
    shortDescription: 'A minimalist smart lamp with customizable lighting.',
    images: {
      default: 'https://i.ibb.co/R4DVjb5Z/New-Design.png',
      thumbnails: ['https://i.ibb.co/R4DVjb5Z/New-Design.png', 'https://i.ibb.co/G4R2FgTw/Modern-Wooden-Lamp-Illuminating-A-Minimalist-Office-Desk.png', 'https://i.ibb.co/bMqGWTVM/Modern-Wooden-Lamp-Illuminating-A-Minimalist-Office-Desk-1.png'],
      variants: {
        'Oak': 'https://i.ibb.co/R4DVjb5Z/New-Design.png',
        'Walnut': 'https://i.ibb.co/G4R2FgTw/Modern-Wooden-Lamp-Illuminating-A-Minimalist-Office-Desk.png',
        'Birch': 'https://i.ibb.co/bMqGWTVM/Modern-Wooden-Lamp-Illuminating-A-Minimalist-Office-Desk-1.png',
      },
    },
    material: 'Recycled Wood',
    smartFeatures: ['Wi-Fi Enabled', 'Voice Controlled', 'App Controlled'],
    sustainabilityImpact: 'Made from 100% certified recycled wood, reducing deforestation. Packaged in biodegradable materials. For every lamp sold, we plant a tree.',
    specifications: {
      'Dimensions': '15" H x 7" W',
      'Weight': '2.5 lbs',
      'Connectivity': 'Wi-Fi, Bluetooth 5.0',
      'Power': '12W LED, 50,000 hour lifespan',
    },
  },
  {
    id: 2,
    name: 'Terra Smart Shelf',
    category: 'Smart Shelves',
    price: 249.99,
    description: 'A floating shelf that does more. The Terra Smart Shelf features integrated wireless charging for your devices and ambient under-lighting. Made from a durable bioplastic composite, it is both stylish and eco-conscious.',
    shortDescription: 'A floating shelf with wireless charging.',
    images: {
      default: 'https://i.ibb.co/4ZXY0rFr/Modern-Wall-Mounted-Light-Fixture-With-Minimalist-Design-1.png',
      thumbnails: ['https://i.ibb.co/tMMxGsBq/Modern-Wall-Mounted-Light-Fixture-With-Minimalist-Design.png', 'https://i.im.ge/2025/10/22/nZX3bq.DeWatermark-ai-1761062953712.jpeg', 'https://i.im.ge/2025/10/22/nZXYBp.DeWatermark-ai-1761063037831.jpeg'],
      variants: {
        'Matte Black': 'https://i.ibb.co/tMMxGsBq/Modern-Wall-Mounted-Light-Fixture-With-Minimalist-Design.png',
        'Stone Gray': 'https://i.im.ge/2025/10/22/nZX3bq.DeWatermark-ai-1761062953712.jpeg',
        'Forest Green': 'https://i.im.ge/2025/10/22/nZXYBp.DeWatermark-ai-1761063037831.jpeg',
      },
    },
    material: 'Bioplastic',
    smartFeatures: ['Wireless Charging', 'Ambient Lighting'],
    sustainabilityImpact: 'Constructed from a plant-based bioplastic, reducing reliance on fossil fuels. The LED lighting is energy-efficient, consuming 80% less power than traditional bulbs.',
    specifications: {
      'Dimensions': '24" L x 10" D x 2" H',
      'Weight Capacity': '20 lbs',
      'Charging Output': '15W Qi-compatible',
      'Lighting': 'Dimmable RGBW LED strip',
    },
  },
  {
    id: 3,
    name: 'Oasis Smart Planter',
    category: 'Smart Planters',
    price: 89.99,
    description: 'Keep your plants happy and healthy with the Oasis Smart Planter. It automatically waters your plants based on their specific needs and provides data on soil moisture and light levels directly to your phone. Made from recycled ocean plastics.',
    shortDescription: 'Self-watering planter with smart sensors.',
    images: {
      default: 'https://i.ibb.co/d0GmDgF5/Off-White-Ceramic-Planter-With-Engraved-Brand-Name-OASIS.png',
      thumbnails: [
        'https://i.ibb.co/d0GmDgF5/Off-White-Ceramic-Planter-With-Engraved-Brand-Name-OASIS.png',
        'https://i.ibb.co/svVtcB5S/Off-White-Ceramic-Planter-With-Engraved-Brand-Name-OASIS-1.png',
        'https://i.ibb.co/5grcHhMr/Terracotta-Planter-With-Elegant-Embossed-Oasis-Design.png'
      ],
      variants: {
        'White': 'https://i.ibb.co/d0GmDgF5/Off-White-Ceramic-Planter-With-Engraved-Brand-Name-OASIS.png',
        'Charcoal': 'https://i.ibb.co/svVtcB5S/Off-White-Ceramic-Planter-With-Engraved-Brand-Name-OASIS-1.png',
        'Terracotta': 'https://i.ibb.co/5grcHhMr/Terracotta-Planter-With-Elegant-Embossed-Oasis-Design.png',
      },
    },
    material: 'Recycled Ocean Plastic',
    smartFeatures: ['Self-Watering', 'Soil Sensors', 'App Controlled'],
    sustainabilityImpact: 'Each planter is made from 2 lbs of plastic waste removed from our oceans. The self-watering system conserves water by up to 50% compared to manual watering.',
    specifications: {
      'Dimensions': '8" H x 7" Diameter',
      'Water Reservoir': '1 Liter',
      'Connectivity': 'Bluetooth 5.0',
      'Battery Life': '6 months on a single charge',
    },
  },
  {
    id: 4,
    name: 'Canva Digital Art Frame',
    category: 'Decor',
    price: 399.99,
    description: 'Display timeless art or personal photos on a stunning, matte-finish digital screen. The Canva frame adjusts its brightness to match the room, making digital art look indistinguishable from a real canvas. The frame is made from reclaimed timber.',
    shortDescription: 'A smart frame for digital art and photos.',
    images: {
      default: 'https://i.ibb.co/sdZYGbRB/Framed-Abstract-Painting-With-Vibrant-Colors-On-Display.png',
      thumbnails: ['https://i.ibb.co/sdZYGbRB/Framed-Abstract-Painting-With-Vibrant-Colors-On-Display.png', 'https://i.im.ge/2025/10/22/nZXcaP.wmremove-transformed.png', 'https://i.im.ge/2025/10/22/nZXgA1.DeWatermark-ai-1761062229646.jpeg'],
      variants: {
        'Light Oak': 'https://i.ibb.co/sdZYGbRB/Framed-Abstract-Painting-With-Vibrant-Colors-On-Display.png',
        'Dark Walnut': 'https://i.im.ge/2025/10/22/nZXcaP.wmremove-transformed.png',
        'Black': 'https://i.im.ge/2025/10/22/nZXgA1.DeWatermark-ai-1761062229646.jpeg',
      },
    },
    material: 'Reclaimed Timber',
    smartFeatures: ['Wi-Fi Enabled', 'App Controlled', 'Ambient Light Sensor'],
    sustainabilityImpact: 'The frame is crafted from timber reclaimed from old buildings, giving new life to beautiful wood. The low-power display is ENERGY STAR certified.',
    specifications: {
      'Dimensions': '16" x 24" Screen',
      'Resolution': '1920 x 1080',
      'Storage': '8GB internal',
      'Connectivity': 'Wi-Fi',
    },
  },
];