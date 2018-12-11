import faker from 'faker';
import middleware from '../../middleware';

const { registerUserValidator } = middleware;

test('registerUserValidator calls next function if validation passes', async () => {
  const req = {
    body: {
      name: 'testuser',
      email: faker.internet.email(),
      password: 'password'
    }
  };

  const res = {
    sendFailureResponse() {}
  };

  const next = jest.fn();

  await registerUserValidator(req, res, next);

  expect(next).toHaveBeenCalled();
});

test('calls sendFailureResponse if validation fails', async () => {
  const req = {
    body: {
      name: 'testuser',
      email: 'testtest.com',
      password: 'password'
    }
  };

  const res = {
    sendFailureResponse: jest.fn()
  };

  const next = jest.fn();

  await registerUserValidator(req, res, next);

  expect(res.sendFailureResponse).toHaveBeenCalledWith(
    { errors: [ 'The email must be a valid email address.' ] }, 
    422
  );
  expect(next).not.toHaveBeenCalled();
});
