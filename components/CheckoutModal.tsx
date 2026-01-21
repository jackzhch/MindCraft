import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { redirectToCheckout, isStripeConfigured } from '../services/stripeService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, onComplete }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'error'>('form');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const stripeEnabled = isStripeConfigured();

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setEmail('');
      setErrorMessage('');
    }
  }, [isOpen]);

  const handleStripeCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setErrorMessage('');

    try {
      await redirectToCheckout({
        items,
        customerEmail: email || undefined,
      });
      // User will be redirected to Stripe Checkout
      // When they return, handle success/cancel via URL params in App.tsx
    } catch (error: any) {
      console.error('Checkout error:', error);
      setErrorMessage(error.message || 'Failed to start checkout. Please try again.');
      setStep('error');
    }
  };

  const handleDemoCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Close and complete
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={step !== 'processing' ? onClose : undefined}
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
                    <p className="text-xs text-mist">{item.category} × {item.quantity}</p>
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
              disabled={step === 'processing'}
              className="absolute top-4 right-4 text-mist hover:text-white disabled:opacity-0 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {step === 'form' && (
              <form onSubmit={stripeEnabled ? handleStripeCheckout : handleDemoCheckout} className="flex-1 flex flex-col animate-in fade-in duration-300">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {stripeEnabled ? 'Secure Checkout' : 'Demo Checkout'}
                  </h3>
                  <p className="text-sm text-mist">
                    {stripeEnabled 
                      ? 'You will be redirected to Stripe for secure payment.' 
                      : 'Stripe is not configured. This is a demo checkout.'}
                  </p>
                </div>

                <div className="space-y-5 flex-1">
                  <div>
                    <label className="block text-xs font-medium text-mist uppercase tracking-wider mb-2">
                      Email Address {stripeEnabled && <span className="text-accent">*</span>}
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      required={stripeEnabled}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-cement border border-transparent focus:border-accent rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                      placeholder="you@example.com"
                    />
                    <p className="mt-2 text-xs text-mist">
                      Your digital products will be sent to this email address.
                    </p>
                  </div>

                  {!stripeEnabled && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex gap-3">
                        <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-amber-500">Demo Mode</p>
                          <p className="text-xs text-amber-500/80 mt-1">
                            To enable real payments, add your Stripe keys to the environment variables.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <button 
                    type="submit"
                    disabled={stripeEnabled && !email}
                    className="w-full bg-accent hover:bg-purple-500 text-white font-bold py-4 rounded-lg shadow-lg shadow-accent/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{stripeEnabled ? 'Proceed to Payment' : `Demo Pay $${total.toFixed(2)}`}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </button>
                  {stripeEnabled && (
                    <div className="mt-4 flex items-center justify-center text-xs text-gray-500 gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                      <span>Secure payment powered by Stripe</span>
                    </div>
                  )}
                </div>
              </form>
            )}

            {step === 'processing' && (
              <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-cement"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">
                  {stripeEnabled ? 'Redirecting to Stripe...' : 'Processing...'}
                </h3>
                <p className="mt-2 text-mist">Please wait a moment</p>
              </div>
            )}

            {step === 'error' && (
              <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 text-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/20 mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">Payment Error</h3>
                <p className="mt-2 text-mist max-w-xs mx-auto">
                  {errorMessage}
                </p>
                <button 
                  onClick={() => setStep('form')}
                  className="mt-6 bg-accent hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
