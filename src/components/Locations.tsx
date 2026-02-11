import React, { useState } from 'react';
import { 
  MapPinIcon, 
  PhoneIcon, 
  ClockIcon,
  StarIcon,
  MapIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
  rating: number;
  reviewCount: number;
  image: string;
}

const Locations: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('ikoyi');

  const locations: Location[] = [
    {
      id: 'ikoyi',
      name: 'Ikoyi Branch',
      address: '123 Awolowo Road, Ikoyi, Lagos',
      phone: '+234 800 000 0001',
      email: 'ikoyi@lagosshawarma.com',
      hours: {
        weekdays: '10:00 AM - 10:00 PM',
        weekends: '11:00 AM - 11:00 PM'
      },
      coordinates: { lat: 6.4527, lng: 3.3947 },
      features: ['Dine-in', 'Takeout', 'Delivery', 'Parking Available'],
      rating: 4.8,
      reviewCount: 1250,
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'lekki',
      name: 'Lekki Branch',
      address: '456 Lekki-Epe Expressway, Lekki Phase 1, Lagos',
      phone: '+234 800 000 0002',
      email: 'lekki@lagosshawarma.com',
      hours: {
        weekdays: '10:00 AM - 10:00 PM',
        weekends: '11:00 AM - 11:00 PM'
      },
      coordinates: { lat: 6.4419, lng: 3.4762 },
      features: ['Dine-in', 'Takeout', 'Delivery', 'Outdoor Seating'],
      rating: 4.7,
      reviewCount: 980,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'yaba',
      name: 'Yaba Branch',
      address: '789 Herbert Macaulay Way, Yaba, Lagos',
      phone: '+234 800 000 0003',
      email: 'yaba@lagosshawarma.com',
      hours: {
        weekdays: '10:00 AM - 9:00 PM',
        weekends: '11:00 AM - 10:00 PM'
      },
      coordinates: { lat: 6.5244, lng: 3.3792 },
      features: ['Dine-in', 'Takeout', 'Delivery', 'Student Discount'],
      rating: 4.6,
      reviewCount: 750,
      image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const currentLocation = locations.find(loc => loc.id === selectedLocation) || locations[0];

  const getDirections = (location: Location) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <section id="locations" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <MapPinIcon className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Our <span className="text-primary-600">Locations</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
              Find us at multiple convenient locations across Lagos
            </p>
            <p className="text-lg text-gray-500 font-medium">
              Visit us for the best shawarma experience!
            </p>
          </div>
        </div>

        {/* Location Selector */}
        <div className="flex flex-wrap justify-center mb-12">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location.id)}
              className={`px-6 py-3 m-2 rounded-lg font-medium transition-all duration-200 ${
                selectedLocation === location.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {location.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Location Image and Map */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary-500 to-primary-700 h-64">
              {/* Wavy Animation */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,100 C150,50 300,150 450,100 C600,50 750,150 900,100 L900,400 L0,400 Z"
                    fill="url(#wave-gradient)"
                    className="animate-pulse"
                  >
                    <animate
                      attributeName="d"
                      values="M0,100 C150,50 300,150 450,100 C600,50 750,150 900,100 L900,400 L0,400 Z;
                              M0,120 C150,70 300,170 450,120 C600,70 750,170 900,120 L900,400 L0,400 Z;
                              M0,100 C150,50 300,150 450,100 C600,50 750,150 900,100 L900,400 L0,400 Z"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path
                    d="M0,150 C200,100 400,200 600,150 C800,100 1000,200 1200,150 L1200,400 L0,400 Z"
                    fill="url(#wave-gradient)"
                    className="animate-pulse"
                    style={{ animationDelay: '1s' }}
                  >
                    <animate
                      attributeName="d"
                      values="M0,150 C200,100 400,200 600,150 C800,100 1000,200 1200,150 L1200,400 L0,400 Z;
                              M0,170 C200,120 400,220 600,170 C800,120 1000,220 1200,170 L1200,400 L0,400 Z;
                              M0,150 C200,100 400,200 600,150 C800,100 1000,200 1200,150 L1200,400 L0,400 Z"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>
              
              {/* Location Info Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold mb-1">{currentLocation.name}</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{currentLocation.rating}</span>
                  </div>
                  <span className="text-white/80">({currentLocation.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-2xl p-8 text-center">
              <MapPinIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h4>
              <p className="text-gray-600 mb-4">Get directions to {currentLocation.name}</p>
              <button
                onClick={() => getDirections(currentLocation)}
                className="btn-primary inline-flex items-center"
              >
                <MapIcon className="h-5 w-5 mr-2" />
                Get Directions
              </button>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">{currentLocation.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <PhoneIcon className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">{currentLocation.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <EnvelopeIcon className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">{currentLocation.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Operating Hours</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Monday - Friday</p>
                    <p className="text-gray-600">{currentLocation.hours.weekdays}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Saturday - Sunday</p>
                    <p className="text-gray-600">{currentLocation.hours.weekends}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Features & Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {currentLocation.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-primary-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Ready to Visit?</h3>
              <p className="text-primary-100 mb-4">
                Experience the best shawarma in Lagos at our {currentLocation.name.toLowerCase()}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => {
                    const menuSection = document.getElementById('menu');
                    if (menuSection) {
                      menuSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Order Online
                </button>
                <button 
                  onClick={() => {
                    window.open(`tel:${currentLocation.phone.replace(/\s+/g, '')}`, '_blank');
                  }}
                  className="bg-primary-700 hover:bg-primary-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All Locations Overview */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">All Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div
                key={location.id}
                className={`bg-white rounded-xl shadow-md p-6 border-2 cursor-pointer transition-all duration-200 ${
                  selectedLocation === location.id
                    ? 'border-primary-600 shadow-lg'
                    : 'border-transparent hover:border-gray-200'
                }`}
                onClick={() => setSelectedLocation(location.id)}
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{location.name}</h4>
                <p className="text-gray-600 text-sm mb-3">{location.address}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{location.rating}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLocation(location.id);
                      const locationsSection = document.getElementById('locations');
                      if (locationsSection) {
                        locationsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
