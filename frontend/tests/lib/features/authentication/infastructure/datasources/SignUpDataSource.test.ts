import {
  SignUpHappyFixture,
  SignUpSadFixture,
} from '../../../../../fixtures/SignUpFixture';
import UserSignUpDataSourceImpl from '../../../../../../lib/features/authentication/infrastructure/datasources/SignUpDataSource';
import * as E from 'fp-ts/Either';

describe('Sign Up Datasource', () => {
  it('returns email and password as long as response is ok', async () => {
    const expectedUser = {
      email: 'fakeEmail@fakeEmail.com',
      password: 'fakePassword',
    };

    const client = {
      request: jest.fn().mockResolvedValue(E.right(SignUpHappyFixture)),
    } as any;

    const signUpResult = await new UserSignUpDataSourceImpl(client).getSignUp(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
    );

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(signUpResult);

    expect(test).toEqual(expectedUser);
  });

  it('throws correctly with !ok response or not 200 status code', async () => {
    const client = {
      request: jest.fn().mockResolvedValue(E.left(SignUpSadFixture)),
    } as any;

    const userSignUpDataSource = new UserSignUpDataSourceImpl(client);

    const result = await userSignUpDataSource.getSignUp('', '');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(result);

    expect(test).toEqual('Error: errorMessage');
  });
});
