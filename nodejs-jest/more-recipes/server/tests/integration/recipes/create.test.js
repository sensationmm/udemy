import supertest from 'supertest';
import faker from 'faker';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import { User, Recipe } from '../../../database/models';

import app from '../../../index';
import config from '../../../config';
import { generateUser, generateRecipe } from '../../utils/generate';

describe('Create recipe process', () => {
  test('should create recipe and return recipe details', async () => {
    const fakeRecipe = await generateRecipe();

    const { token } = await generateUser();

    const res = await supertest(app).post('/api/v1/recipes').send({
      ...fakeRecipe,
      access_token: token
    });
    const { recipe } = res.body.data;

    expect(res.status).toBe(201);
    expect(res.body.data.recipe.title).toBe(fakeRecipe.title);
    expect(res.body.data.recipe.description).toBe(fakeRecipe.description);

    const recipeFromDatabase = await Recipe.findById(recipe.id);

    expect(recipeFromDatabase).toBeTruthy();
  });
});
