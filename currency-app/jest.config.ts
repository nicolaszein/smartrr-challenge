import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS modules
  },
  testMatch: ['**/*.test.tsx'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
}

export default config
