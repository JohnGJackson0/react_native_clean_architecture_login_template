import React from 'react';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '../../../tests/render';
import SignUp from './SignUp';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const mockIOC = jest.fn();

jest.mock('../../../../core/ioc/container', () => ({
  __esmodule: true,
  AppIOCContainer: {
    get: () => {
      return {
        execute: mockIOC,
      };
    },
  },
}));

describe('signUp Presentation', () => {
  it('shows elements on page when initially loaded', () => {
    const {getByText, getByTestId} = render(<SignUp />);
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('submit')).toBeTruthy();
  });

  it('signs in successfully when useCase returns a user', async () => {
    mockIOC.mockResolvedValue({
      email: 'fakeEmail@fake.com',
      password: 'fakePassword',
    });
    const {getByText, getByTestId} = render(<SignUp />);

    expect(getByText('Sign Up')).toBeTruthy();

    fireEvent.press(getByTestId('submit'));

    await waitForElementToBeRemoved(() => getByTestId('submit'));

    expect(getByText('Sign Up Success fakeEmail@fake.com')).toBeTruthy();
  });

  it('loads correctly on sign up', async () => {
    mockIOC.mockResolvedValue({
      email: 'fakeEmail@fake.com',
      password: 'fakePassword',
    });
    const {getByText, getByTestId, queryByTestId} = render(<SignUp />);

    expect(getByText('Sign Up')).toBeTruthy();

    fireEvent.press(getByTestId('submit'));

    expect(getByTestId('loading')).toBeTruthy();

    await waitForElementToBeRemoved(() => getByTestId('submit'));

    expect(queryByTestId('loading')).toBeFalsy();
  });

  it('is sending the correct data', async () => {
    mockIOC.mockResolvedValue({
      email: 'fakeEmail@fake.com',
      password: 'fakePassword',
    });
    const {getByTestId} = render(<SignUp />);

    fireEvent.changeText(getByTestId('email-input'), 'fakeEmail');

    fireEvent.changeText(getByTestId('password-input'), 'fakePW');

    fireEvent.press(getByTestId('submit'));

    expect(getByTestId('loading')).toBeTruthy();

    await waitForElementToBeRemoved(() => getByTestId('submit'));

    expect(mockIOC).toHaveBeenCalledWith('fakeEmail', 'fakePW');
  });

  it('properly shows an error from useCase', async () => {
    mockIOC.mockRejectedValue('Error: Message');
    const {getByTestId, getByText, queryByText} = render(<SignUp />);
    expect(queryByText('Error: Message')).not.toBeTruthy();
    fireEvent.press(getByTestId('submit'));

    await waitFor(() => getByText('Error: Message'));
  });
});
