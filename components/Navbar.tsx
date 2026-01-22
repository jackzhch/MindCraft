import React from 'react';
import { CartItem } from '../types';
import UserMenu from './UserMenu';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onAuthClick: () => void;
  onPurchasesClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onAuthClick, onPurchasesClick }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-obsidian/80 backdrop-blur-md border-b border-cement">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-serif font-bold text-white tracking-tight">
              Mind<span className="text-accent">Craft</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-6 text-sm font-medium text-mist">
              <a href="#" className="hover:text-white transition-colors">Systems</a>
              <a href="#" className="hover:text-white transition-colors">Templates</a>
              <button 
                onClick={onPurchasesClick}
                className="hover:text-white transition-colors"
              >
                My Purchases
              </button>
            </div>

            <button 
              onClick={onOpenCart}
              className="relative p-2 text-mist hover:text-white transition-colors"
              aria-label="Open cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <UserMenu onAuthClick={onAuthClick} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;