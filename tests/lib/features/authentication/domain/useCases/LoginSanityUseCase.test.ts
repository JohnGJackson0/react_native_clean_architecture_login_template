import {mock} from 'jest-mock-extended';
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

    repo.getLoginSanity.mockResolvedValue(E.right(expected));

    const result = await new LoginSanityUseCase(repo).execute();

    const test = E.fold(
      error => error,
      value => value,
    )(result);
    expect(repo.getLoginSanity).toHaveBeenCalledTimes(1);
    expect(test).toEqual(expected);
  });

  it('refreshes the JWT token if getLoginSanity fails for any reason', async () => {
    const repo = mock<AuthenticationRepository>();
    repo.getLoginSanity.mockResolvedValue(E.left('fakeError'));
    await new LoginSanityUseCase(repo).execute();
    expect(repo.refreshSession).toHaveBeenCalledTimes(1);
  });

  it('calls getLoginSanity again after refreshing the JWT token', async () => {
    const repo = mock<AuthenticationRepository>();
    repo.getLoginSanity.mockResolvedValue(E.left('fakeError'));
    await new LoginSanityUseCase(repo).execute();
    expect(repo.getLoginSanity).toHaveBeenCalledTimes(2);
  });

  it('does not refresh the JWT token if getLoginSanity succeeds', async () => {
    const repo = mock<AuthenticationRepository>();
    const expected: LoginSanityDTO = {
      message: 'fakeMessage',
      email: 'mockedEmail',
      verifiedEmail: true,
    };
    repo.getLoginSanity.mockResolvedValue(E.right(expected));
    await new LoginSanityUseCase(repo).execute();
    expect(repo.refreshSession).toHaveBeenCalledTimes(0);
  });

  it('returns the result of getLoginSanity after refreshing the JWT token', async () => {
    const repo = mock<AuthenticationRepository>();
    repo.getLoginSanity.mockResolvedValueOnce(E.left('fakeError'));
    repo.getLoginSanity.mockResolvedValueOnce(E.left('fakeError2'));
    const result = await new LoginSanityUseCase(repo).execute();
    const test = E.fold(
      error => error,
      value => value,
    )(result);

    expect(test).toEqual('fakeError2');
    expect(repo.getLoginSanity).toHaveBeenCalledTimes(2);
  });
});
