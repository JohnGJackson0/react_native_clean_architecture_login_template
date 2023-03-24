import {Validator} from '../../../../core/services/validator';
import AuthenticationRepository from '../repositories/AuthenticationRepository';
import * as E from 'fp-ts/Either';

export default class ConfirmPasswordResetUseCase {
  repository: AuthenticationRepository;
  validator: Validator;

  constructor(repo: AuthenticationRepository, validator: Validator) {
    this.repository = repo;
    this.validator = validator;
  }

  public execute = async (
    email: string,
    verificationCode: string,
    newPassword: string,
  ): Promise<E.Either<string, string>> => {
    const emailVerifier = this.validator.validateEmail(email);
    const confirmationCode =
      this.validator.validateConfirmCode(verificationCode);
    const passwordVerifier = this.validator.validatePassword(newPassword);

    if (E.isLeft(emailVerifier)) {
      return E.left(emailVerifier.left);
    }

    if (E.isLeft(confirmationCode)) {
      return E.left(confirmationCode.left);
    }

    if (E.isLeft(passwordVerifier)) {
      return E.left(passwordVerifier.left);
    }

    return await this.repository.confirmPasswordReset(
      email,
      verificationCode,
      newPassword,
    );
  };
}
