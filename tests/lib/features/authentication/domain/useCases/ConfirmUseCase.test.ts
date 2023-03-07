import {any, mock} from 'jest-mock-extended';
import {Validator} from '../../../../../../lib/core/services/validator';
import AuthenticationRepository from '../../../../../../lib/features/authentication/domain/repositories/AuthenticationRepository';
import ConfirmUseCase from '../../../../../../lib/features/authentication/domain/usecases/ConfirmUseCase';
import * as E from 'fp-ts/Either';

describe('confirm useCase', () => {
  it('correctly returns left on server side validation error', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(),
      validatePassword: jest.fn(),
      validateConfirmCode: jest.fn(() => {
        // client side check is ok
        return E.right(true);
      }),
    };

    const repo = mock<AuthenticationRepository>();

    repo.confirmUser
      .calledWith(any(), any(), any())
      .mockResolvedValue(E.left('fakeMessage'));

    const response = await new ConfirmUseCase(repo, mockValidator).execute(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
      'mockedEmail',
    );

    const test = E.fold(
      error => error,
      value => value,
    )(response);

    expect(test).toEqual('fakeMessage');
    expect(repo.confirmUser).toHaveBeenCalledTimes(1);
  });

  it('correctly returns left on client side validation error', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(),
      validatePassword: jest.fn(),
      validateConfirmCode: jest.fn(() => {
        return E.left('fakeMessage');
      }),
    };

    const repo = mock<AuthenticationRepository>();

    const response = await new ConfirmUseCase(repo, mockValidator).execute(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
      'mockedEmail',
    );

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(response);

    expect(test).toEqual('Error: fakeMessage');
    expect(repo.confirmUser).toHaveBeenCalledTimes(0);
  });

  it('correctly calls the authentication repo', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(),
      validatePassword: jest.fn(),
      validateConfirmCode: jest.fn(() => {
        return E.right(true);
      }),
    };

    const repo = mock<AuthenticationRepository>();

    const expected = E.right({
      refreshToken: 'mockedRefresh',
      jwtToken: 'mockedJwt',
      email: 'mockedEmail',
    });

    repo.confirmUser
      .calledWith(any(), any(), any())
      .mockResolvedValue(expected);

    const confirm = await new ConfirmUseCase(repo, mockValidator).execute(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
      'mockedEmail',
    );

    const test = E.fold(
      error => `Error: ${error}`,
      value => value,
    )(confirm);

    expect(test).toEqual({
      email: 'mockedEmail',
      jwtToken: 'mockedJwt',
      refreshToken: 'mockedRefresh',
    });

    expect(repo.confirmUser).toBeCalledTimes(1);
    expect(repo.confirmUser).toHaveBeenCalledWith(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
      'mockedEmail',
    );
  });
});
