import LoginSanityDataSource from '../../../../../../lib/features/authentication/infrastructure/datasources/LoginSanityDataSource';
import {LoginHappyFixture} from '../../../../../fixtures/LoginSanityFixture';
import {mockClient} from '../../../../../utils/testUtils';

describe('LoginSanity', () => {
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

    expect(loginSanityResult).toEqual(expectedLoginSanity);
  });

  it('throws with !ok response', async () => {
    const client = {
      fetch: jest.fn(() => Promise.reject('fakeError')),
    };

    let thrown = false;
    let message;

    const loginSanityResult = new LoginSanityDataSource(client as any);
    try {
      await loginSanityResult.getLoginSanity('fakeJwt');
    } catch (e) {
      thrown = true;
      message = e;
    }

    expect(thrown).toEqual(true);
    expect(message).toEqual(message);
  });

  it('calls the client correctly', async () => {
    const client = mockClient(LoginHappyFixture);

    await new LoginSanityDataSource(client as any).getLoginSanity('fakeJwt');

    expect(client.fetch).toHaveBeenCalledWith(
      'https://iz1ul818p3.execute-api.us-east-1.amazonaws.com/Prod/loginSanity',
      {
        headers: {Authorization: 'fakeJwt', 'Content-Type': 'application/json'},
        method: 'POST',
      },
    );
    expect(client.fetch).toHaveBeenCalledTimes(1);
  });

  it('throws if the email is undefined', async () => {
    const client = {
      fetch: jest.fn(() =>
        Promise.resolve({
          json: jest.fn().mockResolvedValue({message: 'fakeMessage'}),
        }),
      ),
    };

    let thrown = false;
    let message;

    const loginSanityResult = new LoginSanityDataSource(client as any);
    try {
      await loginSanityResult.getLoginSanity('fakeJwt');
    } catch (e) {
      thrown = true;
      message = e;
    }

    expect(thrown).toEqual(true);
    expect(message).toEqual('Authorization failed');
  });

  it('throws if the message is Authroization Failed', async () => {
    const client = {
      fetch: jest.fn(() =>
        Promise.resolve({
          json: jest.fn().mockResolvedValue({
            message: 'Authorization failed',
            email: 'fakeEmail@fakeEmail.com',
          }),
        }),
      ),
    };

    let thrown = false;
    let message;

    const loginSanityResult = new LoginSanityDataSource(client as any);
    try {
      await loginSanityResult.getLoginSanity('fakeJwt');
    } catch (e) {
      thrown = true;
      message = e;
    }

    expect(thrown).toEqual(true);
    expect(message).toEqual('Authorization failed');
  });
});
