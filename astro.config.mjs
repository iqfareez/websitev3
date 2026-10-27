// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://iqfareez.com',
    integrations: [mdx(), sitemap()],

    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: 'Source Sans 3',
            cssVariable: '--font-source-sans-3',
            weights: [300, 400, 600, 700],
            styles: ['normal', 'italic'],
            fallbacks: ['Arial', 'sans-serif'],
        },
        {
            provider: fontProviders.local(),
            name: 'Atkinson',
            cssVariable: '--font-atkinson',
            fallbacks: ['sans-serif'],
            options: {
                variants: [
                    {
                        src: ['./src/assets/fonts/atkinson-regular.woff'],
                        weight: 400,
                        style: 'normal',
                        display: 'swap',
                    },
                    {
                        src: ['./src/assets/fonts/atkinson-bold.woff'],
                        weight: 700,
                        style: 'normal',
                        display: 'swap',
                    },
                ],
            },
        },
    ],

    vite: {
        plugins: [tailwindcss()],
    },
});