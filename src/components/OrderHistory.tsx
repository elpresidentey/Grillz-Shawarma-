import React, { useState } from 'react';
import { ClockIcon, FireIcon, HeartIcon, ShoppingCartIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useToast } from './Toast';
import { useCartHelpers } from '../context/CartContext';
import { useOrderHelpers, useOrders } from '../context/OrderContext';

const OrderHistory: React.FC = () => {
  const { addToast } = useToast();
  const { addToCart } = useCartHelpers();
  const { state: orderState } = useOrders();
  const { toggleFavorite } = useOrderHelpers();
  const [reorderingOrderId, setReorderingOrderId] = useState<string | null>(null);

  const orders = orderState.orders;

  const formatPrice = (price: number): string => {
    return `₦${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const reorderItems = (order: any) => {
    setReorderingOrderId(order.id);
    
    // Add each item from the order to cart
    order.items.forEach((item: any) => {
      const menuItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        description: '',
        category: 'reorder',
        isPopular: false,
        isSpicy: false,
        isVegetarian: false
      };
      
      addToCart(menuItem, item.quantity, item.customizations, item.specialInstructions);
    });
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdate'));
    
    addToast({
      type: 'success',
      title: 'Items Added to Cart!',
      message: `${order.items.length} items from ${order.id} have been added to your cart.`,
      duration: 3000
    });
    
    // Reset loading state after a short delay
    setTimeout(() => {
      setReorderingOrderId(null);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('backToMenu'))}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Menu
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">View your past orders and reorder your favorites</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <ShoppingCartIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <HeartIcon className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {orders.filter(o => o.isFavorite).length}
                </div>
                <div className="text-sm text-gray-600">Favorites</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <FireIcon className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {orders.filter(o => o.rating === 5).length}
                </div>
                <div className="text-sm text-gray-600">5-Star Orders</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">32min</div>
                <div className="text-sm text-gray-600">Avg. Delivery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      {order.isFavorite && (
                        <HeartIcon className="h-5 w-5 text-red-500 fill-current" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{formatDate(order.date)}</span>
                      <span>•</span>
                      <span>{order.deliveryTime}</span>
                      <span>•</span>
                      <span className="font-semibold text-gray-900">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {order.rating && (
                      <div className="flex items-center">
                        {renderStars(order.rating)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div>
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className="text-gray-600 ml-2">x{item.quantity}</span>
                          {item.customizations && item.customizations.length > 0 && (
                            <span className="text-gray-500 ml-2">
                              ({item.customizations.join(', ')})
                            </span>
                          )}
                        </div>
                        <span className="text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Instructions */}
                {order.items.some(item => item.specialInstructions) && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Special Instructions:</h4>
                    <p className="text-sm text-gray-600 italic">
                      {order.items.find(item => item.specialInstructions)?.specialInstructions}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      toggleFavorite(order.id);
                      addToast({
                        type: 'success',
                        title: order.isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
                        message: `${order.id} has been ${order.isFavorite ? 'removed from' : 'added to'} your favorites.`,
                        duration: 2000
                      });
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      order.isFavorite
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <HeartIcon className={`h-4 w-4 ${order.isFavorite ? 'fill-current' : ''}`} />
                    {order.isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
                  </button>
                  
                  <button
                    onClick={() => reorderItems(order)}
                    disabled={reorderingOrderId === order.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      reorderingOrderId === order.id
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {reorderingOrderId === order.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCartIcon className="h-4 w-4" />
                        Reorder
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCartIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-4">Start ordering to see your order history here</p>
            <button
              onClick={() => window.location.href = '#menu'}
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Browse Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
