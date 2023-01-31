import AuthenticationRepository from '../repositories/AuthenticationRepository';

export default class SignUpUseCase {
  _repository: AuthenticationRepository;

  constructor(repo: AuthenticationRepository) {
    this._repository = repo;
  }

  public execute = async (email: string, password: string) => {
    return await this._repository.userSignUp(email, password);
  };
}
