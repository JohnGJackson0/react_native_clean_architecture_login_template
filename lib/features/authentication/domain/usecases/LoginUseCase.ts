import {Validator} from '../../../../core/services/validator';
import AuthenticationRepository from '../repositories/AuthenticationRepository';
import * as E from 'fp-ts/Either';

export default class LoginUseCase {
  repository: AuthenticationRepository;
  validator: Validator;

  constructor(repo: AuthenticationRepository, validator: Validator) {
    this.repository = repo;
    this.validator = validator;
  }

  public execute = async (
    email: string,
    password: string,
  ): Promise<E.Either<string, boolean>> => {
    const emailValidator = this.validator.validateEmail(email);
    const passwordValidator = this.validator.validatePassword(password);

    if (E.isLeft(emailValidator)) {
      return E.left(emailValidator.left);
    }

    if (E.isLeft(passwordValidator)) {
      return E.left(passwordValidator.left);
    }

    return await this.repository.login(email, password);
  };
}
