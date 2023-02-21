import {
  SignUpHappyFixture,
  SignUpSadFixture,
} from '../../../../../fixtures/SignUpFixture';
import UserSignUpDataSourceImpl from '../../../../../../lib/features/authentication/infrastructure/datasources/SignUpDataSource';

describe('signup', () => {
  it('returns email and password as long as response is ok', async () => {
    const expectedUser = {
      email: 'fakeEmail@fakeEmail.com',
      password: 'fakePassword',
    };

    const client = {
      fetch: jest.fn(() => Promise.resolve(SignUpHappyFixture)),
    };

    const signUpResult = await new UserSignUpDataSourceImpl(
      client as any,
    ).getSignUp('fakeEmail@fakeEmail.com', 'fakePassword');

    expect(signUpResult).toEqual(expectedUser);
  });

  it('throws with !ok response', async () => {
    const client = {
      fetch: jest.fn(() => Promise.resolve(SignUpSadFixture)),
    };

    let thrown = false;

    const userSignUpDataSource = new UserSignUpDataSourceImpl(client as any);
    try {
      await userSignUpDataSource.getSignUp('', '');
    } catch (e) {
      thrown = true;
    }

    expect(thrown).toEqual(true);
  });
});
