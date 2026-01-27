import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface HeroProps {
  onManifestoClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onManifestoClick }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('email_subscribers')
        .insert([
          {
            email: email.toLowerCase().trim(),
            source: 'hero_insights',
            metadata: {
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
            }
          }
        ]);

      if (error) {
        // Check if email already exists
        if (error.code === '23505') {
          setMessage({ type: 'error', text: 'This email is already subscribed!' });
        } else {
          throw error;
        }
      } else {
        setMessage({ type: 'success', text: 'Success! Check your email for insights.' });
        setEmail('');
      }
    } catch (error) {
      console.error('Error subscribing email:', error);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight tracking-tight">
          Build Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">
            Second Brain
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 leading-relaxed">
          Battle-tested systems for knowledge workers who refuse to drown in information. 
          <span className="block mt-2 text-purple-400 font-semibold">Think clearer. Work smarter. Achieve more.</span>
        </p>
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <a 
            href="#products" 
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25"
          >
            Explore Systems
          </a>
          <button 
            onClick={onManifestoClick}
            className="px-8 py-3 border-2 border-gray-600 text-gray-200 font-semibold rounded-full hover:border-purple-500 hover:text-white hover:bg-purple-500/10 transition-all"
          >
            Our Manifesto
          </button>
        </div>

        {/* Email Subscription Form */}
        <div className="mt-12 max-w-md mx-auto">
          <form onSubmit={handleSubmitEmail} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for free insights"
              className="flex-1 px-6 py-3 bg-gray-800/50 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-accent to-purple-500 text-white font-semibold rounded-full hover:from-purple-500 hover:to-accent transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Subscribing...' : 'Get Free Insights'}
            </button>
          </form>
          
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
              message.type === 'success' 
                ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                : 'bg-red-500/10 text-red-400 border border-red-500/30'
            }`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default Hero;