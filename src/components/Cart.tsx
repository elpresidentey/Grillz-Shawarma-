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
  ArrowLeftIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { useCart, useCartHelpers } from '../context/CartContext';
import { useToast } from './Toast';

type CheckoutStep = 'cart' | 'delivery' | 'payment' | 'review' | 'success';

interface OrderData {
  id: string;
  items: number;
  total: number;
  paymentMethod: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  time: string;
}

const PAYMENT_METHODS = [
  { id: 'bank-transfer', name: 'Bank Transfer', desc: 'Transfer to our bank account', icon: BuildingLibraryIcon, color: 'blue' },
  { id: 'card', name: 'Card Payment', desc: 'Debit/Credit card', icon: CreditCardIcon, color: 'purple' },
  { id: 'cash', name: 'Cash on Delivery', desc: 'Pay when you receive', icon: BanknotesIcon, color: 'green' }
];

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const { getCartItemCount, getCartSubtotal, getCartTax, getDeliveryFee, getFinalTotal } = useCartHelpers();
  const { addToast } = useToast();
  
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  
  const [selectedPayment, setSelectedPayment] = useState('bank-transfer');

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
        message: `${item.name} removed`,
        duration: 2000
      });
    }
  };

  const handleNext = () => {
    const steps: CheckoutStep[] = ['cart', 'delivery', 'payment', 'review', 'success'];
    const currentIndex = steps.indexOf(step);
    
    // Validate current step before moving to next
    if (step === 'cart' && state.items.length === 0) {
      addToast({ type: 'error', title: 'Empty Cart', message: 'Add items before checkout', duration: 3000 });
      return;
    }
    
    if (step === 'delivery') {
      if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
        addToast({ type: 'error', title: 'Incomplete', message: 'Fill all delivery details', duration: 3000 });
        return;
      }
    }

    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: CheckoutStep[] = ['cart', 'delivery', 'payment', 'review', 'success'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `#${Date.now().toString().slice(-7)}`;
      
      setOrderData({
        id: orderId,
        items: getCartItemCount(),
        total: getFinalTotal(),
        paymentMethod: selectedPayment,
        customer: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address
        },
        time: '30-45'
      });

      setIsProcessing(false);
      setStep('success');
      dispatch({ type: 'CLEAR_CART' });

      addToast({
        type: 'success',
        title: 'Order Confirmed!',
        message: 'Check your email for details',
        duration: 5000
      });
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setStep('cart');
    setFormData({ name: '', phone: '', address: '' });
    setSelectedPayment('bank-transfer');
    setOrderData(null);
    dispatch({ type: 'TOGGLE_CART' });
  };


  if (!state.isOpen) return null;

  // ========================
  // SUCCESS SCREEN
  // ========================
  if (step === 'success' && orderData) {
    const paymentMethod = PAYMENT_METHODS.find(m => m.id === orderData.paymentMethod);
    
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-hidden">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Green Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-10 text-center sticky top-0">
            <CheckCircleIcon className="h-16 w-16 text-white mx-auto mb-3 animate-bounce" />
            <h1 className="text-3xl font-bold text-white">Order Placed!</h1>
            <p className="text-green-100 mt-2">Thank you for your order</p>
          </div>

          {/* Order Details */}
          <div className="p-6 space-y-4">
            {/* Order ID */}
            <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 text-center">
              <p className="text-xs text-gray-600 font-bold uppercase tracking-widest mb-2">Order Number</p>
              <p className="text-2xl font-black text-gray-900">{orderData.id}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 text-center">
                <p className="text-2xl font-black text-blue-900">{orderData.items}</p>
                <p className="text-xs text-blue-700 font-semibold mt-1">Items</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-100 text-center">
                <p className="text-lg font-black text-purple-900">{formatPrice(orderData.total)}</p>
                <p className="text-xs text-purple-700 font-semibold mt-1">Total</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 text-center">
                <p className="text-sm font-black text-orange-900">{orderData.time} min</p>
                <p className="text-xs text-orange-700 font-semibold mt-1">ETA</p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-5 border-2 border-orange-100 space-y-3">
              <div className="flex gap-3">
                <UserIcon className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-orange-700 font-bold uppercase">Name</p>
                  <p className="text-sm text-orange-900 font-semibold">{orderData.customer.name}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <PhoneIcon className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-orange-700 font-bold uppercase">Phone</p>
                  <p className="text-sm text-orange-900 font-semibold">{orderData.customer.phone}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPinIcon className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-orange-700 font-bold uppercase">Delivery Address</p>
                  <p className="text-sm text-orange-900">{orderData.customer.address}</p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            {paymentMethod && (
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <p className="text-xs text-gray-600 font-bold mb-2 uppercase">Payment Method</p>
                <div className="flex items-center gap-3">
                  <paymentMethod.icon className="h-6 w-6 text-gray-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{paymentMethod.name}</p>
                    <p className="text-xs text-gray-600">{paymentMethod.desc}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                <span className="font-bold">Next Steps:</span><br/>
                ✓ Check your email for order details<br/>
                ✓ Driver will contact you shortly<br/>
                ✓ Track delivery in real-time
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={handleCloseSuccess}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg text-lg"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========================
  // MAIN CART CONTAINER
  // ========================
  const getStepTitle = () => {
    const titles = {
      cart: 'Your Cart',
      delivery: 'Delivery Details',
      payment: 'Payment Method',
      review: 'Order Review',
      success: 'Order Placed'
    };
    return titles[step];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => step === 'cart' ? dispatch({ type: 'TOGGLE_CART' }) : null}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-orange-50 to-yellow-50 flex-shrink-0">
          <div className="flex items-center gap-3">
            {step !== 'cart' && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5 text-gray-900" />
              </button>
            )}
            <h2 className="text-lg font-bold text-gray-900">{getStepTitle()}</h2>
            {state.items.length > 0 && step === 'cart' && (
              <span className="ml-auto bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                {getCartItemCount()}
              </span>
            )}
          </div>
          <button
            onClick={() => step === 'cart' ? dispatch({ type: 'TOGGLE_CART' }) : handleBack()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        {step !== 'cart' && (
          <div className="px-4 py-2 bg-gray-50 border-b flex-shrink-0">
            <div className="flex justify-between text-xs mb-2">
              <span className={step === 'delivery' || step === 'payment' || step === 'review' ? 'text-orange-600 font-bold' : 'text-gray-500'}>Delivery</span>
              <span className={step === 'payment' || step === 'review' ? 'text-orange-600 font-bold' : 'text-gray-500'}>Payment</span>
              <span className={step === 'review' ? 'text-orange-600 font-bold' : 'text-gray-500'}>Review</span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
                style={{
                  width: step === 'delivery' ? '33%' : step === 'payment' ? '66%' : step === 'review' ? '100%' : '0%'
                }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">;
          {step === 'cart' && (
            <div className="space-y-4">
              {state.items.length === 0 ? (
                <div className="h-96 flex flex-col items-center justify-center text-center">
                  <ShoppingCartIcon className="h-16 w-16 text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium mb-3">Cart is Empty</p>
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                    className="text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                state.items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{formatPrice(item.price)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:bg-red-100 rounded transition-colors flex-shrink-0"
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
                        <span className="w-5 text-center text-xs font-bold text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-100 rounded transition"
                        >
                          <PlusIcon className="h-3 w-3 text-gray-600" />
                        </button>
                      </div>
                      <span className="font-bold text-gray-900 text-sm">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {step === 'delivery' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Full Name *</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Delivery Address *</label>
                <textarea
                  placeholder="123 Main Street, Lagos"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm resize-none"
                />
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedPayment === method.id
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${
                      selectedPayment === method.id
                        ? `bg-${method.color}-100`
                        : 'bg-gray-100'
                    }`}>
                      <method.icon className={`h-6 w-6 ${
                        selectedPayment === method.id
                          ? `text-${method.color}-600`
                          : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{method.name}</p>
                      <p className="text-xs text-gray-600">{method.desc}</p>
                    </div>
                    {selectedPayment === method.id && (
                      <div className="h-5 w-5 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-4">
              {/* Items Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-bold text-gray-900 mb-3 text-sm">Items ({getCartItemCount()})</p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="bg-white rounded-lg p-4 border-2 border-gray-300 space-y-2">
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
                    {getCartSubtotal() >= 3000 ? <span className="text-green-600">FREE</span> : formatPrice(getDeliveryFee())}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-lg font-black text-orange-600">{formatPrice(getFinalTotal())}</span>
                </div>
              </div>

              {/* Customer & Payment */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 space-y-2 text-sm">
                <p><span className="font-semibold text-gray-900">Name:</span> {formData.name}</p>
                <p><span className="font-semibold text-gray-900">Phone:</span> {formData.phone}</p>
                <p><span className="font-semibold text-gray-900">Method:</span> {PAYMENT_METHODS.find(m => m.id === selectedPayment)?.name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        {(step === 'cart' || step === 'delivery' || step === 'payment' || step === 'review') && (
          <div className="border-t p-4 bg-white flex-shrink-0 space-y-3">
            {state.items.length > 0 && step === 'cart' && (
              <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Total</span>
                  <span className="font-bold text-orange-600">{formatPrice(getFinalTotal())}</span>
                </div>
              </div>
            )}
            
            {step === 'review' && (
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                {isProcessing ? 'Processing...' : `Place Order • ${formatPrice(getFinalTotal())}`}
              </button>
            )}

            {step !== 'review' && state.items.length > 0 && (
              <button
                onClick={handleNext}
                disabled={step === 'delivery' && (!formData.name || !formData.phone || !formData.address)}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                {step === 'cart' ? 'Continue to Delivery' : step === 'delivery' ? 'Choose Payment' : 'Review Order'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
