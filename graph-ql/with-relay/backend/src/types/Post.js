const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = require('graphql');

const { globalIdField, connectionDefinitions } = require('graphql-relay');
const { nodeInterface } = require('../interface/Node');

const Post = new GraphQLObjectType({
  name: 'Post',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField(),
    title: {
      type: GraphQLString,
      resolve: post => post.title
    },
    content: {
      type: GraphQLID,
      resolve: post => post.content
    },
  }
});

const { connectionType: PostConnection } = connectionDefinitions({
  nodeType: Post
});

module.exports = { Post, PostConnection };
