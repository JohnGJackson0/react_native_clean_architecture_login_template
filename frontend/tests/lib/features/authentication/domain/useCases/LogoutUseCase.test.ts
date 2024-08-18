import {mock} from 'jest-mock-extended';
import AuthenticationRepository from '../../../../../../lib/features/authentication/domain/repositories/AuthenticationRepository';
import LogoutUseCase from '../../../../../../lib/features/authentication/domain/usecases/LogoutUseCase';

describe('logoutUseCase', () => {
  it('should call logout datasource', async () => {
    const repo = mock<AuthenticationRepository>();

    const logoutUseCase = new LogoutUseCase(repo);

    await logoutUseCase.execute();

    expect(repo.logout).toBeCalledTimes(1);
    expect(repo.logout).toBeCalledWith();
  });
});
