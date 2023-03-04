import {Validator} from '../../../../core/services/validator';
import AuthenticationRepository from '../repositories/AuthenticationRepository';
import * as E from 'fp-ts/Either';

export default class SignUpUseCase {
  repository: AuthenticationRepository;
  validator: Validator;

  constructor(repo: AuthenticationRepository, validator: Validator) {
    this.repository = repo;
    this.validator = validator;
  }

  public execute = async (email: string, password: string) => {
    const emailValidator = this.validator.validateEmail(email);
    const passwordValidator = this.validator.validatePassword(password);

    E.fold(
      error => {
        throw error;
      },
      value => value,
    )(emailValidator);

    E.fold(
      error => {
        throw error;
      },
      value => value,
    )(passwordValidator);

    return await this.repository.userSignUp(email, password);
  };
}
