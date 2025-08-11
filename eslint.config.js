const { defineConfig } = require('eslint/config');
const globals = require('globals');

module.exports = defineConfig([
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
  {
    rules: {
      "no-unused-vars": "warn",
    },
  },
]);
