import * as E from 'fp-ts/Either';
import UserAuthInfoDataSourceImpl from '../../../../../../lib/features/authentication/infrastructure/datasources/UserAuthInfoDataSource';
import {Storage} from '../../../../../../lib/features/authentication/infrastructure/storage/storage.types';

describe('UserAuthInfoDataSource', () => {
  it('returns left|error if there is a storage error', async () => {
    const storage = {
      get: jest.fn().mockRejectedValue('storage error'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const userDataSource = await new UserAuthInfoDataSourceImpl(
      storage,
    ).getAuthenticationInfo();

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(userDataSource);

    expect(test).toEqual('Error: storage error');
  });

  it('returns right|UserAuthInfoDTO if there is no storage error', async () => {
    const storage = {
      get: jest.fn((key: string) => Promise.resolve(`fake${key}`)),
      set: jest.fn(),
      remove: jest.fn(),
    } as Storage;

    const userDataSource = await new UserAuthInfoDataSourceImpl(
      storage,
    ).getAuthenticationInfo();

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(userDataSource);

    expect(test).toEqual({
      email: 'fakeEMAIL',
      jwt: 'fakeJWTTOKEN',
      refreshToken: 'fakeREFRESHTOKEN',
    });
  });
});
