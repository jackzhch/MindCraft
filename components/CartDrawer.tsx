import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />
      
      <div className={`absolute inset-y-0 right-0 max-w-md w-full flex transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex-1 flex flex-col bg-charcoal border-l border-cement shadow-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-cement">
            <h2 className="text-lg font-bold text-white font-serif">Your Tools</h2>
            <button onClick={onClose} className="text-mist hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <svg className="w-16 h-16 text-cement mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                <p className="text-mist text-lg">Your cart is empty.</p>
                <p className="text-gray-600 text-sm mt-2">Start building your system.</p>
                <button 
                  onClick={onClose}
                  className="mt-6 px-6 py-2 bg-cement text-white rounded-full text-sm hover:bg-white hover:text-obsidian transition-colors"
                >
                  Browse Store
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex py-2">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-cement">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-white">
                          <h3>{item.title}</h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-cement rounded bg-obsidian">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-2 py-1 text-mist hover:text-white">-</button>
                          <span className="px-2 text-white">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-2 py-1 text-mist hover:text-white">+</button>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => onRemove(item.id)}
                          className="font-medium text-accent hover:text-purple-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-cement px-6 py-6 bg-obsidian/50">
              <div className="flex justify-between text-base font-medium text-white mb-4">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 mb-6">Digital delivery via email immediately after purchase.</p>
              <button 
                onClick={onCheckout}
                className="w-full flex items-center justify-center rounded-lg border border-transparent bg-white px-6 py-3 text-base font-bold text-obsidian shadow-sm hover:bg-gray-200 transition-colors"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;