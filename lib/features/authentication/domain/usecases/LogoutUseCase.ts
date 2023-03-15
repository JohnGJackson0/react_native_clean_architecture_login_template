import AuthenticationRepository from '../repositories/AuthenticationRepository';

// todo implements UseCase<void, void>
export default class LogoutUseCase {
  repository: AuthenticationRepository;

  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
  ) {
    this.repository = authenticationRepository;
  }

  async execute(): Promise<void> {
    await this.authenticationRepository.logout();
  }
}
