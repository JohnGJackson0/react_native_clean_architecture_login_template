import {any, mock} from 'jest-mock-extended';
import {Validator} from '../../../../../../lib/core/services/validator';
import AuthenticationRepository from '../../../../../../lib/features/authentication/domain/repositories/AuthenticationRepository';
import * as E from 'fp-ts/Either';
import ResetPasswordUseCase from '../../../../../../lib/features/authentication/domain/usecases/ResetPasswordUseCase';

describe('Reset Password UseCase', () => {
  it('correctly calls the authentication repo', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(() => {
        return E.right(true);
      }),
      validatePassword: jest.fn(),
      validateConfirmCode: jest.fn(),
    };

    const repo = mock<AuthenticationRepository>();

    const expected = E.right(true);

    repo.resetPassword.calledWith(any()).mockResolvedValue(expected);

    const resetPassword = await new ResetPasswordUseCase(
      repo,
      mockValidator,
    ).execute('fakeEmail@fakeEmail.com');

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(resetPassword);

    expect(test).toEqual(true);

    expect(repo.resetPassword).toBeCalledTimes(1);
    expect(repo.resetPassword).toHaveBeenCalledWith('fakeEmail@fakeEmail.com');
  });

  it('does not call the API when there is a client side validation failure', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(() => {
        return E.left('mockEmailFailureMessage');
      }),
      validatePassword: jest.fn(() => {
        return E.right(true);
      }),
      validateConfirmCode: jest.fn(),
    };

    const mockRepo = mock<AuthenticationRepository>();

    mockRepo.resetPassword.calledWith(any()).mockResolvedValue(E.right(true));

    const loginUseCase = new ResetPasswordUseCase(mockRepo, mockValidator);

    await loginUseCase.execute('mockEmail');

    expect(mockRepo.resetPassword).not.toHaveBeenCalled();
  });

  it('returns left|message from email validation error when email does not pass validation', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(() => {
        return E.left('mockEmailFailureMessage');
      }),
      validatePassword: jest.fn(),
      validateConfirmCode: jest.fn(),
    };

    const mockRepo = mock<AuthenticationRepository>();

    mockRepo.resetPassword.calledWith(any()).mockResolvedValue(E.right(true));

    const loginUseCase = new ResetPasswordUseCase(mockRepo, mockValidator);

    const result = await loginUseCase.execute('mockEmail');

    const test = E.fold(
      error => {
        return error;
      },
      success => {
        return success;
      },
    )(result);

    expect(test).toEqual('mockEmailFailureMessage');
  });
});
