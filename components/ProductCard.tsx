import React from 'react';
import { Check } from 'lucide-react';
import { Product } from '../types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card className="group relative overflow-hidden border-cement hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 flex flex-col h-full bg-charcoal/50 backdrop-blur">
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-cement to-charcoal relative">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-75 group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="backdrop-blur-md bg-white/90 text-obsidian border-0 shadow-lg">
            {product.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="flex-1 flex flex-col p-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors font-serif">
            {product.title}
          </h3>
          <p className="text-sm text-mist/90 line-clamp-3 mb-4 leading-relaxed">
            {product.description}
          </p>
          <ul className="space-y-2">
            {product.features.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between p-6 pt-0">
        <span className="text-2xl font-bold text-white font-serif">${product.price.toFixed(2)}</span>
        <Button 
          onClick={() => onAddToCart(product)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;