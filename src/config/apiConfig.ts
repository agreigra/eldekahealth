
// API configuration

// This would typically come from environment variables
// For production, use your actual API URL
export const API_CONFIG = {
  BASE_URL: import.meta.env.PROD 
    ? 'https://api.medicalsolutions.com/api/v1'  // Production API URL
    : '/api',                                   // Development proxy
  
  // Add other API configuration options here
  TIMEOUT: 30000,                              // 30 seconds
  
  // Feature flags
  FEATURES: {
    ENABLE_CACHE: true,
    RETRY_FAILED_REQUESTS: true,
  }
};

export default API_CONFIG;
