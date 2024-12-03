import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    // Expose env variables
    define: {
      'process.env.VITE_STRIPE_PUBLIC_KEY': JSON.stringify(env.VITE_STRIPE_PUBLIC_KEY)
    },
    // Log env variables during build
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'MISSING_ENV_VAR') {
            console.error('Missing environment variable:', warning.message);
          }
          warn(warning);
        }
      }
    }
  };
});
