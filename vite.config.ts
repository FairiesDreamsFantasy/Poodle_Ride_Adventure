import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'move-script-to-body',
        transformIndexHtml(html) {
          // Find the main script tag injected by Vite
          const scriptTagMatch = html.match(/<script type="module" crossorigin src=".*"><\/script>/);
          if (scriptTagMatch) {
            const scriptTag = scriptTagMatch[0];
            // Remove it from its current position
            let newHtml = html.replace(scriptTag, '');
            // Insert it before the closing body tag
            newHtml = newHtml.replace('</body>', `  ${scriptTag}\n  </body>`);
            return newHtml;
          }
          return html;
        }
      }
    ],
    base: './',
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    build: {
      outDir: 'Poodle_Ride_Adventure_Build',
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
          entryFileNames: 'Assets/Game_Workings/index.js',
          chunkFileNames: 'Assets/Game_Workings/[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'Assets/CSS/Game_Style.css';
            }
            return 'Assets/Images/[name].[ext]';
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
