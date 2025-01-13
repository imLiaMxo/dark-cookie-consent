import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/DarkCookieConsent.js',
    output: {
        file: 'dist/dark-cookie-consent.js',
        format: 'umd',
        name: 'CookieConsent',
    },
    plugins: [
        resolve(),
        commonjs(),
        postcss({
            extensions: ['.css']
        })
    ]
};
