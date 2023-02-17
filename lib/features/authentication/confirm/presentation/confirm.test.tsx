import React from 'react';
import Confirm from './Confirm';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '../../../tests/render';
import {createScreenTestProps} from '../../../tests/testUtils';

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

describe('Confirm Presenation', () => {
  it('loads when submitting useCase ', async () => {
    const props = createScreenTestProps();
    mockIOC.mockResolvedValue({
      refreshToken: 'fakeRefresh',
      jwt: 'fakeJWT',
    });
    const {queryByTestId, getByTestId, getByText} = render(
      <Confirm {...props} />,
    );
    expect(queryByTestId('loading')).toBeFalsy();
    fireEvent.press(getByTestId('submit'));
    expect(getByTestId('loading')).toBeTruthy();
    await waitForElementToBeRemoved(() => getByText('Submit'));
    expect(queryByTestId('loading')).toBeFalsy();
  });

  it('shows elements on page when initially loaded', () => {
    const props = createScreenTestProps();
    const {getByText, getByTestId} = render(<Confirm {...props} />);
    expect(getByText('Please confirm your email.')).toBeTruthy();
    expect(getByTestId('confirm-input')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('shows logged in when returned a jwt and refresh token', async () => {
    const props = createScreenTestProps();
    mockIOC.mockResolvedValue({
      refreshToken: 'fakeRefresh',
      jwt: 'fakeJWT',
    });
    const {getByText} = render(<Confirm {...props} />);
    fireEvent.press(getByText('Submit'));
    await waitForElementToBeRemoved(() => getByText('Submit'));
    expect(getByText('Logged In Successful')).toBeTruthy();
  });

  it('properly shows an error message', async () => {
    const props = createScreenTestProps();
    mockIOC.mockRejectedValue('Error: Message');
    const {getByTestId, getByText, queryByText} = render(
      <Confirm {...props} />,
    );
    expect(queryByText('Error: Message')).not.toBeTruthy();
    fireEvent.press(getByTestId('submit'));

    await waitFor(() => getByText('Error: Message'));
  });
});
