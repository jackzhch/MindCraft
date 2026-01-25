import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  // On Vercel, use process.env directly; locally, use loadEnv
  const apiKey = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY || '';
  
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    publicDir: 'public',
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(apiKey)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'stripe': ['@stripe/stripe-js'],
            'supabase': ['@supabase/supabase-js']
          }
        }
      }
    }
  };
});
