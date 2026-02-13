import React, { useState, useEffect } from 'react';
import { 
  ShoppingCartIcon, 
  XMarkIcon, 
  PlusIcon, 
  MinusIcon,
  TrashIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { useCart, useCartHelpers } from '../context/CartContext';
import { useToast } from './Toast';
import PurchaseSuccess from './PurchaseSuccess';

interface CheckoutStep {
  id: number;
  title: string;
  description: string;
}

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const { getCartItemCount, getCartSubtotal, getCartTax, getDeliveryFee, getFinalTotal } = useCartHelpers();
  const { addToast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    totalAmount: 0,
    estimatedDeliveryTime: ''
  });
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    email: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Listen for openCart events
  useEffect(() => {
    const handleOpenCart = () => {
      dispatch({ type: 'TOGGLE_CART' });
    };

    window.addEventListener('openCart', handleOpenCart);
    return () => window.removeEventListener('openCart', handleOpenCart);
  }, [dispatch]);

  const checkoutSteps: CheckoutStep[] = [
    { id: 0, title: 'Cart', description: 'Review your items' },
    { id: 1, title: 'Delivery', description: 'Delivery information' },
    { id: 2, title: 'Payment', description: 'Payment method' },
    { id: 3, title: 'Confirm', description: 'Review order' }
  ];

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
        title: 'Item Removed',
        message: `${item.name} has been removed from your cart.`,
        duration: 3000
      });
    }
  };

  const formatPrice = (price: number): string => {
    return `₦${price.toLocaleString()}`;
  };

  const handleNextStep = () => {
    if (checkoutStep < checkoutSteps.length - 1) {
      setCheckoutStep(checkoutStep + 1);
    } else {
      handleFinalCheckout();
    }
  };

  const handlePrevStep = () => {
    if (checkoutStep > 0) {
      setCheckoutStep(checkoutStep - 1);
    }
  };

  const handleFinalCheckout = () => {
    setIsCheckingOut(true);
    
    // Generate order ID
    const orderId = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    // Set order details for success screen
    setOrderDetails({
      orderId,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      deliveryAddress: customerInfo.address,
      totalAmount: getFinalTotal(),
      estimatedDeliveryTime: '30-45 minutes'
    });

    setTimeout(() => {
      addToast({
        type: 'success',
        title: 'Order Placed Successfully!',
        message: 'Your food will be delivered in 30-45 minutes.',
        duration: 6000
      });
      setIsCheckingOut(false);
      setShowSuccessScreen(true);
      dispatch({ type: 'CLEAR_CART' });
      setCheckoutStep(0);
    }, 2000);
  };

  const handleSuccessScreenClose = () => {
    setShowSuccessScreen(false);
    dispatch({ type: 'TOGGLE_CART' });
    // Reset customer info
    setCustomerInfo({
      name: '',
      phone: '',
      address: '',
      email: ''
    });
  };

  const renderCheckoutContent = () => {
    switch (checkoutStep) {
      case 0:
        return renderCartItems();
      case 1:
        return renderDeliveryInfo();
      case 2:
        return renderPaymentMethod();
      case 3:
        return renderOrderConfirmation();
      default:
        return renderCartItems();
    }
  };

  const renderCartItems = () => (
    <div className="space-y-4">
      {state.items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-base">{item.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{formatPrice(item.price)}</p>
              {item.customizations && item.customizations.length > 0 && (
                <p className="text-xs text-gray-500 mt-2 bg-gray-50 px-2 py-1 rounded inline-block">
                  {item.customizations.join(', ')}
                </p>
              )}
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors ml-3"
            >
              <TrashIcon className="h-4 w-4 text-red-500" />
            </button>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={item.quantity <= 1}
              >
                <MinusIcon className="h-4 w-4 text-gray-600" />
              </button>
              <span className="w-8 text-center text-base font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <PlusIcon className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <span className="font-semibold text-gray-900 text-base">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDeliveryInfo = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Delivery Information</h3>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <UserIcon className="h-4 w-4 inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <PhoneIcon className="h-4 w-4 inline mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="+234 800 000 0000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPinIcon className="h-4 w-4 inline mr-2" />
              Delivery Address
            </label>
            <textarea
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              rows={3}
              placeholder="123 Main Street, Lagos, Nigeria"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentMethod = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Method</h3>
        <div className="space-y-4">
          {[
            { id: 'card', name: 'Card Payment', description: 'Pay with debit/credit card' },
            { id: 'transfer', name: 'Bank Transfer', description: 'Transfer to our bank account' },
            { id: 'cash', name: 'Cash on Delivery', description: 'Pay when you receive your order' }
          ].map((method) => (
            <label key={method.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-4 w-4 h-4 text-gray-900 focus:ring-gray-500"
              />
              <div>
                <div className="font-medium text-gray-900">{method.name}</div>
                <div className="text-sm text-gray-500">{method.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrderConfirmation = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">{formatPrice(getCartSubtotal())}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">VAT (7.5%)</span>
            <span className="font-medium text-gray-900">{formatPrice(getCartTax())}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery</span>
            <span className="font-medium text-gray-900">{getCartSubtotal() >= 3000 ? 'FREE' : formatPrice(getDeliveryFee())}</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>{formatPrice(getFinalTotal())}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Name:</strong> {customerInfo.name || 'Not provided'}</p>
          <p><strong>Phone:</strong> {customerInfo.phone || 'Not provided'}</p>
          <p><strong>Address:</strong> {customerInfo.address || 'Not provided'}</p>
          <p><strong>Email:</strong> {customerInfo.email || 'Not provided'}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        <p className="text-sm text-gray-600">
          {paymentMethod === 'card' ? 'Card Payment' : 
           paymentMethod === 'transfer' ? 'Bank Transfer' : 
           'Cash on Delivery'}
        </p>
      </div>
    </div>
  );

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      />

      {/* Cart Panel */}
      <div className={`absolute right-0 top-0 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        checkoutStep === 0 ? 'h-full w-full max-w-lg' : 'h-[90vh] w-full max-w-2xl'
      }`}>
        <div className={`flex flex-col ${checkoutStep === 0 ? 'h-full' : 'h-[90vh]'}`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50 flex-shrink-0">
            <div className="flex items-center">
              <ShoppingCartIcon className="h-5 w-5 text-gray-900 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">
                {checkoutSteps[checkoutStep].title}
              </h2>
              <span className="ml-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-full">
                {getCartItemCount()}
              </span>
            </div>
            <button
              onClick={() => {
                dispatch({ type: 'TOGGLE_CART' });
                setCheckoutStep(0);
              }}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-4 py-3 border-b flex-shrink-0">
            <div className="flex items-center justify-between">
              {checkoutSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    index <= checkoutStep 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < checkoutStep ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < checkoutSteps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      index < checkoutStep ? 'bg-gray-900' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {checkoutSteps[checkoutStep].description}
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            {state.items.length === 0 && checkoutStep === 0 ? (
              <div className="text-center py-12">
                <ShoppingCartIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm mb-4">Your cart is empty</p>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                  className="text-gray-900 hover:text-gray-700 font-medium text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              renderCheckoutContent()
            )}
          </div>

          {/* Order Summary - Only show in cart step */}
          {state.items.length > 0 && checkoutStep === 0 && (
            <div className="border-t p-4 space-y-3 bg-gray-50 flex-shrink-0">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(getCartSubtotal())}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>VAT (7.5%)</span>
                  <span>{formatPrice(getCartTax())}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Delivery</span>
                  <span>{getCartSubtotal() >= 3000 ? 'FREE' : formatPrice(getDeliveryFee())}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-sm font-semibold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(getFinalTotal())}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center text-xs text-gray-600 mb-1">
                  <MapPinIcon className="h-3 w-3 mr-1" />
                  <span>Estimated delivery: 30-45 minutes</span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  <span>Free delivery on orders above ₦3,000</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons - Only show during checkout */}
          {checkoutStep > 0 && (
            <div className="border-t p-4 bg-gray-50 flex-shrink-0">
              <div className="flex gap-2">
                {checkoutStep > 0 && (
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  disabled={isCheckingOut || (checkoutStep === 1 && (!customerInfo.name || !customerInfo.phone || !customerInfo.address))}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : checkoutStep === 3 ? (
                    'Place Order'
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Purchase Success Screen */}
      {showSuccessScreen && (
        <PurchaseSuccess 
          orderDetails={orderDetails} 
          onClose={handleSuccessScreenClose}
        />
      )}
    </div>
  );
};

export default Cart;
