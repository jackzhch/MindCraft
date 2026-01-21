import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-charcoal rounded-xl overflow-hidden border border-cement hover:border-accent/50 transition-all duration-300 flex flex-col h-full">
      <div className="aspect-[4/3] overflow-hidden bg-cement relative">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-obsidian uppercase bg-white/90 backdrop-blur rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-mist line-clamp-3 mb-4">
            {product.description}
          </p>
          <ul className="space-y-1 mb-6">
            {product.features.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-center text-xs text-gray-500">
                <svg className="w-3 h-3 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {feat}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-cement">
          <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="px-4 py-2 bg-cement text-white text-sm font-medium rounded-lg hover:bg-accent hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-charcoal"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;