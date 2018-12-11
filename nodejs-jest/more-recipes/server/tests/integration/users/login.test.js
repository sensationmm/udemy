import supertest from 'supertest';
import faker from 'faker';
import bcrypt from 'bcryptjs';

import { User } from '../../../database/models';
import { generateUser } from '../../utils/generate';

import app from '../../../index';

describe('User login', () => {
  test('user can login and get a jwt', async () => {
    const { user, token } = await generateUser();

    const res = await supertest(app).post('/api/v1/users/signin').send({
      email: user.email,
      password: user.password
    });

    expect(res.status).toBe(200);
    expect(res.body.data.access_token).toBeTruthy();
  });
});
