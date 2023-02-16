import {
  ConfirmHappyFixture,
  ConfirmSadFixture,
} from '../../../tests/ConfirmFixture';
import ConfirmDataSourceImpl from './confirmDataSource';

describe('signup', () => {
  it('returns email and password as long as response is ok', async () => {
    const expectedConfirm = {
      refreshToken: 'fakeRefreshToken',
      jwtToken: 'fakeAccessToken',
      email: 'fakeEmail@fakeEmail.com',
    };

    const client = {
      fetch: jest.fn(() => Promise.resolve(ConfirmHappyFixture)),
    };

    const signUpResult = await new ConfirmDataSourceImpl(
      client as any,
    ).getConfirm('fakeEmail@fakeEmail.com', 'fakePassword', 'fakeConfirm');

    expect(signUpResult).toEqual(expectedConfirm);
  });

  it('throws with !ok response', async () => {
    const client = {
      fetch: jest.fn(() => Promise.resolve(ConfirmSadFixture)),
    };

    let thrown = false;

    const userSignUpDataSource = new ConfirmDataSourceImpl(client as any);
    try {
      await userSignUpDataSource.getConfirm('', '', '');
    } catch (e) {
      thrown = true;
    }

    expect(thrown).toEqual(true);
  });
});
