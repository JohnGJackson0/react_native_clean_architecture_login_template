import Validator from '../../../../../core/validator';

/**
 * Entity can and often should have business logic
 * however the business logic should never be for
 * a particular useCase. Instead useCase can also
 * have high level business logic which makes entity
 * shared between many use cases.
 */
export default class UserSignUp {
  email: string;
  password: string;
  validator: Validator;

  constructor(email: string, password: string, validator: Validator) {
    this.email = email;
    this.password = password;
    this.validator = validator;
  }

  public isValidEmail = () => {
    this.validator.validateEmail(this.email);
  };

  public isValidPassword = () => {
    this.validator.validatePassword(this.password);
  };
}
