import {Validator} from '../../../../../../lib/core/services/validator';
import AuthenticationRepository from '../../../../../../lib/features/authentication/domain/repositories/AuthenticationRepository';
import SignUpUseCase from '../../../../../../lib/features/authentication/domain/usecases/SignUpUseCase';
// Jest Doesn't Allow Mocking Interfaces
import {any, mock} from 'jest-mock-extended';
import * as E from 'fp-ts/Either';

describe('Sign Up UseCase', () => {
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

    const repo = mock<AuthenticationRepository>();

    repo.userSignUp
      .calledWith(any(), any())
      .mockResolvedValue(E.right({email: 'mocked', password: 'mocked'}));

    const signUpUseCase = new SignUpUseCase(repo, mockValidator);

    const result = await signUpUseCase.execute(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
    );

    const test = E.fold(
      error => {
        return error;
      },
      success => {
        return success;
      },
    )(result);

    expect(test).toEqual({email: 'mocked', password: 'mocked'});
    expect(repo.userSignUp).toBeCalledTimes(1);
    expect(repo.userSignUp).toHaveBeenCalledWith(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
    );
  });
  it('does not call the API when client side validation failed', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(() => {
        return E.right(true);
      }),
      validatePassword: jest.fn(() => {
        return E.left('');
      }),
      validateConfirmCode: jest.fn(),
    };

    const repo = mock<AuthenticationRepository>();

    const signUpUseCase = new SignUpUseCase(repo, mockValidator);

    await signUpUseCase.execute('fakeEmail@fakeEmail.com', 'fakePassword');

    expect(repo.userSignUp).toBeCalledTimes(0);
  });

  it('returns left with valid message when email validation fails', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(() => {
        return E.left('mockEmailError');
      }),
      validatePassword: jest.fn(() => {
        return E.right(true);
      }),
      validateConfirmCode: jest.fn(),
    };

    const repo = mock<AuthenticationRepository>();

    const signUpUseCase = new SignUpUseCase(repo, mockValidator);

    const result = await signUpUseCase.execute(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
    );

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(result);

    expect(test).toEqual('Error: mockEmailError');
  });

  it('returns left with valid message when password validation fails', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(() => {
        return E.right(true);
      }),
      validatePassword: jest.fn(() => {
        return E.left('mockPasswordError');
      }),
      validateConfirmCode: jest.fn(),
    };

    const repo = mock<AuthenticationRepository>();

    const signUpUseCase = new SignUpUseCase(repo, mockValidator);

    const result = await signUpUseCase.execute(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
    );

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(result);

    expect(test).toEqual('Error: mockPasswordError');
  });

  it('returns left with valid email message when both email and password fails', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(() => {
        return E.left('mockEmailError');
      }),
      validatePassword: jest.fn(() => {
        return E.left('mockPasswordError');
      }),
      validateConfirmCode: jest.fn(),
    };

    const repo = mock<AuthenticationRepository>();

    const signUpUseCase = new SignUpUseCase(repo, mockValidator);

    const result = await signUpUseCase.execute(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
    );

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(result);

    expect(test).toEqual('Error: mockEmailError');
  });
});
