import React from 'react';
import { useToast } from './Toast';

const Hero: React.FC = () => {
  const { addToast } = useToast();
  return (
    <section
      id="home"
      className="section-gradient py-16 lg:py-28 border-b border-orange-100"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Text content */}
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700 mb-5">
              Fresh · Flame-Grilled · Lagos
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Taste the
              <span className="gradient-text"> Lagos Difference</span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Experience authentic shawarma and grilled delicacies made with the
              finest ingredients. From classic chicken wraps to spicy Lagos
              fire, every bite is crafted for serious flavor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-10">
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
              className="btn-primary w-full sm:w-auto text-base lg:text-lg"
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
              className="btn-outline w-full sm:w-auto text-base lg:text-lg"
            >
              View Locations
            </button>
          </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="rounded-2xl bg-white/80 shadow-md px-4 py-3 backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-gray-900 mb-1">
                  4.8
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Customer Rating
                </div>
                <div className="text-xs text-gray-400 mt-1">2,500+ reviews</div>
              </div>
              <div className="rounded-2xl bg-white/80 shadow-md px-4 py-3 backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-gray-900 mb-1">
                  30min
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Average Delivery
                </div>
                <div className="text-xs text-gray-400 mt-1">Across Lagos</div>
              </div>
              <div className="rounded-2xl bg-white/80 shadow-md px-4 py-3 backdrop-blur-sm">
                <div className="text-2xl font-extrabold text-gray-900 mb-1">
                  FREE
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Delivery
                </div>
                <div className="text-xs text-gray-400 mt-1">Above ₦3,000</div>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative max-w-xl mx-auto lg:max-w-none">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-orange-100 via-amber-100 to-orange-50 opacity-80 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl shadow-orange-100">
              <img
                src="/images/classic-chicken-shawarma.jpg"
                alt="Fresh Lagos-style shawarma wrap"
                className="h-72 w-full object-cover sm:h-80 lg:h-96"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-black/60 px-4 py-3 text-xs text-white backdrop-blur">
                <div>
                  <p className="font-semibold">Signature Lagos Shawarma</p>
                  <p className="text-[11px] text-orange-100">
                    Flame-grilled chicken, creamy garlic sauce & fresh veggies.
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-end">
                  <span className="rounded-full bg-orange-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
                    Best Seller
                  </span>
                  <span className="mt-1 text-[11px] text-orange-100">
                    From ₦2,800
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
