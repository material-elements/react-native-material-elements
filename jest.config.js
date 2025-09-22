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
    '.eslintrc.js',
    '.prettierrc.js',
    'babel.config.js',
  ],

  testPathIgnorePatterns: ['/node_modules', '/e2e'],

  coverageReporters: ['html', 'text', 'lcov', 'text-summary'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'mjs', 'svg', 'png'],
  testEnvironment: 'node',

  setupFiles: ['./jest.setup.ts'],

  coverageThreshold: {
    global: {
      statements: 80,
      branches: 79,
      functions: 80,
      lines: 80,
    },
  },
};
