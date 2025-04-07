import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';

export default defineConfig([
  globalIgnores(['frontend/public/assets/**/*.{js,mjs,cjs}']),
  { files: ['**/*.{js,mjs,cjs}'] },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
]);
