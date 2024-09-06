import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    {
        languageOptions: {
            globals: globals.browser,
            ecmaVersion: 'latest', // Supports modern ECMAScript features
            sourceType: 'module' // Supports the use of `import` and `export`
        },
        plugins: {
            prettier: prettierPlugin
        },
        rules: {
            'no-console': 'warn', // Warns on `console.log`
            'prettier/prettier': 'error' // Reports Prettier formatting issues as errors
        }
    },
    pluginJs.configs.recommended
];
