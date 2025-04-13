import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [{
  ignores: [
    'dist',
    'backend/migrations*', 'backend/db/Migration*',
    'backend/db/migrations*', 'backend/db/*/migrations*',
  ],
}, {
  files: ['**/*.{js,jsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: {
      ...globals.browser, ...globals.node, ...globals.es2020,
      // vitest globals
      vi: true, test: true, describe: true, expect: true,
    },
    parserOptions: {
      ecmaVersion: 'latest', ecmaFeatures: {jsx: true}, sourceType: 'module',
    },
  },
  plugins: {'react-hooks': reactHooks, 'react-refresh': reactRefresh},
  rules: {
    ...js.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    'no-trailing-spaces': 'error', 'linebreak-style': ['error', 'unix'],
    'indent': ['warn', 2],
    'quotes': ['error', 'single'], 'semi': ['error', 'never'],
    'eqeqeq': 'error',
    'no-unused-vars': [
      'error', {varsIgnorePattern: '^[A-Z_]'},
    ],
    'no-constant-condition': 'warn',
    'react-refresh/only-export-components': [
      'warn', {allowConstantExport: true},
    ],
  },
}]
