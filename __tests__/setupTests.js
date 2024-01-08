import '@testing-library/jest-native/extend-expect';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import 'react-native-config';
process.env.RN_ENV = 'staging';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native-config', () => {
  return {
    BACKEND_URL: 'test.com',
    THIRD_PARTY_URL: 'test',
    GRAPHQL_URL: '',
    WEBSITE_URL: '',
    VALIDATE_TFA: 'false',
    DOCUMENT_WORKER_URL: '',
    ENV: '',
    FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD: '',
    GOOGLE_BUILD_KEY_PASSWORD: true,
  };
});

jest.mock('react-native-share', () => ({
  default: jest.fn()
}));

jest.mock('react-native-fs', () => ({
  exists: jest.fn(),
  unlink: jest.fn(),
  downloadFile: jest.fn()
}));

test('dummy test/setup test', () => {
  expect(true).toBeTruthy();
});
