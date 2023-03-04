import * as E from 'fp-ts/Either';
export interface ValidatorResult {
  isValid: boolean;
  message: string;
}

export interface Validator {
  validateEmail: (email: string) => E.Either<string, true>;
  validatePassword: (password: string) => E.Either<string, true>;
  validateConfirmCode: (confirmCode: string) => E.Either<string, true>;
}

export default class ValidatorImpl implements Validator {
  public validateConfirmCode = (
    confirmCode: string,
  ): E.Either<string, true> => {
    const re = /^[0-9]+$/;

    if (!re.test(confirmCode)) {
      return E.left('Confirm Code should only contain numbers.');
    }
    if (confirmCode.length === 6) {
      return E.right(true);
    } else {
      return E.left('Confirm Code should be 6 digits in length.');
    }
  };
  public validateEmail = (email: string): E.Either<string, true> => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValid = re.test(email);

    if (!isValid) {
      return E.left(`The email ${email} is not in a valid format.`);
    }

    return E.right(true);
  };

  public validatePassword = (password: string): E.Either<string, true> => {
    const numberRegex = /\d/;
    const specialRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;

    if (password.length < 8) {
      return E.left('Password must be 8 charactors or more.');
    }

    if (!numberRegex.test(password)) {
      return E.left('Password must contain at least one number.');
    }

    if (!specialRegex.test(password)) {
      return E.left('Password must contain at least one special character.');
    }

    if (!lowercaseRegex.test(password)) {
      return E.left('Password must contain at least one lowercase letter.');
    }

    if (!uppercaseRegex.test(password)) {
      return E.left('Password must contain at least one uppercase letter.');
    }

    return E.right(true);
  };
}
