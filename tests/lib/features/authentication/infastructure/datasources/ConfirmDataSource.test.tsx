import {ConfirmHappyFixture} from '../../../../../fixtures/ConfirmFixture';
import ConfirmDataSourceImpl from '../../../../../../lib/features/authentication/infrastructure/datasources/ConfirmDataSource';
import * as E from 'fp-ts/Either';

describe('Confirm DataSource', () => {
  it('returns right|true as long as response is ok', async () => {
    const client = {
      request: jest.fn().mockResolvedValue(E.right(ConfirmHappyFixture)),
    };

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

    expect(test).toEqual(true);
  });

  it('sets the correct values in storage', async () => {
    const client = {
      request: jest.fn().mockResolvedValue(E.right(ConfirmHappyFixture)),
    };

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

  it('it displays the correct message on api responses that are rejected from request service', async () => {
    const client = {
      request: jest.fn().mockResolvedValue(E.left('fakeError')),
    };

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
});
