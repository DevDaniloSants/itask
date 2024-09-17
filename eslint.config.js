import globals from 'globals';
import pluginJs from '@eslint/js';
import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: { ...globals.browser, ...globals.node, ...globals.jest },
        },
    },
    pluginJs.configs.recommended,
];
