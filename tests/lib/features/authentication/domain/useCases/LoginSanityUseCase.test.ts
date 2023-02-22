import {any, mock} from 'jest-mock-extended';
import AuthenticationRepository from '../../../../../../lib/features/authentication/domain/repositories/AuthenticationRepository';
import {LoginSanityDTO} from '../../../../../../lib/features/authentication/domain/entities/LoginSanityDTO';
import LoginSanityUseCase from '../../../../../../lib/features/authentication/domain/usecases/LoginSanityUseCase';

describe('Login Sanity useCase', () => {
  it('correctly calls the repo', async () => {
    const repo = mock<AuthenticationRepository>();

    const expected: LoginSanityDTO = {
      message: 'fakeMessage',
      email: 'mockedEmail',
      verifiedEmail: true,
    };

    repo.getLoginSanity.calledWith(any()).mockResolvedValue(expected);

    const result = await new LoginSanityUseCase(repo).execute('fakeToken');

    expect(repo.getLoginSanity).toHaveBeenCalledWith('fakeToken');
    expect(repo.getLoginSanity).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });
});
