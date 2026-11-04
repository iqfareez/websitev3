import { defineEcConfig } from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

export default defineEcConfig({
    themes: ['github-light', 'github-dark'],
    useDarkModeMediaQuery: true,
    // Follow the system until a future switch sets <html data-theme="light|dark">.
    themeCssSelector: (theme) => `[data-theme="${theme.type}"]`,
    plugins: [pluginLineNumbers()],
    defaultProps: {
        showLineNumbers: false,
    },
    styleOverrides: {
        codeFontFamily: 'var(--font-geist-mono)',
        codeFontSize: '16px',
        codeLineHeight: '1.7',
    },
});
