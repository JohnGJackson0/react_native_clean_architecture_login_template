import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {Validator} from '../../../../../core/validator';
import AuthenticationRepository from '../../../signup/domain/repositories/AuthenticationRepository';
import {TYPES} from '../../../../../core/ioc/Types';

@injectable()
export default class ConfirmUseCase {
  constructor(
    @inject(TYPES.AuthenticationRepository)
    private repository: AuthenticationRepository,
    @inject(TYPES.Validator) private validator: Validator,
  ) {}

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
