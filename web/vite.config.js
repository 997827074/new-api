import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/))  return null

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        })
      },
    },
    react(),
  ],
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom', 'react-router-dom'],
          'semi-ui': ['@douyinfe/semi-icons', '@douyinfe/semi-ui'],
          'semantic': ['semantic-ui-css', 'semantic-ui-react'],
          'visactor': ['@visactor/react-vchart', '@visactor/vchart'],
          'tools': ['axios', 'history', 'marked'],
          'react-components': ['react-dropzone', 'react-fireworks', 'react-telegram-login', 'react-toastify', 'react-turnstile'],
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        changeOrigin: true,
      }
    }
  }
});
