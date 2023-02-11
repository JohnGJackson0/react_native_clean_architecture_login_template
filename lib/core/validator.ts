export interface ValidatorResult {
  isValid: boolean;
  message: string;
}

export interface Validator {
  // TODO: Is there a way to enforce named public func in TSC?
  validateEmail: (email: string) => ValidatorResult;
  validatePassword: (password: string) => ValidatorResult;
}

export default class ValidatorImpl implements Validator {
  public validateEmail = (email: string): ValidatorResult => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValid = re.test(email);
    const message =
      isValid === true
        ? `${email} is correct`
        : `The email ${email} is not in a valid format.`;

    return {
      isValid,
      message,
    };
  };

  public validatePassword = (password: string): ValidatorResult => {
    const numberRegex = /\d/;
    const specialRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;

    if (password.length < 8) {
      return {
        isValid: false,
        message: 'Password must be 8 charactors or more.',
      };
    }

    if (!numberRegex.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one number.',
      };
    }

    if (!specialRegex.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one special character.',
      };
    }

    if (!lowercaseRegex.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one lowercase letter.',
      };
    }

    if (!uppercaseRegex.test(password)) {
      return {
        isValid: false,
        message: 'Password must contain at least one uppercase letter.',
      };
    }

    return {
      isValid: true,
      message: 'Password passes Client Side Check.',
    };
  };
}
