const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = require('graphql');

const { mutationWithClientMutationId } = require('graphql-relay');
const { Post } = require('./Post');
const PostModel = require('../models/Post');
const { User } = require('./User');
const UserModel = require('../models/User');

const CreatePostMutation = mutationWithClientMutationId({
  name: 'CreatePost',
  inputFields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    post: { type: Post }
  },
  mutateAndGetPayload: args => {
    return new Promise((resolve, reject) => {
      PostModel.createPost({
        title: args.title,
        content: args.content,
        userId: args.userId
      })
        .then(post => resolve({ post }))
        .catch(reject);
    });
  }
});

const CreateUserMutation = mutationWithClientMutationId({
  name: 'CreateUser',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    fullname: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    message: {
      type: GraphQLString
    }
  },
  mutateAndGetPayload: args => {
    return new Promise((resolve, reject) => {
      UserModel.createUser({
        username: args.username,
        password: args.password,
        fullname: args.fullname
      })
        .then(user => resolve({ message: 'Success' }))
        .catch(reject);
    });
  }
});

const LoginUserMutation = mutationWithClientMutationId({
  name: 'LoginUser',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    user: { type: User }
  },
  mutateAndGetPayload: args => {
    return new Promise((resolve, reject) => {
      UserModel.loginUser({
        username: args.username,
        password: args.password
      })
        .then(user => resolve({ user }))
        .catch(reject);
    });
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: CreatePostMutation,
    createUser: CreateUserMutation,
    loginUser: LoginUserMutation
  }
});

module.exports = Mutation;
