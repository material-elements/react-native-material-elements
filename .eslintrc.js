module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:testing-library/react'],
  ignorePatterns: ['.eslintrc.js', '**/*.test.tsx', '**/*.test.ts'],
  env: { jest: true },
  parserOptions: {
    sourceType: 'module',
    useJSXTextNode: true,
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  plugins: ['unused-imports'],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'unused-imports/no-unused-imports': 'error',
    complexity: ['error', 8],
    'import/extensions': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
  },
};
