import {jest} from '@jest/globals';
global.jest = jest;

jest.mock(
  '../../lib/features/authentication/interfaces/navigators/Navigator',
  () => {
    return {HEADER_HEIGHT: 95};
  },
);
