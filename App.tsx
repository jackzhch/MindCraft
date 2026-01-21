import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import GeminiAssistant from './components/GeminiAssistant';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCompleteOrder = () => {
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-obsidian text-paper font-sans selection:bg-accent selection:text-white">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="products">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold font-serif text-white mb-2">Curated Tools</h2>
              <p className="text-mist">Digital artifacts to enhance your cognition.</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-2">
               <span className="px-3 py-1 bg-cement rounded text-xs text-mist uppercase tracking-wide">All</span>
               <span className="px-3 py-1 hover:bg-cement rounded text-xs text-gray-500 uppercase tracking-wide cursor-pointer transition-colors">Systems</span>
               <span className="px-3 py-1 hover:bg-cement rounded text-xs text-gray-500 uppercase tracking-wide cursor-pointer transition-colors">Guides</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        <section className="bg-charcoal border-t border-cement py-24 mt-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">Join the Intelligent Few</h2>
            <p className="text-mist mb-8 leading-relaxed">
              We are building a community of thinkers who value clarity over chaos. 
              Subscribe to our newsletter for weekly insights on knowledge management and mental models.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-obsidian border border-cement text-white rounded-lg px-4 py-3 focus:outline-none focus:border-accent"
              />
              <button className="bg-white text-obsidian font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-obsidian border-t border-cement py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} MindCraft Digital. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-mist">Privacy</a>
            <a href="#" className="hover:text-mist">Terms</a>
            <a href="#" className="hover:text-mist">Support</a>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleOpenCheckout}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onComplete={handleCompleteOrder}
      />

      <GeminiAssistant />
    </div>
  );
};

export default App;