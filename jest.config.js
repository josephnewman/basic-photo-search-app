module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': require.resolve('vue-jest'),
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': require.resolve(
      'jest-transform-stub'
    ),
    '^.+\\.jsx?$': require.resolve('babel-jest')
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testEnvironment: 'jest-environment-jsdom-fifteen',
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/(*.)spec.js'],
  testURL: 'http://localhost/',
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname')
  ],
  collectCoverageFrom: [
    '**/src/**/*.{js,vue}',
    '!**/*/index.js',
    '!**/node_modules/**',
    '!src/main.js', // we do not need to collect coverage from the bootstrapped main.js
    '!src/constants/**/*.js' // we do not need to check our constants
  ],
  collectCoverage: true
};
