import {Validator} from '../../../../core/services/validator';
import AuthenticationRepository from '../repositories/AuthenticationRepository';

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
    const confirmCodeValidor =
      this.validator.validateConfirmCode(confirmationCode);

    if (!confirmCodeValidor.isValid) {
      throw confirmCodeValidor.message;
    }
    return await this.repository.confirmUser(email, password, confirmationCode);
  };
}
