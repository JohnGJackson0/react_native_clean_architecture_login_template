import {any, mock} from 'jest-mock-extended';
import {Validator} from '../../../../../core/validator';
import AuthenticationRepository from '../../../signup/domain/repositories/AuthenticationRepository';
import ConfirmUseCase from './confirmUseCase';

describe('confirm useCase', () => {
  it('correctly throws on client side validation error', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(),
      validatePassword: jest.fn(),
      validateConfirmCode: jest.fn(() => {
        return {
          isValid: false,
          message: 'fakeMessage',
        };
      }),
    };

    const repo = mock<AuthenticationRepository>();

    const expected = {
      refreshToken: 'mockedRefresh',
      jwtToken: 'mockedJwt',
      email: 'mockedEmail',
    };

    repo.confirm.calledWith(any(), any(), any()).mockResolvedValue(expected);

    let throws = false;
    let message = '';

    try {
      await new ConfirmUseCase(repo, mockValidator).execute(
        'fakeEmail@fakeEmail.com',
        'fakePassword',
        'mockedEmail',
      );
    } catch (e: any) {
      throws = true;
      message = e;
    }

    expect(throws).toEqual(true);
    expect(message).toEqual('fakeMessage');
    expect(repo.confirm).toHaveBeenCalledTimes(0);
  });

  it('correctly calls the authentication repo', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(),
      validatePassword: jest.fn(),
      validateConfirmCode: jest.fn(() => {
        return {
          isValid: true,
          message: 'fakeMessage',
        };
      }),
    };

    const repo = mock<AuthenticationRepository>();

    const expected = {
      refreshToken: 'mockedRefresh',
      jwtToken: 'mockedJwt',
      email: 'mockedEmail',
    };

    repo.confirm.calledWith(any(), any(), any()).mockResolvedValue(expected);

    const confirm = await new ConfirmUseCase(repo, mockValidator).execute(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
      'mockedEmail',
    );

    expect(confirm).toEqual({
      email: 'mockedEmail',
      jwtToken: 'mockedJwt',
      refreshToken: 'mockedRefresh',
    });

    expect(repo.confirm).toBeCalledTimes(1);
    expect(repo.confirm).toHaveBeenCalledWith(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
      'mockedEmail',
    );
  });
});
