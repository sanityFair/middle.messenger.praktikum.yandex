import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';
import path from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                app: 'src/app/app.ts',
                html: 'index.html',
            },
        },
    },
    server: {
        proxy: {
            '/api/v2': {
                target: 'https://ya-praktikum.tech/api/v2',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [svgLoader({ defaultImport: 'url' })],
});
