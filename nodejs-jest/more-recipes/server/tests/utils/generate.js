import faker from 'faker';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';

import { User } from '../../database/models';

export const generateUser = async () => {

  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  const newUser = await User.create({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  });

  const token = jwt.sign({ email: user.email }, config.JWT_SECRET)

  return { user, token, newUser };
};

export const generateRecipe = () => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(3),
    timeToCook: 40,
    imageUrl: faker.internet.url(),
    ingredients: JSON.stringify([faker.lorem.sentences(2)]),
    procedure: JSON.stringify([faker.lorem.sentences(2)])
});
