import React, { useState, useCallback } from 'react';
import { menuData } from '../data/menuData';
import { MenuItem } from '../types/menu';
import { useCartHelpers } from '../context/CartContext';
import { useToast } from './Toast';
import CustomImage from './CustomImage';

const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('shawarma');
  const { addToCart, getCartItemCount, getCartTotal } = useCartHelpers();
  const { addToast } = useToast();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showCustomization, setShowCustomization] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState<string[]>([]);

  const formatPrice = useCallback((price: number): string => {
    return `₦${price.toLocaleString()}`;
  }, []);

  const openCustomization = useCallback((item: MenuItem) => {
    setSelectedItem(item);
    setShowCustomization(true);
    setQuantity(1);
    setCustomizations([]);
  }, []);

  const toggleCustomization = useCallback((custom: string) => {
    setCustomizations(prev => 
      prev.includes(custom) 
        ? prev.filter(c => c !== custom)
        : [...prev, custom]
    );
  }, []);

  const getCartItemCountHelper = (): number => {
    return getCartItemCount();
  };

  const getCartTotalHelper = (): number => {
    return getCartTotal();
  };

  const ComboCard: React.FC<{ item: MenuItem }> = ({ item }) => {
    const { addToCart } = useCartHelpers();
    const { addToast } = useToast();

    const handleAddToCart = (item: MenuItem, quantity: number = 1) => {
      addToCart(item, quantity);
      // Dispatch custom event to update cart count in header
      window.dispatchEvent(new CustomEvent('cartUpdate'));
      addToast({
        type: 'success',
        title: 'Combo Deal Added!',
        message: `${item.name} has been added to your cart.`,
        duration: 3000
      });
    };

    return (
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-orange-200">
        <div className="relative">
          <CustomImage
            imageName={item.id}
            alt={item.name}
            className="w-full h-40 object-cover"
          />
          
          {/* Combo Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold">
              COMBO
            </span>
          </div>

          {/* Savings Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              SAVE 20%
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.name}
              </h3>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                {item.description}
              </p>
              
              {/* Combo Details */}
              <div className="bg-white rounded-lg p-3 mb-3">
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <span className="font-medium">✓</span>
                    <span>Perfect for sharing</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">✓</span>
                    <span>Great value for money</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">✓</span>
                    <span>Includes drinks & sides</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="mb-2">
                <span className="text-xs text-gray-500 line-through">₦{(item.price * 1.2).toLocaleString()}</span>
              </div>
              <span className="text-2xl font-bold text-red-600">
                {formatPrice(item.price)}
              </span>
              <div className="text-xs text-green-600 font-medium mt-1">
                You save ₦{(item.price * 0.2).toLocaleString()}
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <button 
            onClick={() => handleAddToCart(item, 1)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm"
          >
            Order Combo Deal
          </button>
        </div>
      </div>
    );
  };

  const MenuItemCard: React.FC<{ item: MenuItem }> = ({ item }) => {
    const { addToCart } = useCartHelpers();
    const { addToast } = useToast();

    const handleAddToCart = (item: MenuItem, quantity: number = 1) => {
      addToCart(item, quantity);
      // Dispatch custom event to update cart count in header
      window.dispatchEvent(new CustomEvent('cartUpdate'));
      addToast({
        type: 'success',
        title: 'Item Added to Cart!',
        message: `${item.name} has been added to your cart.`,
        duration: 3000
      });
    };

    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative">
          <CustomImage
            imageName={item.id}
            alt={item.name}
            className="w-full h-40 object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {item.isPopular && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Popular
              </span>
            )}
            {item.isSpicy && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Spicy
              </span>
            )}
            {item.isVegetarian && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Veg
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {item.name}
              </h3>
              <p className="text-xs text-gray-600 truncate">
                {item.description}
              </p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(item.price)}
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={() => handleAddToCart(item, 1)}
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-3 rounded transition-colors text-xs"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => openCustomization(item)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded transition-colors text-xs"
            >
              Customize
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white">
      <section id="menu" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-orange-600">Menu</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our delicious shawarma varieties, combo deals, and grilled specialties
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center items-center mb-12 gap-3">
            {menuData.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuData
              .find((cat) => cat.id === selectedCategory)
              ?.items.map((item) => (
                <div key={item.id}>
                  {selectedCategory === 'combos' ? (
                    <ComboCard item={item} />
                  ) : (
                    <MenuItemCard item={item} />
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Customization Modal */}
      {showCustomization && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 gradient-text" style={{ fontFamily: 'Merriweather, serif' }}>
                Customize {selectedItem.name}
              </h3>
              <button
                onClick={() => setShowCustomization(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors text-2xl flex-shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'Merriweather, serif' }}>
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors flex-shrink-0"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold text-gray-900 min-w-[3rem] text-center" style={{ fontFamily: 'Merriweather, serif' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors flex-shrink-0"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Customization Options */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'Merriweather, serif' }}>
                  Customizations
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customizations.includes('Extra Sauce')}
                      onChange={() => toggleCustomization('Extra Sauce')}
                      className="mr-3 w-5 h-5 text-primary-600 flex-shrink-0"
                    />
                    <span className="text-gray-700" style={{ fontFamily: 'Merriweather, serif' }}>Extra Sauce</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customizations.includes('No Onions')}
                      onChange={() => toggleCustomization('No Onions')}
                      className="mr-3 w-5 h-5 text-primary-600 flex-shrink-0"
                    />
                    <span className="text-gray-700" style={{ fontFamily: 'Merriweather, serif' }}>No Onions</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customizations.includes('Extra Spicy')}
                      onChange={() => toggleCustomization('Extra Spicy')}
                      className="mr-3 w-5 h-5 text-primary-600 flex-shrink-0"
                    />
                    <span className="text-gray-700" style={{ fontFamily: 'Merriweather, serif' }}>Extra Spicy</span>
                  </label>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'Merriweather, serif' }}>
                  Special Instructions
                </label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                  rows={3}
                  placeholder="Any special requests?"
                  style={{ fontFamily: 'Merriweather, serif' }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowCustomization(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                  style={{ fontFamily: 'Merriweather, serif' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedItem) {
                      addToCart(selectedItem, quantity, customizations);
                      addToast({
                        type: 'success',
                        title: 'Item Added to Cart!',
                        message: `${selectedItem.name} with customizations has been added to your cart.`,
                        duration: 3000
                      });
                    }
                  }}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                  style={{ fontFamily: 'Merriweather, serif' }}
                >
                  Add to Cart - {formatPrice(selectedItem.price * quantity)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Indicator */}
      {getCartItemCountHelper() > 0 && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full shadow-2xl p-3 z-40 transform transition-all hover:scale-110 shadow-glow lg:block hidden">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold whitespace-nowrap" style={{ fontFamily: 'Merriweather, serif' }}>
              {getCartItemCountHelper()} items
            </span>
            <span className="bg-white text-primary-600 text-xs px-2 py-1 rounded-full font-bold whitespace-nowrap">
              ₦{getCartTotalHelper().toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
