/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json'
    }
  },
  preset: 'ts-jest',
  testEnvironment: 'node',

  collectCoverage: true,
  coverageDirectory: 'coverage'
};
