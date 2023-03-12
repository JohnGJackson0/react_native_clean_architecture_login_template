import LoginSanityDataSource from '../../../../../../lib/features/authentication/infrastructure/datasources/LoginSanityDataSource';
import {LoginHappyFixture} from '../../../../../fixtures/LoginSanityFixture';
import {mockClient} from '../../../../../utils/testUtils';
import * as E from 'fp-ts/Either';

describe('Login Sanity Data Source', () => {
  it('returns loginSanity DTO as long as response is ok', async () => {
    const expectedLoginSanity = {
      message: 'fakeMessage',
      email: 'fakeEmail',
      verifiedEmail: true,
    };

    const client = mockClient(LoginHappyFixture);

    const storage = {
      get: jest.fn().mockResolvedValue('fakeJwt'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const loginSanityResult = await new LoginSanityDataSource(
      client,
      storage,
    ).getLoginSanity();

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(loginSanityResult);

    expect(test).toEqual(expectedLoginSanity);
    expect(storage.get).toBeCalledTimes(1);
  });

  it('throws correctly with network error', async () => {
    const client = mockClient({});
    client.fetch.mockRejectedValue({});

    const storage = {
      get: jest.fn().mockResolvedValue('fakeJwt'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const loginSanityResult = new LoginSanityDataSource(client, storage);

    const result = await loginSanityResult.getLoginSanity();

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(result);

    expect(test).toEqual(
      'Error: Cannot fetch the specified resource most likely because of a network error.',
    );
  });

  it('calls the client correctly', async () => {
    const client = mockClient(LoginHappyFixture);
    const storage = {
      get: jest.fn().mockResolvedValue('fakeJwt'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    await new LoginSanityDataSource(client, storage).getLoginSanity();

    expect(client.fetch).toHaveBeenCalledWith(
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/loginSanity',
      {
        headers: {Authorization: 'fakeJwt', 'Content-Type': 'application/json'},
        method: 'POST',
      },
    );
    expect(client.fetch).toHaveBeenCalledTimes(1);
  });

  it('gives left of authorization failed without email passed in', async () => {
    const client = mockClient({message: 'fakeMessage'});
    const storage = {
      get: jest.fn().mockResolvedValue('fakeJwt'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const loginSanityResult = new LoginSanityDataSource(client, storage);

    const response = await loginSanityResult.getLoginSanity();

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(response);

    expect(test).toEqual('Error: Authorization failed');
  });

  it('returns left of authorization failed if the message is Authroization Failed', async () => {
    const client = mockClient({
      message: 'Authorization failed',
      email: 'fakeEmail@fakeEmail.com',
    });

    const storage = {
      get: jest.fn().mockResolvedValue('fakeJwt'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const datasource = new LoginSanityDataSource(client, storage);

    const response = await datasource.getLoginSanity();

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(response);

    expect(test).toEqual('Error: Authorization failed');
  });

  it('returns left of Authorization Failed if there is no JWT token in storage service', async () => {
    const client = mockClient(LoginHappyFixture);
    const storage = {
      get: jest.fn().mockResolvedValue(''),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const response = await new LoginSanityDataSource(
      client,
      storage,
    ).getLoginSanity();

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(response);

    expect(test).toEqual('Error: Authorization failed');
  });
});
