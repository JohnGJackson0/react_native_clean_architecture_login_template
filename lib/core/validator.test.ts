import ValidatorImpl from './validator';

describe('Validator', () => {
  describe('password', () => {
    it('it is valid when it meets all criteria', () => {
      const validator = new ValidatorImpl();
      const result = validator.validatePassword('1!aA12345678');
      expect(result).toEqual({
        isValid: true,
        message: 'Password passes Client Side Check.',
      });
    });

    it('is invalid when the length is less than 8', () => {
      const validator = new ValidatorImpl();

      expect(validator.validatePassword('1!aA123')).toEqual({
        isValid: false,
        message: 'Password must be 8 charactors or more.',
      });
      expect(validator.validatePassword('1!aA1234')).toEqual({
        isValid: true,
        message: 'Password passes Client Side Check.',
      });
    });

    it('is invalid when there is no special charactors', () => {
      const validator = new ValidatorImpl();
      expect(validator.validatePassword('11aA1234')).toEqual({
        isValid: false,
        message: 'Password must contain at least one special character.',
      });
    });

    it('is invalid when there is no uppercase charactors', () => {
      const validator = new ValidatorImpl();
      expect(validator.validatePassword('11!a1234')).toEqual({
        isValid: false,
        message: 'Password must contain at least one uppercase letter.',
      });
    });

    it('is invalid when there is no lowercase charactors', () => {
      const validator = new ValidatorImpl();
      expect(validator.validatePassword('11!A1234')).toEqual({
        isValid: false,
        message: 'Password must contain at least one lowercase letter.',
      });
    });

    it('is invalid when there is no number', () => {
      const validator = new ValidatorImpl();
      expect(validator.validatePassword('aa!Aaaaa')).toEqual({
        isValid: false,
        message: 'Password must contain at least one number.',
      });
    });
  });

  describe('email', () => {
    it('returns isValid = true when in a valid format', () => {
      const validator = new ValidatorImpl();
      const result = validator.validateEmail('fakeEmail@fakeEmail.com');
      expect(result).toEqual({
        isValid: true,
        message: 'fakeEmail@fakeEmail.com is correct',
      });
    });

    it('is invalid with no @ symbol', () => {
      const validator = new ValidatorImpl();
      const result = validator.validateEmail('fakeEmailfakeEmail.com');
      expect(result).toEqual({
        isValid: false,
        message: 'The email fakeEmailfakeEmail.com is not in a valid format.',
      });
    });

    it('is invalid with no . symbol', () => {
      const validator = new ValidatorImpl();
      const result = validator.validateEmail('fakeEmail@fakeEmailcom');
      expect(result.isValid).toEqual(false);
    });

    it('is valid with allowed special charactors', () => {
      const validator = new ValidatorImpl();
      // control
      expect(validator.validateEmail('fake@fake.com').isValid).toEqual(true);
      // test
      expect(
        validator.validateEmail('!#$%&*-/=?_{}|~fake@fake.com').isValid,
      ).toEqual(true);
    });

    it('is not valid with not allowed special charactors', () => {
      const validator = new ValidatorImpl();

      const unallowedCharactorsAndControlVariable = [
        ' ',
        '>',
        ',',
        '(',
        ')',
        '[',
        ']',
        // this is the control, it is actually allowed
        '!',
      ];

      unallowedCharactorsAndControlVariable.forEach(function (element) {
        if (element === '!') {
          expect(validator.validateEmail(`!fake@fake.com`).isValid).toEqual(
            true,
          );
        }
        // test

        if (element !== '!') {
          expect(
            validator.validateEmail(`${element}fake@fake.com`).isValid,
          ).toEqual(false);
        }
      });
    });
  });
  describe('confirm codes', () => {
    it('is true for 6 digit strings', () => {
      const validator = new ValidatorImpl();
      expect(validator.validateConfirmCode('123456').isValid).toEqual(true);
    });

    it('is not valid for 7 digit strings or 5', () => {
      const validator = new ValidatorImpl();
      expect(validator.validateConfirmCode('1234567').isValid).toEqual(false);
      expect(validator.validateConfirmCode('12345').isValid).toEqual(false);
    });

    it('has correct message', () => {
      const validator = new ValidatorImpl();
      expect(validator.validateConfirmCode('1234567').message).toEqual(
        'Confirm Code should be 6 digits in length.',
      );
      expect(validator.validateConfirmCode('123456').message).toEqual(
        'Confirm Code is correct.',
      );
    });

    it('is not valid if it contains something other than number', () => {
      const validator = new ValidatorImpl();
      expect(validator.validateConfirmCode('123456').isValid).toEqual(true);
      expect(validator.validateConfirmCode('a23456').isValid).toEqual(false);
    });
  });
});
