import React from 'react';
import { 
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  const locations = [
    {
      name: 'Ikoyi Branch',
      address: '123 Awolowo Road, Ikoyi, Lagos',
      phone: '+234 800 000 0001'
    },
    {
      name: 'Lekki Branch',
      address: '456 Lekki-Epe Expressway, Lekki Phase 1, Lagos',
      phone: '+234 800 000 0002'
    },
    {
      name: 'Yaba Branch',
      address: '789 Herbert Macaulay Way, Yaba, Lagos',
      phone: '+234 800 000 0003'
    }
  ];

  const operatingHours = [
    { day: 'Monday - Friday', hours: '10:00 AM - 10:00 PM' },
    { day: 'Saturday - Sunday', hours: '11:00 AM - 11:00 PM' },
    { day: 'Public Holidays', hours: '12:00 PM - 9:00 PM' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-2xl font-bold text-primary-500 mb-4">
              Grillz Shawarma
            </h3>
            <p className="text-gray-300 mb-4">
              Taste the Lagos Difference. Serving authentic shawarma and grilled delicacies with the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                <GlobeAltIcon className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                <GlobeAltIcon className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                <GlobeAltIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#menu" className="text-gray-300 hover:text-primary-500 transition-colors">Menu</a></li>
              <li><a href="#locations" className="text-gray-300 hover:text-primary-500 transition-colors">Locations</a></li>
              <li><a href="#promotions" className="text-gray-300 hover:text-primary-500 transition-colors">Special Offers</a></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Locations</h4>
            <div className="space-y-3">
              {locations.map((location, index) => (
                <div key={index} className="text-gray-300">
                  <div className="flex items-start">
                    <MapPinIcon className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-primary-500" />
                    <div>
                      <p className="font-medium text-white">{location.name}</p>
                      <p className="text-sm">{location.address}</p>
                      <p className="text-sm">{location.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact & Hours</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <PhoneIcon className="h-4 w-4 mr-2 text-primary-500" />
                <span>+234 800 000 0000</span>
              </div>
              <div className="flex items-center text-gray-300">
                <EnvelopeIcon className="h-4 w-4 mr-2 text-primary-500" />
                <span>info@lagosshawarma.com</span>
              </div>
              <div className="border-t border-gray-700 pt-3">
                <h5 className="font-medium text-white mb-2">Operating Hours</h5>
                {operatingHours.map((schedule, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-300 mb-1">
                    <ClockIcon className="h-3 w-3 mr-2 text-primary-500" />
                    <span>{schedule.day}: {schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Grillz Shawarma. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-primary-500 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-primary-500 text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
