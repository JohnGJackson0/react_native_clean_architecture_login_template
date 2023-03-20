import * as E from 'fp-ts/Either';
import LoginDataSourceImpl from '../../../../../../lib/features/authentication/infrastructure/datasources/LoginDataSource';
import {LoginHappyCase} from '../../../../../fixtures/LoginFixture';

describe('Login Datasource', () => {
  it('returns right|true as long as response is ok', async () => {
    const client = {
      request: jest.fn().mockResolvedValue(E.right(LoginHappyCase)),
    };

    const storage = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const signUpResult = await new LoginDataSourceImpl(client, storage).login(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
    );

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(signUpResult);

    expect(test).toEqual(true);
  });

  it('sets the login values in storage correctly', async () => {
    const client = {
      request: jest.fn().mockResolvedValue(E.right(LoginHappyCase)),
    };

    const storage = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    };

    await new LoginDataSourceImpl(client, storage).login(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
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

  it('it displays the correct message on api responses that are rejected from request service', async () => {
    const client = {
      request: jest.fn().mockResolvedValue(E.left('fakeError')),
    };

    const storage = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const userConfirmDataSource = new LoginDataSourceImpl(client, storage);

    const response = await userConfirmDataSource.login('', '');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(response);

    expect(test).toEqual('Error: fakeError');
  });
});
