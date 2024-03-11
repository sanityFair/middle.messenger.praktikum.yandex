import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import atImport from 'postcss-import';
import atMixins from 'postcss-mixins';
import nested from 'postcss-nested';
import simpleVars from 'postcss-simple-vars';
import globalCssData from '@csstools/postcss-global-data';
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
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [svgLoader({ defaultImport: 'url' })],
    css: {
        postcss: {
            plugins: [
                atMixins(),
                autoprefixer(),
                globalCssData(),
                atImport(),
                nested(),
                simpleVars(),
            ],
        },
    },
});
