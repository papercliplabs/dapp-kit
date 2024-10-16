export default {
  preset: 'ts-jest/presets/default-esm', // Preset for ESM support with ts-jest
  testEnvironment: 'node',               // Test environment
  extensionsToTreatAsEsm: ['.ts', '.tsx'],  // Treat TypeScript files as ESM
  transform: {
    '^.+\\.ts?$': ['ts-jest', {           // Configure ts-jest directly in transform
      useESM: true                        // Set ESM mode directly here
    }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(test).ts?(x)']
};
