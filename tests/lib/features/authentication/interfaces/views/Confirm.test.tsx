import React from 'react';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '../../../../../utils/render';
import {createScreenTestProps} from '../../../../../utils/testUtils';
import Confirm from '../../../../../../lib/features/authentication/interfaces/views/Confirm';
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

describe('Confirm Presenation', () => {
  it('loads when submitting useCase ', async () => {
    const props = createScreenTestProps({
      email: 'fakeEmail@fakeEmail.com',
      password: 'fakePassword',
    });
    mockIOC.mockResolvedValue(
      E.right({
        refreshToken: 'fakeRefresh',
        jwt: 'fakeJWT',
      }),
    );
    const {queryByTestId, getByTestId} = render(<Confirm {...props} />);
    expect(queryByTestId('loading')).toBeFalsy();
    fireEvent.press(getByTestId('submit'));
    expect(getByTestId('loading')).toBeTruthy();
    await waitForElementToBeRemoved(() => getByTestId('loading'));
  });

  it('shows elements on page when initially loaded', () => {
    const props = createScreenTestProps({
      email: 'fakeEmail@fakeEmail.com',
      password: 'fakePassword',
    });
    const {getByText, getByTestId} = render(<Confirm {...props} />);
    expect(getByText('Please confirm your email.')).toBeTruthy();
    expect(getByTestId('confirm-input')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('navigates to home screen when returned a jwt and refresh token', async () => {
    const props = createScreenTestProps({
      email: 'fakeEmail@fakeEmail.com',
      password: 'fakePassword',
    });
    mockIOC.mockResolvedValue(
      E.right({
        refreshToken: 'fakeRefresh',
        jwt: 'fakeJWT',
      }),
    );
    const {getByText, getByTestId} = render(<Confirm {...props} />);
    fireEvent.press(getByText('Submit'));

    await waitForElementToBeRemoved(() => getByTestId('loading'));
    expect(props.navigation.replace).toHaveBeenCalledWith('Home');
    expect(props.navigation.replace).toHaveBeenCalledTimes(1);
  });

  it('does not navigate to home on an error', async () => {
    const props = createScreenTestProps({
      email: 'fakeEmail@fakeEmail.com',
      password: 'fakePassword',
    });
    mockIOC.mockRejectedValue('Error: Message');
    const {getByTestId, getByText, queryByText} = render(
      <Confirm {...props} />,
    );
    expect(queryByText('Error: Message')).not.toBeTruthy();

    fireEvent.press(getByTestId('submit'));

    await waitFor(() => getByText('Error: Message'));
    expect(props.navigation.replace).not.toHaveBeenCalledTimes(1);
  });

  it('properly shows an error message', async () => {
    const props = createScreenTestProps({
      email: 'fakeEmail@fakeEmail.com',
      password: 'fakePassword',
    });
    mockIOC.mockRejectedValue('Error: Message');
    const {getByTestId, getByText, queryByText} = render(
      <Confirm {...props} />,
    );
    expect(queryByText('Error: Message')).not.toBeTruthy();

    fireEvent.press(getByTestId('submit'));

    await waitFor(() => getByText('Error: Message'));
  });

  it('properly shows a message on expected errors', async () => {
    const props = createScreenTestProps({
      email: 'fakeEmail@fakeEmail.com',
      password: 'fakePassword',
    });

    mockIOC.mockResolvedValue(E.left('Error: Message'));
    const {getByTestId, getByText, queryByText} = render(
      <Confirm {...props} />,
    );
    expect(queryByText('Error: Message')).not.toBeTruthy();

    fireEvent.press(getByTestId('submit'));

    await waitFor(() => getByText('Error: Message'));
  });

  it('properly calls the useCase', async () => {
    const props = createScreenTestProps({
      email: 'fakeEmail@fakeEmail.com',
      password: 'fakePassword',
    });
    mockIOC.mockResolvedValue(
      E.right({
        refreshToken: 'fakeRefresh',
        jwt: 'fakeJWT',
      }),
    );
    const {getByText, getByTestId} = render(<Confirm {...props} />);

    fireEvent.changeText(getByTestId('confirm-input'), 'fakeCode');

    fireEvent.press(getByText('Submit'));

    await waitForElementToBeRemoved(() => getByTestId('loading'));

    expect(mockIOC).toHaveBeenCalledWith(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
      'fakeCode',
    );
  });
});
