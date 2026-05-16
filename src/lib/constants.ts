
export type Category = 'POSTER' | 'POLAROID' | 'TSHIRT' | 'FRAME' | 'MAGAZINE';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  image: string;
  images?: string[]; // Multiple images for gallery
  sizes?: string[];
  variants?: string[];
  options?: string[];
  priceMap?: Record<string, number>;
}

// PRODUCTS CONFIGURATION
// To change product images: Replace the 'image' URL with your own link (e.g. from postimages.org or unsplash)
// To add new products: Copy a product object and give it a unique 'id'
export const PRODUCTS: Product[] = [
  {
    id: 'single-poster',
    name: 'SINGLE WALL POSTER',
    category: 'POSTER',
    description: 'A single custom-printed wall poster. High-resolution finish.',
    price: 49,
    image: '/poster/main.jpg',
    images: [
      '/poster/sevem.jpg',
      '/poster/own.jpg',
      '/mag/sizechart.png'
    ],
    sizes: ['A5', 'A4', 'A3'],
    priceMap: {
      'A5': 49,
      'A4': 69,
      'A3': 99
    }
  },
  {
    id: 'poster-pack-3',
    name: '3 WALL POSTER PACK',
    category: 'POSTER',
    description: 'A curated set of 3 custom wall posters. High-quality print.',
    price: 99,
    image: '/poster/five.jpg',
    images: [
      '/poster/five.jpg',
      '/poster/own.jpg',
      '/mag/sizechart.png'
    ],
    sizes: ['A5', 'A4', 'A3'],
    priceMap: {
      'A5': 99,
      'A4': 149,
      'A3': 199
    }
  },
  {
    id: 'poster-pack-5',
    name: '5 WALL POSTER PACK',
    category: 'POSTER',
    description: 'A curated set of 5 custom wall posters. Perfect for wall galleries.',
    price: 199,
    image: '/poster/four.jpg',
    images: [
      '/poster/four.jpg',
      '/poster/own.jpg',
      '/mag/sizechart.png'
    ],
    sizes: ['A5', 'A4', 'A3'],
    priceMap: {
      'A5': 199,
      'A4': 299,
      'A3': 399
    }
  },
  {
    id: 'poster-pack-10',
    name: '10 WALL POSTER PACK',
    category: 'POSTER',
    description: 'Massive collection of 10 custom wall posters for enthusiasts.',
    price: 299,
    image: '/poster/three.jpg',
    images: [
      '/poster/three.jpg',
      '/poster/own.jpg',
      '/mag/sizechart.png'
    ],
    sizes: ['A5', 'A4'],
    priceMap: {
      'A5': 299,
      'A4': 499
    }
  },
  {
    id: 'poster-pack-15',
    name: '15 WALL POSTER PACK',
    category: 'POSTER',
    description: 'The ultimate 15 custom wall poster collection for serious collectors.',
    price: 399,
    image: '/poster/one.jpg',
    images: [
      '/poster/one.jpg',
      '/poster/own.jpg',
      '/mag/sizechart.png'
    ],
    sizes: ['A5', 'A4'],
    priceMap: {
      'A5': 399,
      'A4': 599
    }
  },
  {
    id: 'magazine-prints',
    name: 'CUSTOM MAGAZINE PRINTS',
    category: 'MAGAZINE',
    description: 'Your life, printed as a custom luxury magazine.',
    price: 299,
    image: '/mag/lve.jpg',
    images: [
      '/mag/main.jpg',
      '/mag/pall.png',
      '/mag/real.jpg'
    ],
    options: ['4 Pages', '8 Pages', '12 Pages'],
    priceMap: {
      '4 Pages': 299,
      '8 Pages': 449,
      '12 Pages': 599
    }
  },
  {
    id: 'polaroid-prints',
    name: 'CUSTOM POLAROID PRINTS',
    category: 'POLAROID',
    description: 'Classic custom polaroid style prints of your favorite photos.',
    price: 150,
    image: '/polaroid/sample.png',
    images: [
      '/polaroid/maine.jpg',
      '/polaroid/custom.jpg',
      '/polaroid/sizechart.jpg'
    ],
    options: ['10 Photos', '15 Photos', '20 Photos', '30 Photos'],
    priceMap: {
      '10 Photos': 150,
      '15 Photos': 200,
      '20 Photos': 229,
      '30 Photos': 399
    }
  },
  {
    id: 'classic-frames',
    name: 'CUSTOM CLASSIC FRAMES',
    category: 'FRAME',
    description: 'High-quality custom frames to preserve your memories.',
    price: 299,
    image: '/frame/out.jpg',
    images: [
      '/frame/main.jpg',
      '/frame/black.png',
      '/frame/chart.jpg'

    ],
    sizes: ['A5 Frame', 'A4 Frame', 'A3 Frame'],
    priceMap: {
      'A5 Frame': 299,
      'A4 Frame': 499,
      'A3 Frame': 699
    }
  },
  {
    id: 'couple tshirt',
    name: 'ONLY YOU T-SHIRT',
    category: 'TSHIRT',
    description: 'Choose your fit and finish: Normal, Oversized or Acid Washed. Available in multiple sizes. Coordinate design via WhatsApp.',
    price: 499,
    image: '/t shirt/couple/only.jpg',
    images: [
      '/t shirt/couple/only.jpg',
      '/t shirt/over.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: ['Normal', 'Oversized', 'Acid Washed'],
    priceMap: {
      'Normal': 499,
      'Oversized': 599,
      'Acid Washed': 699
    }
  },
  {
    id: 'custom-tshirt-normal',
    name: 'NORMAL CUSTOM T-SHIRT',
    category: 'TSHIRT',
    description: 'Premium heavy cotton t-shirt with your custom design. Coordinate design via WhatsApp.',
    price: 499,
    image: '/t shirt/normal/main.png',
    images: [
      '/t shirt/normal/main.png',
      '/t shirt/normal.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']

  },
  {
    id: 'spider man t-shirt',
    name: 'SPIDER MAN T-SHIRT',
    category: 'TSHIRT',
    description: 'Premium heavy cotton t-shirt with your custom design. Coordinate design via WhatsApp.',
    price: 699,
    image: '/t shirt/spider/Artboard 2.png',
    images: [
      '/t shirt/spider/Artboard 1.png',
      '/t shirt/spider/Artboard 2.png',
      '/t shirt/over.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'custom-tshirt-oversized',
    name: 'OVERSIZED CUSTOM T-SHIRT',
    category: 'TSHIRT',
    description: 'Relaxed fit heavyweight cotton tee with your custom design. Coordinate design via WhatsApp.',
    price: 599,
    image: '/t shirt/over/single.png',
    images: [
      '/t shirt/over/see.png',
      '/t shirt/over/single.png',
      '/t shirt/over.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'custom-tshirt-acidwashed',
    name: 'ACID WASHED CUSTOM T-SHIRT',
    category: 'TSHIRT',
    description: 'Vintage finish acid washed premium tee with your custom design. Coordinate design via WhatsApp.',
    price: 699,
    image: '/t shirt/acid/one.png',
    images: [
      '/t shirt/acid/one.png',
      '/t shirt/acid/acid3.jpg',
      '/t shirt/over.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  }
];

export const CATEGORIES = [
  { id: 'POSTER', label: 'Wall Posters', image: '/frame/wallposter.jpg' },
  { id: 'POLAROID', label: 'Polaroids', image: '/polaroid/mainp.jpg' },
  { id: 'TSHIRT', label: 'T-Shirts', image: '/t shirt/maint.jpg' },
  { id: 'FRAME', label: 'Frames', image: '/frame/framesss.jpg' },
  { id: 'MAGAZINE', label: 'Magazines', image: '/public/mag.jpg' },
];
