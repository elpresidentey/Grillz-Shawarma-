import React, { useState, useEffect } from 'react';
import { 
  ShoppingCartIcon, 
  XMarkIcon, 
  PlusIcon, 
  MinusIcon,
  TrashIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  CheckCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { useCart, useCartHelpers } from '../context/CartContext';
import { useToast } from './Toast';

type CheckoutMode = 'cart' | 'checkout' | 'success';

interface OrderData {
  id: string;
  items: number;
  total: number;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  time: string;
}

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const { getCartItemCount, getCartSubtotal, getCartTax, getDeliveryFee, getFinalTotal } = useCartHelpers();
  const { addToast } = useToast();
  
  const [mode, setMode] = useState<CheckoutMode>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const handleOpenCart = () => {
      dispatch({ type: 'TOGGLE_CART' });
    };
    window.addEventListener('openCart', handleOpenCart);
    return () => window.removeEventListener('openCart', handleOpenCart);
  }, [dispatch]);

  const formatPrice = (price: number): string => {
    return `₦${price.toLocaleString()}`;
  };

  const updateQuantity = (id: string, change: number) => {
    const item = state.items.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
    }
  };

  const removeItem = (id: string) => {
    const item = state.items.find(item => item.id === id);
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    if (item) {
      addToast({
        type: 'info',
        title: 'Removed',
        message: `${item.name} removed from cart`,
        duration: 2000
      });
    }
  };

  const handleCheckout = () => {
    if (state.items.length === 0) {
      addToast({
        type: 'error',
        title: 'Empty Cart',
        message: 'Add items before checkout',
        duration: 3000
      });
      return;
    }
    setMode('checkout');
  };

  const handlePlaceOrder = () => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      addToast({
        type: 'error',
        title: 'Incomplete Form',
        message: 'Please fill in all delivery information',
        duration: 3000
      });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `ORD-${Date.now().toString().slice(-8)}`;
      
      setOrderData({
        id: orderId,
        items: getCartItemCount(),
        total: getFinalTotal(),
        customer: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address
        },
        time: '30-45 minutes'
      });

      setIsProcessing(false);
      setMode('success');
      dispatch({ type: 'CLEAR_CART' });

      addToast({
        type: 'success',
        title: 'Order Confirmed!',
        message: 'You will receive SMS updates shortly',
        duration: 4000
      });
    }, 1500);
  };

  const handleNewOrder = () => {
    setMode('cart');
    setFormData({ name: '', phone: '', address: '' });
    setOrderData(null);
    dispatch({ type: 'TOGGLE_CART' });
  };


  // ========================
  // SUCCESS SCREEN
  // ========================
  if (mode === 'success' && orderData) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-8 text-center">
              <CheckCircleIcon className="h-16 w-16 text-white mx-auto mb-3 animate-bounce" />
              <h2 className="text-2xl font-bold text-white">Order Confirmed!</h2>
              <p className="text-green-100 text-sm mt-1">Thank you for your order</p>
            </div>

            {/* Order Details */}
            <div className="p-6 space-y-4">
              {/* Order ID */}
              <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Order ID</p>
                <p className="text-lg font-bold text-gray-900 font-mono">{orderData.id}</p>
              </div>

              {/* Essentials */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-xs text-blue-700 font-semibold mb-1">Items</p>
                  <p className="text-xl font-bold text-blue-900">{orderData.items}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                  <p className="text-xs text-purple-700 font-semibold mb-1">Total</p>
                  <p className="text-lg font-bold text-purple-900">{formatPrice(orderData.total)}</p>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-100 space-y-3">
                <div className="flex gap-3">
                  <UserIcon className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-orange-700 font-semibold">Delivery To</p>
                    <p className="text-sm text-orange-900 font-medium">{orderData.customer.name}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <PhoneIcon className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-orange-700 font-semibold">Contact</p>
                    <p className="text-sm text-orange-900 font-medium">{orderData.customer.phone}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPinIcon className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-orange-700 font-semibold">Address</p>
                    <p className="text-sm text-orange-900">{orderData.customer.address}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100 text-center">
                <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">Estimated Delivery</p>
                <p className="text-lg font-bold text-emerald-900 mt-1">{orderData.time}</p>
              </div>

              {/* Info */}
              <p className="text-xs text-gray-600 text-center bg-gray-50 p-3 rounded">
                ✓ SMS confirmation sent<br/>
                ✓ Driver details coming soon<br/>
                ✓ Track your order in real-time
              </p>

              {/* CTA */}
              <button
                onClick={handleNewOrder}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================
  // CHECKOUT SCREEN
  // ========================
  if (mode === 'checkout') {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={() => setMode('cart')}
        />

        <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b bg-white flex-shrink-0">
            <button
              onClick={() => setMode('cart')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-900" />
            </button>
            <h2 className="text-lg font-bold text-gray-900">Delivery Details</h2>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number *</label>
              <input
                type="tel"
                placeholder="+234 800 000 0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Delivery Address *</label>
              <textarea
                placeholder="123 Main Street, Lagos, Nigeria"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-2">
              <p className="text-sm font-semibold text-gray-900 mb-3">Order Summary</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">{formatPrice(getCartSubtotal())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (7.5%)</span>
                <span className="font-medium text-gray-900">{formatPrice(getCartTax())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium text-gray-900">
                  {getCartSubtotal() >= 3000 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    formatPrice(getDeliveryFee())
                  )}
                </span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-orange-600">{formatPrice(getFinalTotal())}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-4 bg-gray-50 flex-shrink-0 space-y-3">
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </span>
              ) : (
                `Place Order • ${formatPrice(getFinalTotal())}`
              )}
            </button>
            <button
              onClick={() => setMode('cart')}
              disabled={isProcessing}
              className="w-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded-lg transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========================
  // CART SCREEN (DEFAULT)
  // ========================
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingCartIcon className="h-5 w-5 text-orange-600" />
            <h2 className="text-lg font-bold text-gray-900">
              Your Cart {state.items.length > 0 && `(${getCartItemCount()})`}
            </h2>
          </div>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {state.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <ShoppingCartIcon className="h-16 w-16 text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium mb-2">Cart is Empty</p>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            state.items.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{formatPrice(item.price)}</p>
                    {item.customizations && item.customizations.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1 bg-white px-2 py-0.5 rounded inline-block">
                        {item.customizations.join(', ')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 hover:bg-red-100 rounded transition-colors"
                  >
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="p-1 hover:bg-gray-100 disabled:opacity-50 rounded transition"
                    >
                      <MinusIcon className="h-3 w-3 text-gray-600" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-gray-100 rounded transition"
                    >
                      <PlusIcon className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                  <span className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary & CTA */}
        {state.items.length > 0 && (
          <div className="border-t p-4 bg-white flex-shrink-0 space-y-3">
            <div className="space-y-2 bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(getCartSubtotal())}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Tax</span>
                <span>{formatPrice(getCartTax())}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Delivery</span>
                <span>{getCartSubtotal() >= 3000 ? 'FREE' : formatPrice(getDeliveryFee())}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-orange-600">{formatPrice(getFinalTotal())}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
