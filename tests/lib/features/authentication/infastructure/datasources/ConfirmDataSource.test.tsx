import {
  ConfirmHappyFixture,
  ConfirmSadFixture,
} from '../../../../../fixtures/ConfirmFixture';
import ConfirmDataSourceImpl from '../../../../../../lib/features/authentication/infrastructure/datasources/ConfirmDataSource';
import {mockClient} from '../../../../../utils/testUtils';
import * as E from 'fp-ts/Either';

describe('Confirm DataSource', () => {
  it('returns email and password as long as response is ok', async () => {
    const expectedConfirm = {
      refreshToken: 'fakeRefreshToken',
      jwtToken: 'fakeAccessToken',
      email: 'fakeEmail@fakeEmail.com',
    };

    const client = mockClient(ConfirmHappyFixture);

    const storage = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const signUpResult = await new ConfirmDataSourceImpl(
      client,
      storage,
    ).getConfirm('fakeEmail@fakeEmail.com', 'fakePassword', 'fakeConfirm');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(signUpResult);

    expect(test).toEqual(expectedConfirm);
  });

  it('sets the correct values in storage', async () => {
    const client = mockClient(ConfirmHappyFixture);

    const storage = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    };

    await new ConfirmDataSourceImpl(client, storage).getConfirm(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
      'fakeConfirm',
    );

    expect(storage.set).toHaveBeenCalledTimes(3);
    expect(storage.set).toHaveBeenCalledWith('JWTTOKEN', 'fakeAccessToken');
    expect(storage.set).toHaveBeenCalledWith(
      'REFRESHTOKEN',
      'fakeRefreshToken',
    );
    expect(storage.set).toHaveBeenCalledWith(
      'EMAIL',
      'fakeEmail@fakeEmail.com',
    );
  });

  it('it displays the correct message on api responses that are not 200 status', async () => {
    const client = mockClient(ConfirmSadFixture, false);

    const storage = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const userConfirmDataSource = new ConfirmDataSourceImpl(client, storage);

    const response = await userConfirmDataSource.getConfirm('', '', '');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(response);

    expect(test).toEqual('Error: fakeError');
  });

  it('displays the correct message on network errors', async () => {
    const client = mockClient({});
    client.fetch.mockRejectedValue({});

    const storage = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const userConfirmDataSource = new ConfirmDataSourceImpl(client, storage);

    const response = await userConfirmDataSource.getConfirm('', '', '');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(response);

    expect(test).toEqual(
      'Error: Cannot fetch the specified resource most likely because of a network error.',
    );
  });
});
