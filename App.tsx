import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import GeminiAssistant from './components/GeminiAssistant';
import AuthModal from './components/AuthModal';
import PurchaseHistory from './components/PurchaseHistory';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

const AppContent: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showCancelMessage, setShowCancelMessage] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [subscribeEmail, setSubscribeEmail] = useState('');

  // Handle Stripe redirect responses
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');

    if (success === 'true') {
      setShowSuccessMessage(true);
      setCartItems([]);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }

    if (canceled === 'true') {
      setShowCancelMessage(true);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      setTimeout(() => {
        setShowCancelMessage(false);
      }, 5000);
    }
  }, []);

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

  // Check URL hash for purchases
  useEffect(() => {
    if (window.location.hash === '#purchases') {
      setShowPurchaseHistory(true);
    }
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(product => product.category === selectedCategory);

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeEmail) {
      // TODO: Implement actual newsletter subscription (e.g., via API)
      alert(`Thank you for subscribing with ${subscribeEmail}!`);
      setSubscribeEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-paper font-sans selection:bg-accent selection:text-white">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onAuthClick={() => setIsAuthModalOpen(true)}
        onPurchasesClick={() => setShowPurchaseHistory(true)}
      />
      
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 max-w-md bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl animate-in slide-in-from-top-5 fade-in duration-300">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-bold text-lg">Payment Successful!</h4>
              <p className="text-sm mt-1 text-green-100">Your order has been confirmed. Check your email for details.</p>
            </div>
            <button onClick={() => setShowSuccessMessage(false)} className="ml-auto text-white/80 hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Cancel Message */}
      {showCancelMessage && (
        <div className="fixed top-4 right-4 z-50 max-w-md bg-amber-500 text-white px-6 py-4 rounded-lg shadow-2xl animate-in slide-in-from-top-5 fade-in duration-300">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-bold text-lg">Checkout Canceled</h4>
              <p className="text-sm mt-1 text-amber-100">No charges were made. Your cart is still available.</p>
            </div>
            <button onClick={() => setShowCancelMessage(false)} className="ml-auto text-white/80 hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
          </div>
        </div>
      )}
      
      <main>
        {showPurchaseHistory ? (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <button
              onClick={() => {
                setShowPurchaseHistory(false);
                window.history.replaceState({}, document.title, window.location.pathname);
              }}
              className="mb-6 text-purple-400 hover:text-purple-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Shop
            </button>
            <PurchaseHistory />
          </section>
        ) : (
          <>
            <Hero />
        
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="products">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold font-serif text-white mb-2">Curated Tools</h2>
              <p className="text-mist">Digital artifacts to enhance your cognition.</p>
            </div>
            
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mt-4 md:mt-0">
              <TabsList className="bg-cement/50 backdrop-blur">
                <TabsTrigger value="All" className="text-xs uppercase tracking-wide">All</TabsTrigger>
                <TabsTrigger value="System" className="text-xs uppercase tracking-wide">Systems</TabsTrigger>
                <TabsTrigger value="Template" className="text-xs uppercase tracking-wide">Templates</TabsTrigger>
                <TabsTrigger value="Guide" className="text-xs uppercase tracking-wide">Guides</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p className="text-center text-mist mt-8">No products found in this category.</p>
          )}
        </section>

        <section className="bg-charcoal border-t border-cement py-24 mt-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">Join the Intelligent Few</h2>
            <p className="text-mist mb-8 leading-relaxed">
              We are building a community of thinkers who value clarity over chaos. 
              Subscribe to our newsletter for weekly insights on knowledge management and mental models.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email" 
                placeholder="Enter your email" 
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                required
                className="flex-1 bg-obsidian border-cement"
              />
              <Button type="submit" variant="secondary" className="bg-white text-obsidian font-bold hover:bg-gray-200">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
          </>
        )}
      </main>

      <footer className="bg-obsidian border-t border-cement py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} MindsCraft Digital. All rights reserved.</p>
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
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;