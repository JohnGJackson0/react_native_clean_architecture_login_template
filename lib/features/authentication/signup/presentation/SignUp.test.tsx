import React from 'react';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '../../../tests/render';
import SignUp from './SignUp';
import {createScreenTestProps} from '../../../tests/testUtils';

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
    const props = createScreenTestProps();
    const {getByText, getByTestId} = render(<SignUp {...props} />);
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('submit')).toBeTruthy();
  });

  it('signs in successfully when useCase returns a user', async () => {
    const props = createScreenTestProps();
    mockIOC.mockResolvedValue({
      email: 'fakeEmail@fake.com',
      password: 'fakePassword',
    });
    const {getByText, getByTestId} = render(<SignUp {...props} />);

    expect(getByText('Sign Up')).toBeTruthy();

    fireEvent.press(getByTestId('submit'));

    await waitForElementToBeRemoved(() => getByTestId('loading'));

    expect(props.navigation.navigate).toHaveBeenCalledWith('Confirm', {
      email: 'fakeEmail@fake.com',
      password: 'fakePassword',
    });
  });

  it('loads correctly on sign up', async () => {
    const props = createScreenTestProps();
    mockIOC.mockResolvedValue({
      email: 'fakeEmail@fake.com',
      password: 'fakePassword',
    });
    const {getByText, getByTestId, queryByTestId} = render(
      <SignUp {...props} />,
    );

    expect(getByText('Sign Up')).toBeTruthy();

    fireEvent.press(getByTestId('submit'));

    expect(getByTestId('loading')).toBeTruthy();

    await waitForElementToBeRemoved(() => getByTestId('loading'));

    expect(queryByTestId('loading')).toBeFalsy();
  });

  it('is sending the correct data', async () => {
    const props = createScreenTestProps();
    mockIOC.mockResolvedValue({
      email: 'fakeEmail@fake.com',
      password: 'fakePassword',
    });
    const {getByTestId} = render(<SignUp {...props} />);

    fireEvent.changeText(getByTestId('email-input'), 'fakeEmail');

    fireEvent.changeText(getByTestId('password-input'), 'fakePW');

    fireEvent.press(getByTestId('submit'));

    expect(getByTestId('loading')).toBeTruthy();

    await waitForElementToBeRemoved(() => getByTestId('loading'));

    expect(mockIOC).toHaveBeenCalledWith('fakeEmail', 'fakePW');
  });

  it('properly shows an error from useCase', async () => {
    const props = createScreenTestProps();
    mockIOC.mockRejectedValue('Error: Message');
    const {getByTestId, getByText, queryByText} = render(<SignUp {...props} />);
    expect(queryByText('Error: Message')).not.toBeTruthy();
    fireEvent.press(getByTestId('submit'));

    await waitFor(() => getByText('Error: Message'));
  });

  it('uses the usecase signedup user and not whatever is in the input', async () => {
    const props = createScreenTestProps();
    mockIOC.mockResolvedValue({
      email: 'fakeEmail@fake.com',
      password: 'fakePassword',
    });
    const {getByTestId} = render(<SignUp {...props} />);

    fireEvent.changeText(getByTestId('email-input'), 'fakeEmail');

    fireEvent.changeText(getByTestId('password-input'), 'fakePW');

    fireEvent.press(getByTestId('submit'));

    await waitForElementToBeRemoved(() => getByTestId('loading'));

    expect(props.navigation.navigate).toHaveBeenCalledWith('Confirm', {
      email: 'fakeEmail@fake.com',
      password: 'fakePassword',
    });
  });
});
