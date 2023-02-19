import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {Validator} from '../../../../../core/validator';
import AuthenticationRepository from '../repositories/AuthenticationRepository';
import {TYPES} from '../../../../../core/ioc/Types';

@injectable()
export default class SignUpUseCase {
  // private version: number
  constructor(
    @inject(TYPES.AuthenticationRepository)
    private repository: AuthenticationRepository,
    @inject(TYPES.Validator)
    private validator: Validator,
  ) {}

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
