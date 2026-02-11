import React, { useState, useEffect } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  ShoppingCartIcon
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
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-lg font-bold text-gray-900">
              Lagos Shawarma
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
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
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => {
                const menuSection = document.getElementById('menu');
                if (menuSection) {
                  menuSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
            >
              Order Now
            </button>
            <button 
              onClick={() => {
                // Dispatch custom event to show order history
                window.dispatchEvent(new CustomEvent('showOrderHistory'));
              }}
              className="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-md transition-colors text-sm border border-gray-300"
            >
              Order History
            </button>
            <button 
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={openCart}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
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
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
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
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors w-full text-sm"
              >
                Order Now
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
