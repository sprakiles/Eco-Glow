
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  shortDescription: string;
  images: {
    default: string;
    thumbnails: string[];
    variants: Record<string, string>; // e.g. { 'Oak': 'url', 'Walnut': 'url' }
  };
  material: string;
  smartFeatures: string[];
  sustainabilityImpact: string;
  specifications: Record<string, string>;
}

export type Page = 'home' | 'products' | 'productDetail' | 'about' | 'checkout';

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: string;
}
