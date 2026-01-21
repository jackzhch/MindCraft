import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, onComplete }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setFormData({ email: '', name: '', cardNumber: '', expiry: '', cvc: '' });
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate network request to Stripe
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStep('success');
    
    // Close after showing success message
    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={step !== 'processing' && step !== 'success' ? onClose : undefined}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-charcoal text-left shadow-2xl transition-all sm:my-8 w-full max-w-4xl border border-cement flex flex-col md:flex-row">
          
          {/* Order Summary (Left/Top) */}
          <div className="bg-obsidian/50 p-6 md:p-8 md:w-5/12 border-b md:border-b-0 md:border-r border-cement">
            <h3 className="text-lg font-serif font-bold text-white mb-6">Order Summary</h3>
            <div className="space-y-4 max-h-60 md:max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-cement bg-cement">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover opacity-80" />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <h4 className="text-sm font-medium text-white line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-mist">{item.category}</p>
                    <p className="text-sm font-medium text-accent mt-1">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-cement space-y-2">
              <div className="flex justify-between text-sm text-mist">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-mist">
                <span>Taxes</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form (Right/Bottom) */}
          <div className="p-6 md:p-8 md:w-7/12 bg-charcoal relative min-h-[500px] flex flex-col">
            <button 
              onClick={onClose}
              disabled={step !== 'form'}
              className="absolute top-4 right-4 text-mist hover:text-white disabled:opacity-0 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {step === 'form' && (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col animate-in fade-in duration-300">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-1">Payment Details</h3>
                  <p className="text-sm text-mist">Complete your purchase securely.</p>
                </div>

                <div className="space-y-5 flex-1">
                  <div>
                    <label className="block text-xs font-medium text-mist uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-cement border border-transparent focus:border-accent rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-mist uppercase tracking-wider mb-2">Card Information</label>
                    <div className="bg-cement rounded-lg border border-transparent focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all overflow-hidden">
                      <div className="flex items-center px-4 py-3 border-b border-white/5">
                        <svg className="w-5 h-5 text-mist mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                        <input 
                          type="text" 
                          name="cardNumber"
                          required
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 p-0"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      <div className="flex divide-x divide-white/5">
                        <input 
                          type="text" 
                          name="expiry"
                          required
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className="w-1/2 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 px-4 py-3"
                          placeholder="MM / YY"
                        />
                        <input 
                          type="text" 
                          name="cvc"
                          required
                          value={formData.cvc}
                          onChange={handleInputChange}
                          className="w-1/2 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 px-4 py-3"
                          placeholder="CVC"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-mist uppercase tracking-wider mb-2">Name on Card</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-cement border border-transparent focus:border-accent rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                      placeholder="Full Name"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <button 
                    type="submit"
                    className="w-full bg-accent hover:bg-purple-500 text-white font-bold py-4 rounded-lg shadow-lg shadow-accent/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>Pay ${total.toFixed(2)}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </button>
                  <div className="mt-4 flex items-center justify-center text-xs text-gray-500 gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                    <span>Payments processed securely via Stripe</span>
                  </div>
                </div>
              </form>
            )}

            {step === 'processing' && (
              <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-cement"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">Processing Payment</h3>
                <p className="mt-2 text-mist">Securely communicating with bank...</p>
              </div>
            )}

            {step === 'success' && (
              <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/20 mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">Payment Successful</h3>
                <p className="mt-2 text-mist max-w-xs mx-auto">
                  Your digital assets have been sent to <span className="text-accent">{formData.email}</span>.
                </p>
                <div className="mt-8 p-4 bg-obsidian/50 rounded-lg border border-cement w-full max-w-xs">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Transaction ID</p>
                  <p className="text-sm font-mono text-white">tx_{Math.random().toString(36).substr(2, 9)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;