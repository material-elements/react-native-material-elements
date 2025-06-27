module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}'],

  coveragePathIgnorePatterns: [
    '/node_modules',
    './examples',
    './docs',
    './__test__',
    'src/libraries/themes/v1/colors',
    'src/libraries/themes/v1/sizes',
    'style.ts',
    'index.ts',
    'd.ts',
    '.consts.ts',
    '.enum.ts',
    '/config/',
    '/coverage/',
  ],

  coverageReporters: ['html', 'text', 'lcov', 'text-summary'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'mjs', 'svg', 'png'],
  testEnvironment: 'node',

  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
