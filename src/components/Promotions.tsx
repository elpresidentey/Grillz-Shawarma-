import React from 'react';
import { useToast } from './Toast';
import { useCart } from '../context/CartContext';

const Promotions: React.FC = () => {
  const { addToast } = useToast();
  const { dispatch } = useCart();
  
  const promotions = [
    {
      id: 'grand-opening',
      title: 'Grand Opening Special',
      description: '20% OFF on all items for first week',
      discount: '20% OFF',
      validUntil: 'Limited Time',
      color: 'bg-red-500',
      terms: 'Valid at all locations. Cannot be combined with other offers.'
    },
    {
      id: 'student-discount',
      title: 'Student Discount',
      description: 'Show your student ID and get 15% off your order',
      discount: '15% OFF',
      validUntil: 'Ongoing',
      color: 'bg-blue-500',
      terms: 'Valid student ID required. Only at Yaba branch.'
    },
    {
      id: 'free-delivery',
      title: 'Free Delivery',
      description: 'Free delivery on orders above ₦3,000',
      discount: 'FREE DELIVERY',
      validUntil: 'Ongoing',
      color: 'bg-green-500',
      terms: 'Within 5km radius of our branches.'
    },
    {
      id: 'happy-hour',
      title: 'Happy Hour',
      description: 'Buy 2 shawarmas, get 1 free every weekday 2-5 PM',
      discount: 'BOGO',
      validUntil: 'Weekdays 2-5 PM',
      color: 'bg-purple-500',
      terms: 'Not valid on weekends and public holidays.'
    },
    {
      id: 'loyalty-program',
      title: 'Loyalty Rewards',
      description: 'Earn points with every purchase and get free meals',
      discount: 'POINTS SYSTEM',
      validUntil: 'Ongoing',
      color: 'bg-yellow-500',
      terms: '100 points = ₦100 discount. Sign up required.'
    },
    {
      id: 'corporate-catering',
      title: 'Corporate Catering',
      description: 'Special rates for office events and meetings',
      discount: 'SPECIAL RATES',
      validUntil: 'Ongoing',
      color: 'bg-indigo-500',
      terms: 'Minimum order of 10 meals required. 24-hour notice.'
    }
  ];

  const comboDeals = [
    {
      name: 'Student Combo',
      description: 'Shawarma + Fries + Drink',
      originalPrice: 3100,
      discountedPrice: 2500,
      savings: 600,
      popular: true
    },
    {
      name: 'Office Lunch',
      description: 'Mixed Grill + Jollof Rice + Drink',
      originalPrice: 5200,
      discountedPrice: 4000,
      savings: 1200,
      popular: false
    },
    {
      name: 'Family Pack',
      description: '4 Shawarmas + 2 Sides + 4 Drinks',
      originalPrice: 11000,
      discountedPrice: 8500,
      savings: 2500,
      popular: true
    }
  ];

  return (
    <section id="promotions" className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Merriweather, serif', letterSpacing: '-0.02em' }}>
            Special <span className="text-primary-600">Offers</span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Merriweather, serif', letterSpacing: '0.01em' }}>
            Save big with our amazing promotions and combo deals. Don't miss out on these limited-time offers!
          </p>
        </div>

        {/* Combo Deals */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-center text-gray-900 mb-8" style={{ fontFamily: 'Merriweather, serif', letterSpacing: '-0.02em' }}>Combo Deals</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comboDeals.map((deal, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-xl shadow-lg overflow-hidden ${
                  deal.popular ? 'ring-2 ring-primary-600' : ''
                }`}
              >
                {deal.popular && (
                  <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 text-sm font-semibold">
                    Popular
                  </div>
                )}
                <div className="p-4">
                  <h4 className="text-base font-bold text-gray-900 mb-2" style={{ fontFamily: 'Merriweather, serif', letterSpacing: '0.01em' }}>{deal.name}</h4>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Merriweather, serif', letterSpacing: '0.01em' }}>{deal.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold text-primary-600" style={{ fontFamily: 'Merriweather, serif' }}>
                        ₦{deal.discountedPrice.toLocaleString()}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through" style={{ fontFamily: 'Merriweather, serif' }}>
                        ₦{deal.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold" style={{ fontFamily: 'Merriweather, serif' }}>
                      Save ₦{deal.savings.toLocaleString()}
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      dispatch({ type: 'TOGGLE_CART' });
                      addToast({
                        type: 'success',
                        title: 'Ready to Order',
                        message: `Check out our ${deal.name}!`,
                        duration: 2000
                      });
                    }}
                    className="w-full btn-primary text-sm hover:shadow-lg transition-shadow" 
                    style={{ fontFamily: 'Merriweather, serif' }}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-center text-gray-900 mb-8" style={{ fontFamily: 'Merriweather, serif', letterSpacing: '-0.02em' }}>Current Promotions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
              >
                <div className={`${promo.color} p-3 text-white`}>
                  <div className="text-right">
                    <div className="text-lg font-bold" style={{ fontFamily: 'Merriweather, serif' }}>{promo.discount}</div>
                    <div className="text-xs opacity-90" style={{ fontFamily: 'Merriweather, serif' }}>{promo.validUntil}</div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-base font-bold text-gray-900 mb-2" style={{ fontFamily: 'Merriweather, serif', letterSpacing: '0.01em' }}>{promo.title}</h4>
                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Merriweather, serif', letterSpacing: '0.01em' }}>{promo.description}</p>
                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 mb-3" style={{ fontFamily: 'Merriweather, serif' }}>{promo.terms}</p>
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm" style={{ fontFamily: 'Merriweather, serif' }}>
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-primary-600 rounded-2xl p-6 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Merriweather, serif', letterSpacing: '-0.02em' }}>Stay Updated!</h3>
            <p className="text-primary-100 text-sm mb-4" style={{ fontFamily: 'Merriweather, serif', letterSpacing: '0.01em' }}>
              Subscribe to our newsletter and be the first to know about new promotions, menu items, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-primary-200 mt-3">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Social Media Campaign */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Merriweather, serif', letterSpacing: '-0.02em' }}>Join Our Social Media Campaign</h3>
          <p className="text-sm text-gray-600 mb-6" style={{ fontFamily: 'Merriweather, serif', letterSpacing: '0.01em' }}>
            Share your experience with <span className="font-semibold text-primary-600">#LagosShawarmaExperience</span>
          </p>
          <div className="bg-white rounded-xl shadow-lg p-4 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-primary-600" style={{ fontFamily: 'Merriweather, serif' }}>Free Shawarma</div>
                <p className="text-xs text-gray-600" style={{ fontFamily: 'Merriweather, serif' }}>Best Photo of Month</p>
              </div>
              <div>
                <div className="text-xl font-bold text-primary-600" style={{ fontFamily: 'Merriweather, serif' }}>₦500 Off</div>
                <p className="text-xs text-gray-600" style={{ fontFamily: 'Merriweather, serif' }}>Most Creative Post</p>
              </div>
              <div>
                <div className="text-xl font-bold text-primary-600" style={{ fontFamily: 'Merriweather, serif' }}>VIP Status</div>
                <p className="text-xs text-gray-600" style={{ fontFamily: 'Merriweather, serif' }}>Most Engaged Follower</p>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <button 
                onClick={() => {
                  addToast({
                    type: 'info',
                    title: 'Follow Us on Instagram',
                    message: 'Check out our latest updates and promotions!',
                    duration: 3000
                  });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm" 
                style={{ fontFamily: 'Merriweather, serif' }}
              >
                Follow on Instagram
              </button>
              <button 
                onClick={() => {
                  addToast({
                    type: 'info',
                    title: 'Like Us on Facebook',
                    message: 'Join our community for exclusive offers!',
                    duration: 3000
                  });
                }}
                className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm" 
                style={{ fontFamily: 'Merriweather, serif' }}
              >
                Like on Facebook
              </button>
              <button 
                onClick={() => {
                  addToast({
                    type: 'info',
                    title: 'Follow Us on Twitter',
                    message: 'Get real-time updates and announcements!',
                    duration: 3000
                  });
                }}
                className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm" 
                style={{ fontFamily: 'Merriweather, serif' }}
              >
                Follow on Twitter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
