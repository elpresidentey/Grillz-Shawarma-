import React from 'react';
import { useToast } from './Toast';

const Hero: React.FC = () => {
  const { addToast } = useToast();
  return (
    <section id="home" className="bg-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Taste the
            <span className="text-orange-600"> Lagos Difference</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            Experience authentic shawarma and grilled delicacies made with the finest ingredients. 
            From classic chicken shawarma to spicy Lagos fire, we bring you the best of Nigerian street food culture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => {
                const menuSection = document.getElementById('menu');
                if (menuSection) {
                  menuSection.scrollIntoView({ behavior: 'smooth' });
                  addToast({
                    type: 'success',
                    title: 'Menu Opened',
                    message: 'Welcome to our delicious menu!',
                    duration: 3000
                  });
                }
              }}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 text-lg shadow-lg hover:shadow-xl"
            >
              Order Now
            </button>
            <button 
              onClick={() => {
                const locationsSection = document.getElementById('locations');
                if (locationsSection) {
                  locationsSection.scrollIntoView({ behavior: 'smooth' });
                  addToast({
                    type: 'info',
                    title: 'Locations Viewed',
                    message: 'Find your nearest Lagos Shawarma location!',
                    duration: 3000
                  });
                }
              }}
              className="border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-semibold py-4 px-8 rounded-lg transition-all duration-200 text-lg"
            >
              View Locations
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">4.8</div>
              <div className="text-gray-600 font-medium">Customer Rating</div>
              <div className="text-sm text-gray-500">2,500+ Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">30min</div>
              <div className="text-gray-600 font-medium">Delivery Time</div>
              <div className="text-sm text-gray-500">Fast & Fresh</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">FREE</div>
              <div className="text-gray-600 font-medium">Delivery</div>
              <div className="text-sm text-gray-500">Above ₦3,000</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
