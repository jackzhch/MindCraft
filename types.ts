export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'System' | 'Template' | 'Guide';
  image: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
