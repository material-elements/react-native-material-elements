module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:testing-library/react'],
  ignorePatterns: ['*.js', '*.ts', '*.tsx', 'jest.*', 'metro.config.js', '.eslintrc.js'],
  overrides: [
    {
      files: ['src/**/*.{js,jsx,ts,tsx}'],
      rules: {
        'object-curly-spacing': ['error', 'always'],
        'unused-imports/no-unused-imports': 'error',
      },
    },
  ],
  env: { jest: true },
  parserOptions: {
    sourceType: 'module',
    useJSXTextNode: true,
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  plugins: ['unused-imports'],
};
