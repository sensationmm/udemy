import supertest from 'supertest';
import faker from 'faker';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import { User, Recipe } from '../../../database/models';

import app from '../../../index';
import config from '../../../config';
import { generateUser, generateRecipe } from '../../utils/generate';

describe('Get recipe process', () => {
  test('can get a single recipe by id', async () => {
    const fakeRecipe = await generateRecipe();

    const { user, token, newUser } = await generateUser();

    const recipe = await Recipe.create({
      ...fakeRecipe, 
      userId: newUser.id
    });

    const res = await supertest(app).get(`/api/v1/recipes/${recipe.id}`).send({
      access_token: token
    });

    expect(res.status).toBe(200);
    expect(res.body.data.recipe.title).toBe(fakeRecipe.title);
  });

  test('returns 404 if recipe not found', async () => {
    const { user, token, newUser } = await generateUser();
    const res = await supertest(app).get(`/api/v1/recipes/200`).send({
      access_token: token
    });

    expect(res.status).toBe(404);
    expect(res.body.data.message).toBe('Recipe not found.');
  });
});
