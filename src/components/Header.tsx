import React, { useState, useEffect } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  ShoppingCartIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { useCartHelpers } from '../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemCount } = useCartHelpers();
  const [cartCount, setCartCount] = useState(0);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartCount(getCartItemCount());
    };

    // Initial load
    handleCartUpdate();

    // Listen for cart update events
    window.addEventListener('cartUpdate', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdate', handleCartUpdate);
    };
  }, [getCartItemCount]);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Locations', href: '#locations' },
    { name: 'Offers', href: '#promotions' },
  ];

  const openCart = () => {
    // Dispatch custom event to open cart
    window.dispatchEvent(new CustomEvent('openCart'));
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4 min-h-14 py-2">
          {/* Logo - never shrink */}
          <div className="flex-shrink-0 min-w-0 flex items-center gap-2">
            <div className="relative">
              {/* Logo Badge Background */}
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-lg shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                {/* Fire Icon */}
                <FireIcon className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
              {/* Corner Accent */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full shadow-md" />
            </div>
            
            {/* Logo Text */}
            <div className="min-w-0 flex flex-col">
              <h1 className="text-base sm:text-lg font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent truncate leading-tight">
                GRILLZ
              </h1>
              <p className="text-xs text-gray-600 font-semibold truncate tracking-widest">
                SHAWARMA
              </p>
            </div>
          </div>

          {/* Desktop Navigation - can shrink on narrow desktop */}
          <nav className="hidden md:flex flex-shrink items-center gap-1 lg:gap-2 xl:space-x-2 xl:gap-0 min-w-0">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-gray-600 hover:text-gray-900 px-2 py-2 text-sm font-medium transition-colors whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs - never shrink, no text overlap */}
          <div className="hidden md:flex items-center flex-shrink-0 gap-2">
            <button
              onClick={() => {
                const menuSection = document.getElementById('menu');
                if (menuSection) {
                  menuSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-3 sm:px-4 rounded-md transition-colors text-sm whitespace-nowrap"
            >
              Order Now
            </button>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('showOrderHistory'));
              }}
              className="text-gray-600 hover:text-gray-900 font-medium py-2 px-3 sm:px-4 rounded-md transition-colors text-sm border border-gray-300 whitespace-nowrap"
            >
              Order History
            </button>
            <button
              onClick={openCart}
              className="relative flex-shrink-0 p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-50"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 bg-gray-900 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="md:hidden flex items-center gap-1 flex-shrink-0">
            <button
              onClick={openCart}
              className="relative p-2.5 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-gray-900 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2.5 text-base font-medium rounded-md hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={() => {
                  const menuSection = document.getElementById('menu');
                  if (menuSection) {
                    menuSection.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-base font-medium rounded-md bg-gray-900 text-white hover:bg-gray-800"
              >
                Order Now
              </button>
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('showOrderHistory'));
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-base font-medium rounded-md text-gray-700 border border-gray-300 hover:bg-gray-100"
              >
                Order History
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
