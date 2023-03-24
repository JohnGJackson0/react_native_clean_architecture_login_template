import {mock} from 'jest-mock-extended';
import {Validator} from '../../../../../../lib/core/services/validator';
import AuthenticationRepository from '../../../../../../lib/features/authentication/domain/repositories/AuthenticationRepository';
import ConfirmPasswordResetUseCase from '../../../../../../lib/features/authentication/domain/usecases/ConfirmPasswordResetUseCase';
import * as E from 'fp-ts/Either';

describe('Confirm Password reset useCase', () => {
  it('correctly calls the authentication repo confirmPasswordReset', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn().mockReturnValue(E.right(true)),
      validatePassword: jest.fn().mockReturnValue(E.right(true)),
      validateConfirmCode: jest.fn().mockReturnValue(E.right(true)),
    };

    const repo = mock<AuthenticationRepository>();

    await new ConfirmPasswordResetUseCase(repo, mockValidator).execute(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
      'mockedEmail',
    );

    expect(repo.confirmPasswordReset).toBeCalledTimes(1);
    expect(repo.confirmPasswordReset).toHaveBeenCalledWith(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
      'mockedEmail',
    );
  });

  it('does not call the authentication repo if the email does not pass client side check', async () => {
    const mockValidator: Validator = {
      validateEmail: jest
        .fn()
        .mockReturnValue(E.left('mockEmailFailureMessage')),
      validatePassword: jest.fn(),
      validateConfirmCode: jest.fn(),
    };

    const repo = mock<AuthenticationRepository>();

    await new ConfirmPasswordResetUseCase(repo, mockValidator).execute(
      'fakeEmail@fake.com',
      '123456',
      'newPassword',
    );

    expect(repo.confirmPasswordReset).toBeCalledTimes(0);
  });

  it('returns left|error message if the email does not pass client side check', async () => {
    const mockValidator: Validator = {
      validateEmail: jest
        .fn()
        .mockReturnValue(E.left('mockEmailFailureMessage')),
      validatePassword: jest.fn(),
      validateConfirmCode: jest.fn(),
    };

    const repo = mock<AuthenticationRepository>();

    const result = await new ConfirmPasswordResetUseCase(
      repo,
      mockValidator,
    ).execute('', '', '');

    const test = E.fold(
      error => error,
      value => value,
    )(result);

    expect(test).toEqual('mockEmailFailureMessage');
  });
  it('returns left|error message if the confirmation code does not pass client side check', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn().mockReturnValue(E.right(true)),
      validatePassword: jest.fn(),
      validateConfirmCode: jest
        .fn()
        .mockReturnValue(E.left('mockConfirmCodeFailureMessage')),
    };

    const repo = mock<AuthenticationRepository>();

    repo.confirmPasswordReset.mockResolvedValue(E.right('Success'));

    const result = await new ConfirmPasswordResetUseCase(
      repo,
      mockValidator,
    ).execute('', '', '');

    const test = E.fold(
      error => error,
      value => value,
    )(result);

    expect(repo.confirmPasswordReset).not.toHaveBeenCalled();
    expect(test).toEqual('mockConfirmCodeFailureMessage');
  });

  it('returns left|error message if the new password does not pass client side check', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn().mockReturnValue(E.right(true)),
      validatePassword: jest
        .fn()
        .mockReturnValue(E.left('mockPasswordFailureMessage')),
      validateConfirmCode: jest.fn().mockReturnValue(E.right(true)),
    };

    const repo = mock<AuthenticationRepository>();

    repo.confirmPasswordReset.mockResolvedValue(E.right('Success'));

    const result = await new ConfirmPasswordResetUseCase(
      repo,
      mockValidator,
    ).execute('', '', '');

    const test = E.fold(
      error => error,
      value => value,
    )(result);

    expect(repo.confirmPasswordReset).not.toHaveBeenCalled();
    expect(test).toEqual('mockPasswordFailureMessage');
  });
});
