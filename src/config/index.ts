// Configuration utility for environment variables
export const config = {
  // API Configuration
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  environment: process.env.REACT_APP_ENVIRONMENT || 'development',
  
  // Business Configuration
  taxRate: parseFloat(process.env.REACT_APP_TAX_RATE || '0.075'),
  deliveryFee: parseInt(process.env.REACT_APP_DELIVERY_FEE || '500'),
  freeDeliveryThreshold: parseInt(process.env.REACT_APP_FREE_DELIVERY_THRESHOLD || '3000'),
  estimatedDeliveryTime: process.env.REACT_APP_ESTIMATED_DELIVERY_TIME || '30-45',
  
  // Company Information
  companyName: process.env.REACT_APP_COMPANY_NAME || 'Lagos Shawarma & Grills',
  companyPhone: process.env.REACT_APP_COMPANY_PHONE || '+234 800 000 0000',
  companyEmail: process.env.REACT_APP_COMPANY_EMAIL || 'info@lagosshawarma.com',
  
  // Analytics
  googleAnalyticsId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
  sentryDsn: process.env.REACT_APP_SENTRY_DSN,
  
  // Feature Flags
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
};

export default config;
