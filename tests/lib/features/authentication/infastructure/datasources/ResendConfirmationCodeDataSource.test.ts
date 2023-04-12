import * as E from 'fp-ts/Either';
import {
  resendConfirmationCodeHappyFixture,
  resendConfirmationCodeSadFixture,
} from '../../../../../fixtures/ResendConfirmationCodeFixture';
import ResendConfirmationCodeDataSourceImpl from '../../../../../../lib/features/authentication/infrastructure/datasources/ResendConfirmationCodeDataSource';

describe('Resend Confirmation Code data source', () => {
  it('returns right|true when the response is ok', async () => {
    const mockClient = {
      request: jest
        .fn()
        .mockResolvedValue(E.right(resendConfirmationCodeHappyFixture)),
    };

    const resendResult = await new ResendConfirmationCodeDataSourceImpl(
      mockClient,
    ).resendConfirmationCode('fakeEmail@fake.com');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(resendResult);

    expect(test).toEqual('Confirmation code has been resent!');
  });

  it('returns left|error when api is error', async () => {
    const mockClient = {
      request: jest
        .fn()
        .mockResolvedValue(E.left(resendConfirmationCodeSadFixture)),
    };

    const resendResult = await new ResendConfirmationCodeDataSourceImpl(
      mockClient,
    ).resendConfirmationCode('fakeEmail@fake.com');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(resendResult);

    expect(test).toEqual('Error: Some error here');
  });
});
