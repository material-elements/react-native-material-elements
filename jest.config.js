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
    'style.ts',
    'styles.ts',
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

  setupFiles: ['./jest.setup.ts'],

  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
