import {Validator} from '../../../../core/services/validator';
import AuthenticationRepository from '../repositories/AuthenticationRepository';
import * as E from 'fp-ts/Either';

export default class ConfirmUseCase {
  repository: AuthenticationRepository;
  validator: Validator;

  constructor(repo: AuthenticationRepository, validator: Validator) {
    this.repository = repo;
    this.validator = validator;
  }

  public execute = async (
    email: string,
    password: string,
    confirmationCode: string,
  ) => {
    const confirmCodeValidator =
      this.validator.validateConfirmCode(confirmationCode);

    E.fold(
      error => {
        throw error;
      },
      value => value,
    )(confirmCodeValidator);

    return await this.repository.confirmUser(email, password, confirmationCode);
  };
}
