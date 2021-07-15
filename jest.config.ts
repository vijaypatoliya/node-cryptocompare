import { defaults as tsjPreset } from 'ts-jest/presets'

module.exports = {
  transform: { ...tsjPreset.transform },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['.d.ts', '.js'],
  setupFilesAfterEnv: ['./test/jest.setup.ts'],
  verbose: true,
  // testSequencer: './it/testSequencer.ts',
  coverageDirectory: './test/coverage/',
  coverageReporters: ['html', 'text'],
  coverageThreshold: {
    global: {
      branches: 2.65,
      functions: 2.15,
      lines: 35.6,
      statements: 29.2,
    }
  }
}
