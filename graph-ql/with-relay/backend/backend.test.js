const { graphql, GraphQLSchema } = require('graphql');
const mongoose = require('mongoose');

const Query = require('./src/types/Query');
const Mutation = require('./src/types/Mutation');

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

const MONGO_URI = 'mongodb://kevin:asprilla1@ds119150.mlab.com:19150/with-relay'
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

describe('Check authentication workflow', () => {
  it('should test create user mutation', async () => {
    const mutation = `
      mutation CreateUser {
        createUser(input: { fullname: "Kevin Reynolds", username: "kevinreynolds", password: "password" }) {
          message
        }
      }
    `;

    const result = await graphql(schema, mutation);
    const { data } = result;

    expect(data.createUser.message).toBe('Success');
  });

  it('should test login user mutation', async () => {
    const mutation = `
      mutation LoginUser {
        loginUser(input: { username: "kevinreynolds", password: "password" }) {
          user {
            fullname
          }
        }
      }
    `;

    const result = await graphql(schema, mutation);
    const { data } = result;

    expect(data.loginUser.user.fullname).toBe('Kevin Reynolds');
  });
});
