import LoginSanityDataSource from '../../../../../../lib/features/authentication/infrastructure/datasources/LoginSanityDataSource';
import {LoginHappyFixture} from '../../../../../fixtures/LoginSanityFixture';
import * as E from 'fp-ts/Either';

describe('Login Sanity Data Source', () => {
  it('returns loginSanity DTO as long as response is ok', async () => {
    const expectedLoginSanity = {
      message: 'fakeMessage',
      email: 'fakeEmail',
      verifiedEmail: true,
    };

    const clientReq = {
      request: jest.fn().mockResolvedValue(E.right(LoginHappyFixture)),
    };

    const storage = {
      get: jest.fn().mockResolvedValue('fakeJwt'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const loginSanityResult = await new LoginSanityDataSource(
      clientReq,
      storage,
    ).getLoginSanity();

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(loginSanityResult);

    expect(test).toEqual(expectedLoginSanity);
    expect(storage.get).toBeCalledTimes(1);
  });

  it('calls the client correctly', async () => {
    const client = {
      request: jest.fn().mockResolvedValue(E.right(LoginHappyFixture)),
    };
    const storage = {
      get: jest.fn().mockResolvedValue('fakeJwt'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    await new LoginSanityDataSource(client, storage).getLoginSanity();

    expect(client.request).toHaveBeenCalledWith(
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/loginSanity',
      {
        headers: {Authorization: 'fakeJwt', 'Content-Type': 'application/json'},
        method: 'POST',
      },
    );
    expect(client.request).toHaveBeenCalledTimes(1);
  });

  // TODO fix: removed this functionality as validation
  // should go to useCase instead of datasource

  // it('gives left of authorization failed without email passed in', async () => {});

  // it('returns left of authorization failed if the message is Authroization Failed', async () => {});

  it('returns left of Authorization Failed if there is no JWT token in storage service', async () => {
    const client = {
      request: jest.fn().mockResolvedValue(E.right(LoginHappyFixture)),
    };
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
