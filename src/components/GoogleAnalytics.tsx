import React, { useEffect } from 'react';
import config from '../config';

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    // Only load and initialize Google Analytics if ID is available
    if (!config.googleAnalyticsId) {
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Create gtag function if it doesn't exist
    const gtag = window.gtag || function(...args: any[]) {
      window.dataLayer!.push(arguments);
    };
    window.gtag = gtag;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`;
    script.onload = () => {
      // Initialize gtag after script loads
      window.gtag?.('js', new Date());
      window.gtag?.('config', config.googleAnalyticsId);
    };
    document.head.appendChild(script);
  }, []);

  // Track page views only when gtag is available
  useEffect(() => {
    if (config.googleAnalyticsId && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, []);

  return null; // This component doesn't render anything
};

// Custom hook for tracking events
export const useAnalytics = () => {
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (config.googleAnalyticsId && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  const trackPageView = (pagePath: string) => {
    if (config.googleAnalyticsId && window.gtag) {
      window.gtag('config', config.googleAnalyticsId, {
        page_path: pagePath,
      });
    }
  };

  const trackPurchase = (orderId: string, total: number, items: any[]) => {
    if (config.googleAnalyticsId && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: orderId,
        value: total,
        items: items,
      });
    }
  };

  return {
    trackEvent,
    trackPageView,
    trackPurchase,
  };
};

export default GoogleAnalytics;
