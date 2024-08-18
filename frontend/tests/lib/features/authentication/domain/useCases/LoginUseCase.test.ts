import * as E from 'fp-ts/Either';
import {any, mock} from 'jest-mock-extended';
import AuthenticationRepository from '../../../../../../lib/features/authentication/domain/repositories/AuthenticationRepository';
import {Validator} from '../../../../../../lib/core/services/validator';
import LoginUseCase from '../../../../../../lib/features/authentication/domain/usecases/LoginUseCase';

describe('Login Use Case', () => {
  it('calls the API correctly when there is no client side validation error', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(() => {
        return E.right(true);
      }),
      validatePassword: jest.fn(() => {
        return E.right(true);
      }),
      validateConfirmCode: jest.fn(),
    };

    const mockRepo = mock<AuthenticationRepository>();

    mockRepo.login.calledWith(any(), any()).mockResolvedValue(E.right(true));

    const loginUseCase = new LoginUseCase(mockRepo, mockValidator);

    const result = await loginUseCase.execute('mockEmail', 'mockPassword');

    const test = E.fold(
      error => {
        return error;
      },
      success => {
        return success;
      },
    )(result);

    expect(test).toEqual(true);
    expect(mockRepo.login).toHaveBeenCalledTimes(1);
    expect(mockRepo.login).toHaveBeenCalledWith('mockEmail', 'mockPassword');
  });

  it('returns left|message when there is a client side email validation error', async () => {
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

    mockRepo.login.calledWith(any(), any()).mockResolvedValue(E.right(true));

    const loginUseCase = new LoginUseCase(mockRepo, mockValidator);

    const result = await loginUseCase.execute('mockEmail', 'mockPassword');

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

  it('returns left|message when there is a client side password validation error', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(() => {
        return E.right(true);
      }),
      validatePassword: jest.fn(() => {
        return E.left('mockPasswordValidationError');
      }),
      validateConfirmCode: jest.fn(),
    };

    const mockRepo = mock<AuthenticationRepository>();

    mockRepo.login.calledWith(any(), any()).mockResolvedValue(E.right(true));

    const loginUseCase = new LoginUseCase(mockRepo, mockValidator);

    const result = await loginUseCase.execute('mockEmail', 'mockPassword');

    const test = E.fold(
      error => {
        return error;
      },
      success => {
        return success;
      },
    )(result);

    expect(test).toEqual('mockPasswordValidationError');
  });

  it('returns left|message from email validation error when both email and password does not pass validation', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(() => {
        return E.left('mockEmailFailureMessage');
      }),
      validatePassword: jest.fn(() => {
        return E.left('mockPasswordValidationError');
      }),
      validateConfirmCode: jest.fn(),
    };

    const mockRepo = mock<AuthenticationRepository>();

    mockRepo.login.calledWith(any(), any()).mockResolvedValue(E.right(true));

    const loginUseCase = new LoginUseCase(mockRepo, mockValidator);

    const result = await loginUseCase.execute('mockEmail', 'mockPassword');

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

    mockRepo.login.calledWith(any(), any()).mockResolvedValue(E.right(true));

    const loginUseCase = new LoginUseCase(mockRepo, mockValidator);

    await loginUseCase.execute('mockEmail', 'mockPassword');

    expect(mockRepo.login).not.toHaveBeenCalled();
  });
});
