export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'System' | 'Template' | 'Guide';
  image: string;
  features: string[];
}

export interface Bundle {
  id: string;
  title: string;
  description: string;
  productIds: string[];
  price: number;
  originalPrice: number;
  savings: number;
  image: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
  isBundle?: boolean;
  bundleId?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
}
