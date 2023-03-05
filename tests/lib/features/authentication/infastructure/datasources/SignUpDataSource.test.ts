import {
  SignUpHappyFixture,
  SignUpSadFixture,
} from '../../../../../fixtures/SignUpFixture';
import UserSignUpDataSourceImpl from '../../../../../../lib/features/authentication/infrastructure/datasources/SignUpDataSource';
import {mockClient} from '../../../../../utils/testUtils';
import * as E from 'fp-ts/Either';

describe('Sign Up Datasource', () => {
  it('returns email and password as long as response is ok', async () => {
    const expectedUser = {
      email: 'fakeEmail@fakeEmail.com',
      password: 'fakePassword',
    };

    const client = mockClient(SignUpHappyFixture);

    const signUpResult = await new UserSignUpDataSourceImpl(
      client as any,
    ).getSignUp('fakeEmail@fakeEmail.com', 'fakePassword');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(signUpResult);

    expect(test).toEqual(expectedUser);
  });

  it('throws correctly with !ok response or not 200 status code', async () => {
    const client = mockClient(SignUpSadFixture, false);

    const userSignUpDataSource = new UserSignUpDataSourceImpl(client);

    const result = await userSignUpDataSource.getSignUp('', '');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(result);

    expect(test).toEqual('Error: errorMessage');
  });

  it('throws correctly with network error', async () => {
    const client = mockClient({});
    client.fetch.mockRejectedValue({});

    const userSignUpDataSource = new UserSignUpDataSourceImpl(client);

    const result = await userSignUpDataSource.getSignUp('', '');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(result);

    expect(test).toEqual(
      'Error: Cannot fetch the specified resource most likely because of a network error.',
    );
  });
});
