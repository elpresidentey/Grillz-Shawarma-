import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Locations from './components/Locations';
import Promotions from './components/Promotions';
import Footer from './components/Footer';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import ErrorBoundary from './components/ErrorBoundary';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './components/Toast';
import { useAnalytics } from './components/GoogleAnalytics';
import config from './config';

function App() {
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const { trackPageView, trackEvent } = useAnalytics();

  useEffect(() => {
    const handleShowOrderHistory = () => {
      setShowOrderHistory(true);
      trackEvent('order_history_viewed');
    };

    const handleBackToMenu = () => {
      setShowOrderHistory(false);
      trackEvent('back_to_menu');
    };

    window.addEventListener('showOrderHistory', handleShowOrderHistory);
    window.addEventListener('backToMenu', handleBackToMenu);
    
    return () => {
      window.removeEventListener('showOrderHistory', handleShowOrderHistory);
      window.removeEventListener('backToMenu', handleBackToMenu);
    };
  }, [trackEvent]);

  // Track page views
  useEffect(() => {
    trackPageView(showOrderHistory ? '/order-history' : '/');
  }, [showOrderHistory, trackPageView]);

  return (
    <ErrorBoundary>
      <CartProvider>
        <ToastProvider>
          <GoogleAnalytics />
          <div className="min-h-screen bg-white">
            <Header />
            <main className="animate-fadeIn">
              {showOrderHistory ? (
                <OrderHistory />
              ) : (
                <>
                  <Hero />
                  <Menu />
                  <Locations />
                  <Promotions />
                </>
              )}
            </main>
            <Footer />
          </div>
          <Cart />
        </ToastProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
