import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss'

 export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const PORT = `${env.PORT ?? "8080"}`;
  console.log(env.PORT);
  return {
   plugins: [react()],
   css: {
     postcss: {
       plugins: [tailwindcss()],
     },
     preview: {
      port: PORT,
      strictPort: true,
    },
     server: {
      port: PORT,
      host: true,
      origin: `http://0.0.0.0:${PORT}`,
    },
   }
  }
 })

