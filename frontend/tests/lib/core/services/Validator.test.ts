import ValidatorImpl from '../../../../lib/core/services/validator';
import * as E from 'fp-ts/Either';

describe('Validator', () => {
  describe('password', () => {
    it('it is valid when it meets all criteria', () => {
      const validator = new ValidatorImpl();
      const result = validator.validatePassword('1!aA12345678');

      const test = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(result);

      expect(test).toEqual(true);
    });

    it('is invalid when the length is less than 8', () => {
      const validator = new ValidatorImpl();

      const result = validator.validatePassword('1!aA123');

      const sadTest = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(result);

      expect(sadTest).toEqual('Error: Password must be 8 charactors or more.');

      const resultTwo = validator.validatePassword('1!aA1234');

      const happyTest = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(resultTwo);

      expect(happyTest).toEqual(true);
    });

    it('is invalid when there is no special charactors', () => {
      const validator = new ValidatorImpl();

      const result = validator.validatePassword('11aA1234');

      const test = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(result);

      expect(test).toEqual(
        'Error: Password must contain at least one special character.',
      );
    });

    it('is invalid when there is no uppercase charactors', () => {
      const validator = new ValidatorImpl();

      const result = validator.validatePassword('11!a1234');

      const test = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(result);

      expect(test).toEqual(
        'Error: Password must contain at least one uppercase letter.',
      );
    });

    it('is invalid when there is no lowercase charactors', () => {
      const validator = new ValidatorImpl();

      const result = validator.validatePassword('11!A1234');

      const test = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(result);

      expect(test).toEqual(
        'Error: Password must contain at least one lowercase letter.',
      );
    });

    it('is invalid when there is no number', () => {
      const validator = new ValidatorImpl();

      const result = validator.validatePassword('aa!Aaaaa');

      const test = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(result);

      expect(test).toEqual('Error: Password must contain at least one number.');
    });
  });

  describe('email', () => {
    it('is right side fold when in a valid format', () => {
      const validator = new ValidatorImpl();
      const result = validator.validateEmail('fakeEmail@fakeEmail.com');

      const test = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(result);

      expect(test).toEqual(true);
    });

    it('is invalid with no @ symbol', () => {
      const validator = new ValidatorImpl();
      const result = validator.validateEmail('fakeEmailfakeEmail.com');

      const test = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(result);

      expect(test).toEqual(
        'Error: The email fakeEmailfakeEmail.com is not in a valid format.',
      );
    });

    it('is invalid with no . symbol', () => {
      const validator = new ValidatorImpl();
      const result = validator.validateEmail('fakeEmail@fakeEmailcom');

      const test = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(result);

      expect(test).toEqual(
        'Error: The email fakeEmail@fakeEmailcom is not in a valid format.',
      );
    });

    it('is valid with allowed special charactors', () => {
      const validator = new ValidatorImpl();

      const result = validator.validateEmail('!#$%&*-/=?_{}|~fake@fake.com');

      const test = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(result);

      expect(test).toEqual(true);
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
          const controlResult = validator.validateEmail(`!fake@fake.com`);

          const controlTest = E.fold(
            error => `Error: ${error}`,
            value => value,
          )(controlResult);

          expect(controlTest).toEqual(true);
        }
        // test

        if (element !== '!') {
          const result = validator.validateEmail(`${element}fake@fake.com`);

          const test = E.fold(
            error => `Error: ${error}`,
            value => value,
          )(result);

          expect(test).toEqual(
            `Error: The email ${element}fake@fake.com is not in a valid format.`,
          );
        }
      });
    });
  });
  describe('confirm codes', () => {
    it('is true for 6 digit strings', () => {
      const validator = new ValidatorImpl();

      const result = validator.validateConfirmCode('123456');

      const test = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(result);

      expect(test).toEqual(true);
    });

    it('is not valid for 7 digit strings or 5', () => {
      const validator = new ValidatorImpl();
      const result = validator.validateConfirmCode('1234567');

      const test = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(result);

      expect(test).toEqual('Error: Confirm Code should be 6 digits in length.');

      const resultTwo = validator.validateConfirmCode('12345');

      const testTwo = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(resultTwo);

      expect(testTwo).toEqual(
        'Error: Confirm Code should be 6 digits in length.',
      );
    });

    it('has correct message', () => {
      const validator = new ValidatorImpl();
      const result = validator.validateConfirmCode('1234567');

      const test = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(result);

      expect(test).toEqual('Error: Confirm Code should be 6 digits in length.');

      const controlResult = validator.validateConfirmCode('123456');

      const testTwo = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(controlResult);

      expect(testTwo).toEqual(true);
    });

    it('is not valid if it contains something other than number', () => {
      const validator = new ValidatorImpl();

      const result = validator.validateConfirmCode('123456');

      const test = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(result);

      expect(test).toEqual(true);

      const resultTwo = validator.validateConfirmCode('a23456');

      const testTwo = E.fold(
        error => `Error: ${error}`,
        value => value,
      )(resultTwo);

      expect(testTwo).toEqual(
        'Error: Confirm Code should only contain numbers.',
      );
    });
  });
});
