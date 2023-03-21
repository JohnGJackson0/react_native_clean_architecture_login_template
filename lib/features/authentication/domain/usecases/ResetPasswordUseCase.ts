import {Validator} from '../../../../core/services/validator';
import AuthenticationRepository from '../repositories/AuthenticationRepository';
import * as E from 'fp-ts/Either';

export default class ResetPasswordUseCase {
  repository: AuthenticationRepository;
  validator: Validator;

  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    validator: Validator,
  ) {
    this.repository = authenticationRepository;
    this.validator = validator;
  }

  async execute(email: string): Promise<E.Either<string, boolean>> {
    const emailValidator = this.validator.validateEmail(email);

    if (E.isLeft(emailValidator)) {
      return E.left(emailValidator.left);
    }

    return await this.authenticationRepository.resetPassword(email);
  }
}
