import React from 'react';
import ResetPassword from '../../../../../../lib/features/authentication/interfaces/views/ResetPassword';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '../../../../../utils/render';
import {createScreenTestProps} from '../../../../../utils/testUtils';
import * as E from 'fp-ts/Either';

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

describe('ResetPassword Presentation', () => {
  it('should load initial elements', () => {
    const props = createScreenTestProps();

    const {getByText, getByTestId} = render(<ResetPassword {...props} />);

    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByText('Reset Password')).toBeTruthy();
  });

  it('should navigate to password reset verification when pressed with the correct parameter as long as there is no error', async () => {
    mockIOC.mockResolvedValue(E.right(true));
    const props = createScreenTestProps();

    const {getByText, getByTestId} = render(<ResetPassword {...props} />);

    fireEvent.changeText(getByTestId('email-input'), 'fakeEmail');

    fireEvent.press(getByText('Reset Password'));
    await waitForElementToBeRemoved(() => getByTestId('loading'));

    expect(props.navigation.navigate).toHaveBeenCalledWith(
      'PasswordResetVerification',
      {email: 'fakeEmail'},
    );
  });

  it('should not navigate to password verification when there is an error', async () => {
    mockIOC.mockResolvedValue(E.left('error'));
    const props = createScreenTestProps();

    const {getByText, getByTestId} = render(<ResetPassword {...props} />);

    fireEvent.changeText(getByTestId('email-input'), 'fakeEmail');

    fireEvent.press(getByText('Reset Password'));

    await waitForElementToBeRemoved(() => getByTestId('loading'));

    expect(props.navigation.navigate).not.toHaveBeenCalled();
  });

  it('correctly shows an error', async () => {
    mockIOC.mockResolvedValue(E.left('error'));
    const props = createScreenTestProps();

    const {getByText, getByTestId} = render(<ResetPassword {...props} />);

    fireEvent.press(getByText('Reset Password'));

    await waitForElementToBeRemoved(() => getByTestId('loading'));

    expect(getByText('error')).toBeTruthy();
  });

  it('correctly shows a loading indicator', async () => {
    mockIOC.mockResolvedValue(E.right(true));
    const props = createScreenTestProps();

    const {getByText, getByTestId, queryByTestId} = render(
      <ResetPassword {...props} />,
    );

    expect(queryByTestId('loading')).toBeFalsy();

    fireEvent.press(getByText('Reset Password'));

    expect(getByTestId('loading')).toBeTruthy();

    await waitForElementToBeRemoved(() => getByTestId('loading'));

    expect(queryByTestId('loading')).toBeFalsy();
  });
});
