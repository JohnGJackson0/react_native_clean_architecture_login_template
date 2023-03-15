import React from 'react';
import * as E from 'fp-ts/Either';
import {render, waitForElementToBeRemoved} from '../../../../../utils/render';
import Home from '../../../../../../lib/features/authentication/interfaces/views/Home';
import {createScreenTestProps} from '../../../../../utils/testUtils';

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

describe('Home Presentation', () => {
  it('shows a loading indicator when rendering', async () => {
    mockIOC.mockResolvedValue(
      E.right({
        email: 'testEmail@testEmail.com',
        verifiedEmail: true,
      }),
    );
    const props = createScreenTestProps();

    const {getByTestId, queryByTestId} = render(<Home {...props} />);

    expect(getByTestId('loading')).toBeTruthy();

    await waitForElementToBeRemoved(() => queryByTestId('loading'));
  });

  it('shows email and verified info when finished loading', async () => {
    const props = createScreenTestProps();
    mockIOC.mockResolvedValue(
      E.right({
        email: 'testEmail@testEmail.com',
        verifiedEmail: true,
      }),
    );
    const {getByTestId, queryByTestId, getByText} = render(<Home {...props} />);

    expect(getByTestId('loading')).toBeTruthy();

    expect(queryByTestId('testEmail@testEmail.com')).toBeFalsy();
    expect(queryByTestId('Your Email has been verified.')).toBeFalsy();

    await waitForElementToBeRemoved(() => queryByTestId('loading'));

    expect(getByText('testEmail@testEmail.com')).toBeTruthy();
    expect(getByText('Your Email has been verified.')).toBeTruthy();
  });

  it('shows an error message when useCase returns left', async () => {
    const props = createScreenTestProps();
    mockIOC.mockResolvedValue(E.left('Error: fake error'));
    const {queryByTestId, getByText} = render(<Home {...props} />);
    await waitForElementToBeRemoved(() => queryByTestId('loading'));
    expect(getByText('Error: fake error')).toBeTruthy();
  });

  it('it shows please validate your email if it is not validated', async () => {
    const props = createScreenTestProps();
    mockIOC.mockResolvedValue(
      E.right({
        email: 'testEmail@testEmail.com',
        verifiedEmail: false,
      }),
    );
    const {getByTestId, queryByTestId, getByText, queryByText} = render(
      <Home {...props} />,
    );

    expect(getByTestId('loading')).toBeTruthy();

    await waitForElementToBeRemoved(() => queryByTestId('loading'));

    expect(getByText('testEmail@testEmail.com')).toBeTruthy();
    expect(queryByText('Your Email has been verified.')).toBeFalsy();
    expect(getByText('Please verify your email.')).toBeTruthy();
  });
});
