import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
// import tailwindcss from 'tailwindcss'

// export default defineConfig({
//   plugins: [react()],
//   css: {
//     postcss: {
//       plugins: [tailwindcss()],
//     },
//   }
// })

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  const PORT = `${env.PORT ?? "8080"}`;
  console.log(env.PORT);
  return {
    plugins: [react()],
    preview: {
      port: Number(PORT),
      strictPort: true,
    },
    server: {
      port: Number(PORT),
      host: true,
      origin: `http://0.0.0.0:${PORT}`,
    },
  };
});