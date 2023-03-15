import AuthenticationRepository from '../repositories/AuthenticationRepository';
import * as E from 'fp-ts/Either';
export default class LoginSanityUseCase {
  repository: AuthenticationRepository;

  constructor(repo: AuthenticationRepository) {
    this.repository = repo;
  }

  public execute = async () => {
    const loginSanity = await this.repository.getLoginSanity();

    if (E.isLeft(loginSanity)) {
      await this.repository.refreshSession();
      return await this.repository.getLoginSanity();
    }

    return loginSanity;
  };
}
