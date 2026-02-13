import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  totalAmount: number;
  estimatedDeliveryTime: string;
}

interface PurchaseSuccessProps {
  orderDetails: OrderDetails;
  onClose: () => void;
}

const PurchaseSuccess: React.FC<PurchaseSuccessProps> = ({ orderDetails, onClose }) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const formatPrice = (price: number): string => {
    return `₦${price.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-2xl max-w-lg w-full shadow-2xl transform transition-all duration-500 ${
          animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-12 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircleIcon className="h-20 w-20 text-white animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h2>
          <p className="text-green-100">Your delicious meal is on the way</p>
        </div>

        {/* Order Details */}
        <div className="px-8 py-8 space-y-6">
          {/* Order ID */}
          <div className="bg-gray-50 rounded-lg p-4 text-center border-2 border-green-200">
            <p className="text-xs text-gray-600 mb-1">Order ID</p>
            <p className="text-xl font-bold text-gray-900">#{orderDetails.orderId}</p>
          </div>

          {/* Delivery Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <MapPinIcon className="h-6 w-6 text-orange-600 mt-1" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 font-semibold uppercase">Delivery Address</p>
                <p className="text-sm text-gray-900 mt-1">{orderDetails.deliveryAddress}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-orange-600 mt-1" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 font-semibold uppercase">Estimated Delivery</p>
                <p className="text-sm text-gray-900 mt-1">{orderDetails.estimatedDeliveryTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <PhoneIcon className="h-6 w-6 text-orange-600 mt-1" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 font-semibold uppercase">Contact Number</p>
                <p className="text-sm text-gray-900 mt-1">{orderDetails.customerPhone}</p>
              </div>
            </div>
          </div>

          {/* Order Total */}
          <div className="pt-4 border-t-2 border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Order Total:</span>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(orderDetails.totalAmount)}
              </span>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-xs text-blue-900">
                ✓ Driver details will be sent to your phone shortly<br />
                ✓ Track your order status in real-time<br />
                ✓ Payment will be collected upon delivery
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Continue Shopping
          </button>

          <p className="text-center text-xs text-gray-500">
            You will receive an SMS confirmation and order updates
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
