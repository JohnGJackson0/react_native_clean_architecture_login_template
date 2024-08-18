import React from 'react';
import Login from '../../../../../../lib/features/authentication/interfaces/views/Login';
import {
  fireEvent,
  render,
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

describe('login Presentation', () => {
  it('shows elements on page when initially loaded', () => {
    const props = createScreenTestProps();
    const {getByText, getByTestId} = render(<Login {...props} />);
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByText('Sign up')).toBeTruthy();
    expect(getByText('Forgot Password?')).toBeTruthy();
  });

  it('navigates to sign up when sign up button is pressed', () => {
    const props = createScreenTestProps();
    const {getByText} = render(<Login {...props} />);
    expect(getByText('Sign up')).toBeTruthy();
    fireEvent.press(getByText('Sign up'));
    expect(props.navigation.navigate).toHaveBeenCalledWith('SignUp');
  });

  it('navigates to home when useCase returns right|true', async () => {
    mockIOC.mockResolvedValue(E.right(true));
    const props = createScreenTestProps();
    const {getByTestId} = render(<Login {...props} />);
    fireEvent.press(getByTestId('login'));
    await waitForElementToBeRemoved(() => getByTestId('loading'));
    expect(props.navigation.reset).toBeCalledWith({
      index: 0,
      routes: [{name: 'Home'}],
    });
  });

  it('loads correctly', async () => {
    mockIOC.mockResolvedValue(E.right(true));
    const props = createScreenTestProps();
    const {getByTestId, queryByTestId} = render(<Login {...props} />);
    expect(queryByTestId('loading')).toBeFalsy();
    fireEvent.press(getByTestId('login'));
    expect(getByTestId('loading')).toBeTruthy();
    await waitForElementToBeRemoved(() => getByTestId('loading'));
    expect(queryByTestId('loading')).toBeFalsy();
  });

  it('shows error messages when useCase returns left|message', async () => {
    mockIOC.mockResolvedValue(E.left('fakeError'));
    const props = createScreenTestProps();
    const {getByText, getByTestId} = render(<Login {...props} />);
    fireEvent.press(getByTestId('login'));
    await waitForElementToBeRemoved(() => getByTestId('loading'));
    expect(getByText('fakeError')).toBeTruthy();
  });

  it('calls the login useCase with form input', async () => {
    mockIOC.mockResolvedValue(E.right(true));
    const props = createScreenTestProps();
    const {getByTestId} = render(<Login {...props} />);

    fireEvent.changeText(getByTestId('email-input'), 'fakeEmail');

    fireEvent.changeText(getByTestId('password-input'), 'fakePW');

    fireEvent.press(getByTestId('login'));
    await waitForElementToBeRemoved(() => getByTestId('loading'));

    expect(mockIOC).toBeCalledWith('fakeEmail', 'fakePW');
  });

  it('should navigate to forgot password when pressed', () => {
    mockIOC.mockResolvedValue(E.right(true));
    const props = createScreenTestProps();
    const {getByText} = render(<Login {...props} />);

    fireEvent.press(getByText('Forgot Password?'));

    expect(props.navigation.navigate).toBeCalledWith('ResetPassword');
  });
});
