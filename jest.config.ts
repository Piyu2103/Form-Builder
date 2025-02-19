import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Use 'node' for backend tests
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default config;