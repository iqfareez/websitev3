// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

/** @type {import('astro').AstroIntegration} */
const debugPages = {
    name: 'debug-pages',
    hooks: {
        'astro:config:setup': ({ command, injectRoute }) => {
            // Keep debug pages outside src/pages so builds cannot discover them.
            if (command !== 'dev') return;
            for (const page of ['admon', 'markdown']) {
                injectRoute({
                    pattern: `/debug/${page}`,
                    entrypoint: `./src/debug/${page}.astro`,
                });
            }
        },
    },
};

// https://astro.build/config
export default defineConfig({
    site: 'https://iqfareez.com',
    integrations: [mdx(), sitemap(), debugPages],

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
            provider: fontProviders.fontsource(),
            name: 'Geist Mono',
            cssVariable: '--font-geist-mono',
            weights: [400, 700],
            styles: ['normal'],
            fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
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
