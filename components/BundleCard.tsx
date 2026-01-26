import React from 'react';
import { Bundle } from '../types';

interface BundleCardProps {
  bundle: Bundle;
  onAddToCart: () => void;
}

const BundleCard: React.FC<BundleCardProps> = ({ bundle, onAddToCart }) => {
  const savingsPercentage = Math.round((bundle.savings / bundle.originalPrice) * 100);

  return (
    <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500 rounded-2xl p-8 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1">
      {/* Bestseller Badge */}
      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-obsidian px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
        🔥 BEST VALUE
      </div>

      {/* Savings Badge */}
      <div className="absolute -top-3 -left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
        Save ${bundle.savings}
      </div>

      <div className="relative">
        {/* Image */}
        <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
          <img 
            src={bundle.image} 
            alt={bundle.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="inline-block bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              BUNDLE - {savingsPercentage}% OFF
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-2xl font-serif font-bold text-white mb-3">
          {bundle.title}
        </h3>
        <p className="text-gray-300 mb-6 leading-relaxed">
          {bundle.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {bundle.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-200 text-sm">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-purple-500/30">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-white">${bundle.price.toFixed(2)}</span>
              <span className="text-lg text-gray-400 line-through">${bundle.originalPrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-green-400 font-semibold mt-1">
              Save ${bundle.savings.toFixed(2)} ({savingsPercentage}% OFF)
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onAddToCart}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
          aria-label={`Add ${bundle.title} to cart`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Get Complete Stack
        </button>

        {/* Trust Badges */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure Checkout
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Instant Access
          </span>
        </div>
      </div>
    </div>
  );
};

export default BundleCard;

