import {any, mock} from 'jest-mock-extended';
import AuthenticationRepository from '../../../../../../lib/features/authentication/domain/repositories/AuthenticationRepository';
import {LoginSanityDTO} from '../../../../../../lib/features/authentication/domain/entities/LoginSanityDTO';
import LoginSanityUseCase from '../../../../../../lib/features/authentication/domain/usecases/LoginSanityUseCase';
import * as E from 'fp-ts/Either';

describe('Login Sanity useCase', () => {
  it('correctly calls the repo', async () => {
    const repo = mock<AuthenticationRepository>();

    const expected: LoginSanityDTO = {
      message: 'fakeMessage',
      email: 'mockedEmail',
      verifiedEmail: true,
    };

    repo.getLoginSanity.calledWith(any()).mockResolvedValue(E.right(expected));

    const result = await new LoginSanityUseCase(repo).execute('fakeToken');

    const test = E.fold(
      error => error,
      value => value,
    )(result);

    expect(repo.getLoginSanity).toHaveBeenCalledWith('fakeToken');
    expect(repo.getLoginSanity).toHaveBeenCalledTimes(1);
    expect(test).toEqual(expected);
  });
});
