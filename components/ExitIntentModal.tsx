import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ExitIntentModalProps {
  onClose: () => void;
}

const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Store the email and discount code in localStorage
      localStorage.setItem('exitIntentEmail', email);
      localStorage.setItem('discountCode', 'STAY20');
      setIsSubmitted(true);
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  const handleClose = () => {
    // Mark that user has seen the exit intent
    localStorage.setItem('exitIntentShown', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-obsidian to-charcoal border-2 border-purple-500 rounded-2xl max-w-lg w-full p-8 shadow-2xl shadow-purple-500/25 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSubmitted ? (
          <>
            {/* Emoji */}
            <div className="text-center mb-4">
              <span className="text-6xl" role="img" aria-label="wait">⏰</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-serif font-bold text-white text-center mb-4">
              Wait! Don't Leave Empty-Handed
            </h2>

            {/* Subtitle */}
            <p className="text-gray-300 text-center mb-6 leading-relaxed">
              Get <span className="text-purple-400 font-bold text-2xl">20% OFF</span> your first purchase + exclusive productivity tips delivered weekly.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-6 bg-cement/30 rounded-lg p-4">
              {[
                'Instant 20% discount code',
                'Free productivity guide ($19 value)',
                'Weekly insider tips & strategies',
                'Early access to new releases'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-200">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="exit-email" className="sr-only">Email address</label>
                <input
                  id="exit-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-obsidian border border-cement rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
              >
                🎁 Claim My 20% Discount
              </button>
              
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    const productsSection = document.getElementById('products');
                    if (productsSection) {
                      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
                className="w-full bg-transparent border-2 border-purple-500 hover:bg-purple-500/10 text-white font-bold py-4 px-6 rounded-lg transition-all"
              >
                {t.about.ctaButton}
              </button>
            </form>

            {/* Trust Line */}
            <p className="text-xs text-gray-400 text-center mt-4">
              🔒 We respect your privacy. Unsubscribe anytime. No spam, ever.
            </p>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="text-center py-8">
              <div className="mb-4">
                <svg className="w-20 h-20 text-green-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                🎉 You're In!
              </h3>
              
              <div className="bg-purple-500/20 border border-purple-500 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-300 mb-2">Your discount code:</p>
                <p className="text-3xl font-bold text-purple-400 font-mono tracking-wider">
                  STAY20
                </p>
              </div>
              
              <p className="text-gray-300 mb-4">
                Check your email for the code and free guide!
              </p>
              
              <p className="text-sm text-gray-400">
                Apply at checkout to save 20% 🎁
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExitIntentModal;

