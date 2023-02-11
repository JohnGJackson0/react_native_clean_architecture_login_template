import {Validator} from '../../../../../core/validator';
import AuthenticationRepository from '../repositories/AuthenticationRepository';
import SignUpUseCase from './SignUpUseCase';
// Jest Doesn't Allow Mocking Interfaces
import {any, mock} from 'jest-mock-extended';

describe('sign up useCase', () => {
  it('throws with the correct message when client side validation for password is an error', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(() => {
        return {
          isValid: true,
          message: 'mockMessageEmail',
        };
      }),
      validatePassword: jest.fn(() => {
        return {
          isValid: false,
          message: 'mockMessagePassword',
        };
      }),
    };

    const repo = mock<AuthenticationRepository>();

    const expected = {
      email: 'mockedEmail@mock.com',
      password: 'mockedPassword',
    };

    repo.userSignUp.calledWith(any(), any()).mockResolvedValue(expected);

    let hasError = false;
    let message = '';

    try {
      await new SignUpUseCase(repo, mockValidator).execute(
        'fakeEmail@fakeEmail.com',
        'fakePassword',
      );
    } catch (e: any) {
      hasError = true;
      message = e;
    }

    expect(hasError).toEqual(true);
    expect(message).toEqual('mockMessagePassword');
  });

  it('throws with the correct message when client side validation for email is an error', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(() => {
        return {
          isValid: false,
          message: 'mockMessageEmail',
        };
      }),
      validatePassword: jest.fn(() => {
        return {
          isValid: true,
          message: 'mockMessagePassword',
        };
      }),
    };

    const repo = mock<AuthenticationRepository>();

    const expected = {
      email: 'mockedEmail@mock.com',
      password: 'mockedPassword',
    };

    repo.userSignUp.calledWith(any(), any()).mockResolvedValue(expected);

    let hasError = false;
    let message = '';

    try {
      await new SignUpUseCase(repo, mockValidator).execute(
        'fakeEmail@fakeEmail.com',
        'fakePassword',
      );
    } catch (e: any) {
      hasError = true;
      message = e;
    }

    expect(hasError).toEqual(true);
    expect(message).toEqual('mockMessageEmail');
  });

  it('calls the API correctly when there is no client side validation error', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(() => {
        return {
          isValid: true,
          message: '',
        };
      }),
      validatePassword: jest.fn(() => {
        return {
          isValid: true,
          message: '',
        };
      }),
    };

    const repo = mock<AuthenticationRepository>();

    const expected = {
      email: 'mockedEmail@mock.com',
      password: 'mockedPassword',
    };

    repo.userSignUp.calledWith(any(), any()).mockResolvedValue(expected);

    expect(repo.userSignUp).toBeCalledTimes(0);
    const result = await new SignUpUseCase(repo, mockValidator).execute(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
    );

    expect(result).toEqual(expected);
    expect(repo.userSignUp).toBeCalledTimes(1);
    expect(repo.userSignUp).toHaveBeenCalledWith(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
    );
  });
  it('does not call the API when client side validation failed', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(() => {
        return {
          isValid: true,
          message: '',
        };
      }),
      validatePassword: jest.fn(() => {
        return {
          isValid: false,
          message: '',
        };
      }),
    };

    const repo = mock<AuthenticationRepository>();

    const expected = {
      email: 'mockedEmail@mock.com',
      password: 'mockedPassword',
    };

    repo.userSignUp.calledWith(any(), any()).mockResolvedValue(expected);

    expect(repo.userSignUp).toBeCalledTimes(0);
    try {
      await new SignUpUseCase(repo, mockValidator).execute(
        'fakeEmail@fakeEmail.com',
        'fakePassword',
      );
    } catch (e) {}
    expect(repo.userSignUp).toBeCalledTimes(0);
  });
});
