import {Validator} from '../../../../core/services/validator';
import AuthenticationRepository from '../repositories/AuthenticationRepository';

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

    if (!emailValidator.isValid) {
      throw emailValidator.message;
    }

    if (!passwordValidator.isValid) {
      throw passwordValidator.message;
    }
    return await this.repository.userSignUp(email, password);
  };
}
