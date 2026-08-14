import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';

export default defineConfig({
  output: 'static',
  site: 'https://maheshagro.com',
  integrations: [
    preact({ compat: false }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
