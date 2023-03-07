import {Validator} from '../../../../core/services/validator';
import {ConfirmDTO} from '../entities/ConfirmDTO';
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
  ): Promise<E.Either<string, ConfirmDTO>> => {
    const confirmCodeValidator =
      this.validator.validateConfirmCode(confirmationCode);

    if (E.isLeft(confirmCodeValidator)) {
      return E.left(confirmCodeValidator.left);
    }

    return await this.repository.confirmUser(email, password, confirmationCode);
  };
}
