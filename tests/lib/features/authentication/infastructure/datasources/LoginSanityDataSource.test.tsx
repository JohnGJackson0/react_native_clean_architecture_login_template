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

    const loginSanityResult = await new LoginSanityDataSource(
      client as any,
    ).getLoginSanity('fakeJwt');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(loginSanityResult);

    expect(test).toEqual(expectedLoginSanity);
  });

  it('throws correctly with network error', async () => {
    const client = mockClient({});
    client.fetch.mockRejectedValue({});
    const loginSanityResult = new LoginSanityDataSource(client);

    const result = await loginSanityResult.getLoginSanity('fakeJwt');

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

    await new LoginSanityDataSource(client).getLoginSanity('fakeJwt');

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

    const loginSanityResult = new LoginSanityDataSource(client);

    const response = await loginSanityResult.getLoginSanity('fakeJwt');

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

    const datasource = new LoginSanityDataSource(client);

    const response = await datasource.getLoginSanity('fakeJwt');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(response);

    expect(test).toEqual('Error: Authorization failed');
  });
});
