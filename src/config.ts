// Frontend API configuration
const rawUrl = 
  import.meta.env.VITE_API_BASE_URL || 
  import.meta.env.API_BASE_URL || 
  (import.meta.env.DEV ? '' : 'https://codesthinker-backend.vercel.app');

export const API_BASE_URL = rawUrl.replace(/\/+$/, '');
