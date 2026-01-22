import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-charcoal rounded-xl overflow-hidden border border-cement hover:border-accent/50 transition-all duration-300 flex flex-col h-full">
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-cement to-charcoal relative">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-obsidian text-xs font-medium rounded-full shadow-lg">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-gray-300/90 line-clamp-3 mb-4 leading-relaxed">
            {product.description}
          </p>
          <ul className="space-y-1.5 mb-4">
            {product.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
