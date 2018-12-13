const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require('graphql');

const { connectionArgs, connectionFromPromisedArray } = require('graphql-relay');

const { nodeField } = require('../interface/Node');
const { Post, PostConnection } = require('./Post');
const PostModel = require('../models/Post');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    posts: {
      type: PostConnection,
      args: connectionArgs,
      resolve: (parentValue, args) => {
        return connectionFromPromisedArray(PostModel.getPosts(), args);
      }
    }
  }
});

module.exports = Query;
