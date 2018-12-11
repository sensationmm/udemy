import supertest from 'supertest';
import faker from 'faker';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import { User, Recipe } from '../../../database/models';

import app from '../../../index';
import config from '../../../config';
import { generateUser, generateRecipe } from '../../utils/generate';

describe('Delete recipe process', () => {
  test('deletes recipe from database', async () => {
    const fakeRecipe = await generateRecipe();

    const { user, token, newUser } = await generateUser();

    const recipe = await Recipe.create({
      ...fakeRecipe, 
      userId: newUser.id
    });

    const res = await supertest(app).delete(`/api/v1/recipes/${recipe.id}`).send({
      access_token: token
    });

    expect(res.status).toBe(200);
    expect(res.body.data.message).toBe('Recipe deleted.');

    const recipesFromDatabase = await Recipe.findAll({ where: { id: recipe.id }});
    expect(recipesFromDatabase.length).toBe(0);
  });
});
