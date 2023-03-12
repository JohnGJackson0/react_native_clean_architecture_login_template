import AuthenticationRepository from '../repositories/AuthenticationRepository';
export default class LoginSanityUseCase {
  repository: AuthenticationRepository;

  constructor(repo: AuthenticationRepository) {
    this.repository = repo;
  }

  public execute = async () => {
    return await this.repository.getLoginSanity();
  };
}
