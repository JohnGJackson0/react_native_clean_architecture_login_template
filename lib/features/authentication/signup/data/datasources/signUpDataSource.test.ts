import UserSignUpModel from '../models/UserSignUpModel';
import UserSignUpDataSourceImpl from './signUpDataSource';

describe('signup', () => {
  it('should perform a get request passing in correct email and password', async () => {
    const expectedUser: UserSignUpModel = {
      email: 'fakeEmail@fakeEmail.com',
      password: 'fakePassword',
    };

    const client = {post: jest.fn(() => expectedUser)} as any;

    const signUpResult = await new UserSignUpDataSourceImpl(client).getSignUp(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
    );

    expect(signUpResult).toEqual(expectedUser);
    expect(client.post.mock.calls[0][1]).toEqual({
      email: 'fakeEmail@fakeEmail.com',
      password: 'fakePassword',
    });
  });
});
