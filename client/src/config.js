const config = {
    // Vite uses import.meta.env for environment variables
    // VITE_API_URL should be set in .env.production or Vercel/Netlify dashboard
    API_URL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : `http://${window.location.hostname}:5000`)
};

export default config;
