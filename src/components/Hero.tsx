import React from 'react';
import { useToast } from './Toast';

const Hero: React.FC = () => {
  const { addToast } = useToast();
  return (
    <section
      id="home"
      className="bg-white py-10 lg:py-16 border-b border-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
          {/* Tagline */}
          <p className="inline-flex items-center rounded-full bg-orange-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-orange-600 mb-8">
            Fresh · Flame-Grilled · Lagos
          </p>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
            Taste the <br />
            <span className="gradient-text inline-block mt-3">Lagos Difference</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-12 max-w-2xl mx-auto lg:mx-0 font-medium">
            Experience authentic shawarma and grilled delicacies made with the
            finest ingredients. Every bite is crafted for serious flavor.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center lg:justify-start">
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
              className="btn-primary w-full sm:w-auto text-lg lg:text-xl whitespace-nowrap py-4 px-8"
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
              className="btn-outline w-full sm:w-auto text-lg lg:text-xl whitespace-nowrap py-4 px-8"
            >
              View Locations
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto lg:mx-0">
            <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-md px-4 py-5 sm:px-6 sm:py-6">
              <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">4.8</div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-600 mb-1">Rating</div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">2,500+ reviews</div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-md px-4 py-5 sm:px-6 sm:py-6">
              <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">30<span className="text-lg">min</span></div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-600 mb-1">Delivery</div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">Average time</div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-md px-4 py-5 sm:px-6 sm:py-6">
              <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">FREE</div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-600 mb-1">Delivery</div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">Above ₦3,000</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
