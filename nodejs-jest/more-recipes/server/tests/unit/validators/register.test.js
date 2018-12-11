import faker from 'faker';
import validators from '../../../validators';
import { User } from '../../../database/models';

const { RegisterUserValidator } = validators;

describe('the RegisterUserValidator class', () => {
  describe('validateName function', () => {

    test('the validateName function adds a required error if name is not provided', () => {
      const validator = new RegisterUserValidator({ email: faker.internet.email() });
      validator.validateName();
      const errors = validator.errors;
      expect(errors).toEqual([ 'The name is required.' ]);
    });

    test('adds an error if name is less than 5 characters', () => {
      const validator = new RegisterUserValidator({ name: 'kevi' });

      validator.validateName();

      expect(validator.errors).toEqual(['The name must be longer than 5 characters.']);
    });

  });

  describe('validateEmail function', () => {

    test('adds a required error if the email is not provided', async () => {
      const validator = new RegisterUserValidator({ name: 'kevin' });

      await validator.validateEmail();

      expect(validator.errors).toEqual(['The email is required.']);
    });

    test('adds an error if email is invalid', async () => {
      const validator = new RegisterUserValidator({ email: 'kevin@sensation' });

      await validator.validateEmail();

      expect(validator.errors).toEqual(['The email must be a valid email address.']);
    });

    test('adds an error if user already exists with that email', async () => {
      const user = await User.create({
        name: 'testuser',
        email: faker.internet.email(),
        password: 'password'
      });

      const validator = new RegisterUserValidator({ email: user.email });

      await validator.validateEmail();

      expect(validator.errors).toEqual(['A user with this email already exists.']);
    });

  });

  describe('isValid function', () => {

    test('returns true if validator passes', async () => {
      const validator = new RegisterUserValidator({
        name: 'Test User',
        email: faker.internet.email(),
        password: 'password'
      });

      const result = await validator.isValid();

      expect(result).toBe(true);
    });

    test('returns false if validator fails', async () => {
      const validator = new RegisterUserValidator({
        name: 'Test User',
        email: 'testtest.com',
        password: 'password'
      });

      const result = await validator.isValid();

      expect(result).toBe(false);
    });

    test('validates name, email and password', async () => {
      const validator = new RegisterUserValidator({
        name: 'sdf',
        email: 'test',
        password: '333'
      });

      jest.spyOn(validator, 'validateName');
      jest.spyOn(validator, 'validateEmail');
      jest.spyOn(validator, 'validatePassword');

      await validator.isValid();

      expect(validator.validateName).toHaveBeenCalled();
      expect(validator.validateEmail).toHaveBeenCalled();
      expect(validator.validatePassword).toHaveBeenCalled();
    });

  });
});
