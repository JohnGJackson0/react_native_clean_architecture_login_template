import {
  RefreshErrorFixture,
  RefreshHappyFixture,
} from '../../../../../fixtures/RefreshTokenFixture';
import RefreshDataSourceImpl from '../../../../../../lib/features/authentication/infrastructure/datasources/RefreshDataSource';
import * as E from 'fp-ts/Either';

describe('Refresh Data Source', () => {
  it('returns right|true when response is okay', async () => {
    const mockClient = {
      request: jest.fn().mockResolvedValue(E.right(RefreshHappyFixture)),
    };
    const mockStorage = {
      get: jest.fn().mockResolvedValue('FakeToken'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const refreshResult = await new RefreshDataSourceImpl(
      mockClient,
      mockStorage,
    ).refreshJwt();

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(refreshResult);

    expect(test).toEqual(true);
  });

  it('returns error when API response is left|error', async () => {
    const mockClient = {
      request: jest.fn().mockResolvedValue(E.left(RefreshErrorFixture)),
    };
    const mockStorage = {
      get: jest.fn().mockResolvedValue('FakeToken'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const refreshDataSource = await new RefreshDataSourceImpl(
      mockClient,
      mockStorage,
    ).refreshJwt();

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(refreshDataSource);

    expect(test).toEqual('Error: User does not exist.');
  });

  it('returns correctly when api is left|string', async () => {
    const mockClient = {
      request: jest
        .fn()
        .mockResolvedValue(
          E.left(
            'Cannot fetch the specified resource most likely because of a network error.',
          ),
        ),
    };
    const mockStorage = {
      get: jest.fn().mockResolvedValue('FakeToken'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const refreshDataSource = await new RefreshDataSourceImpl(
      mockClient,
      mockStorage,
    ).refreshJwt();

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(refreshDataSource);

    expect(test).toEqual(
      'Error: Cannot fetch the specified resource most likely because of a network error.',
    );
  });

  it('returns correctly when there is no refresh token', async () => {
    const mockClient = {
      request: jest.fn().mockResolvedValue(E.right(RefreshHappyFixture)),
    };
    const mockStorage = {
      get: jest.fn().mockResolvedValue(''),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const refreshResult = await new RefreshDataSourceImpl(
      mockClient,
      mockStorage,
    ).refreshJwt();

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(refreshResult);

    expect(test).toEqual('Error: Refresh token not found');
  });

  it('gets the refresh token from storage', async () => {
    const mockClient = {
      request: jest.fn().mockResolvedValue(E.right(RefreshHappyFixture)),
    };
    const mockStorage = {
      get: jest.fn().mockResolvedValue('fakeToken'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    await new RefreshDataSourceImpl(mockClient, mockStorage).refreshJwt();

    expect(mockStorage.get).toBeCalledTimes(1);
    expect(mockStorage.get).toBeCalledWith('REFRESHTOKEN');
  });
});
