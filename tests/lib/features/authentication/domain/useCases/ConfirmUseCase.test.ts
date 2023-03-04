import {any, mock} from 'jest-mock-extended';
import {Validator} from '../../../../../../lib/core/services/validator';
import AuthenticationRepository from '../../../../../../lib/features/authentication/domain/repositories/AuthenticationRepository';
import ConfirmUseCase from '../../../../../../lib/features/authentication/domain/usecases/ConfirmUseCase';
import * as E from 'fp-ts/Either';

describe('confirm useCase', () => {
  it('correctly throws on client side validation error', async () => {
    const mockValidator: Validator = {
      validateEmail: jest.fn(),
      validatePassword: jest.fn(),
      validateConfirmCode: jest.fn(() => {
        return E.left('fakeMessage');
      }),
    };

    const repo = mock<AuthenticationRepository>();

    const expected = {
      refreshToken: 'mockedRefresh',
      jwtToken: 'mockedJwt',
      email: 'mockedEmail',
    };

    repo.confirmUser
      .calledWith(any(), any(), any())
      .mockResolvedValue(expected);

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

    const expected = {
      refreshToken: 'mockedRefresh',
      jwtToken: 'mockedJwt',
      email: 'mockedEmail',
    };

    repo.confirmUser
      .calledWith(any(), any(), any())
      .mockResolvedValue(expected);

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

    expect(repo.confirmUser).toBeCalledTimes(1);
    expect(repo.confirmUser).toHaveBeenCalledWith(
      'fakeEmail@fakeEmail.com',
      'fakePassword',
      'mockedEmail',
    );
  });
});
