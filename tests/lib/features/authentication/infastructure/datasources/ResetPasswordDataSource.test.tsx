import * as E from 'fp-ts/Either';
import {
  resetPasswordHappyFixture,
  resetPasswordSadFixture,
} from '../../../../../fixtures/PasswordResetFixture';
import ResetPasswordDataSourceImpl from '../../../../../../lib/features/authentication/infrastructure/datasources/ResetPasswordDataSource';

describe('Reset Password Data Source', () => {
  it('returns right|true when response is okay', async () => {
    const mockClient = {
      request: jest.fn().mockResolvedValue(E.right(resetPasswordHappyFixture)),
    };

    const resetResult = await new ResetPasswordDataSourceImpl(
      mockClient,
    ).resetPassword('fakeEmail');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(resetResult);

    expect(test).toEqual(true);
  });

  it('returns error when API response is left|error', async () => {
    const mockClient = {
      request: jest.fn().mockResolvedValue(E.left(resetPasswordSadFixture)),
    };

    const resetResult = await new ResetPasswordDataSourceImpl(
      mockClient,
    ).resetPassword('fakeEmail');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(resetResult);

    expect(test).toEqual("Error: Missing required key 'Username' in params");
  });

  it('returns correctly when it is left|string', async () => {
    const mockClient = {
      request: jest
        .fn()
        .mockResolvedValue(
          E.left(
            'Cannot fetch the specified resource most likely because of a network error.',
          ),
        ),
    };

    const resetResult = await new ResetPasswordDataSourceImpl(
      mockClient,
    ).resetPassword('fakeEmail');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(resetResult);

    expect(test).toEqual(
      'Error: Cannot fetch the specified resource most likely because of a network error.',
    );
  });
});
