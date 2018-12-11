import supertest from 'supertest';
import faker from 'faker';

import { User } from '../../../database/models';

import app from '../../../index';

describe('User sign up', () => {
  test('should register a new user', async () => {

    const fakeUser = {
      name: 'Test User',
      email: faker.internet.email(),
      password: 'password'
    };

    const res = await supertest(app).post('/api/v1/users/signup').send(fakeUser);

    expect(res.status).toBe(200);
    expect(res.body.data.user.name).toEqual(fakeUser.name);
    expect(res.body.data.user.email).toEqual(fakeUser.email);
    expect(res.body.data.access_token).toBeTruthy();

    const userFromDatabase = await User.find({ where: { email: fakeUser.email }});
    expect(userFromDatabase).toBeTruthy();
  });

  test('should return validation error for duplicate email', async () => {
    const fakeUser = {
      name: 'Test User',
      email: faker.internet.email(),
      password: 'password'
    };

    await User.create(fakeUser);

    const res = await supertest(app).post('/api/v1/users/signup').send(fakeUser);

    expect(res.status).toBe(422);
    expect(res.body).toMatchSnapshot();
  });

});
