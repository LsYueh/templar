const { defineConfig } = require('eslint/config');
const globals = require('globals');
const js = require('@eslint/js');

module.exports = defineConfig([
  { ignores: ["**/node_modules/", "**/dist/"] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
    },
  },
]);
