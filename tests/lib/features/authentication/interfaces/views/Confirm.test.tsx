import React from 'react';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '../../../../../utils/render';
import {createScreenTestProps} from '../../../../../utils/testUtils';
import * as E from 'fp-ts/Either';
import PasswordResetVerification from '../../../../../../lib/features/authentication/interfaces/views/PasswordResetVerification';

const mockIOC = jest.fn();

jest.mock('../../../../../../lib/core/ioc/container', () => ({
  __esmodule: true,
  AppIOCContainer: {
    get: () => {
      return {
        execute: mockIOC,
      };
    },
  },
}));

jest.mock('react-native-confirmation-code-field');

describe('Password Reset Confirmation Presentation', () => {
  it('loads correctly', async () => {
    mockIOC.mockResolvedValue(E.right(true));
    const props = createScreenTestProps({email: 'fakeEmail'});
    const {queryByTestId, getByTestId} = render(
      <PasswordResetVerification {...props} />,
    );

    expect(queryByTestId('loading')).toBeFalsy();
    fireEvent.press(getByTestId('submit'));
    expect(getByTestId('loading')).toBeTruthy();
    await waitForElementToBeRemoved(() => getByTestId('loading'));
    expect(queryByTestId('loading')).toBeFalsy();
  });

  it('displays success message when it is successful', async () => {
    mockIOC.mockResolvedValue(E.right(true));
    const props = createScreenTestProps({email: 'fakeEmail'});
    const {getByTestId, getByText} = render(
      <PasswordResetVerification {...props} />,
    );
    fireEvent.press(getByTestId('submit'));
    expect(getByTestId('loading')).toBeTruthy();
    await waitForElementToBeRemoved(() => getByTestId('loading'));
    expect(getByText('Password has been reset!')).toBeTruthy();
  });

  it('shows an error message when returned left|string', async () => {
    mockIOC.mockResolvedValue(E.left('fakeMessage'));
    const props = createScreenTestProps({email: 'fakeEmail'});
    const {getByTestId, getByText} = render(
      <PasswordResetVerification {...props} />,
    );
    fireEvent.press(getByTestId('submit'));
    expect(getByTestId('loading')).toBeTruthy();
    await waitForElementToBeRemoved(() => getByTestId('loading'));
    expect(getByText('fakeMessage')).toBeTruthy();
  });
});
