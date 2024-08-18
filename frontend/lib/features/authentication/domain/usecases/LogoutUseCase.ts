import {Either} from 'fp-ts/lib/Either';
import AuthenticationRepository from '../repositories/AuthenticationRepository';

// todo implements UseCase<void, void>
export default class LogoutUseCase {
  repository: AuthenticationRepository;

  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
  ) {
    this.repository = authenticationRepository;
  }

  async execute(): Promise<Either<string, boolean>> {
    return await this.authenticationRepository.logout();
  }
}
