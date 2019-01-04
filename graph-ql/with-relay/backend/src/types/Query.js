const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require('graphql');

const { 
  connectionArgs, 
  connectionFromPromisedArray,
  fromGlobalId
} = require('graphql-relay');

const { User } = require('./User');
const UserModel = require('../models/User');

const { nodeField } = require('../interface/Node');
const { Post, PostConnection } = require('./Post');
const PostModel = require('../models/Post');

const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    allPosts: {
      type: new GraphQLNonNull(PostConnection),
      args: { ...connectionArgs, order: { type: GraphQLString } },
      resolve: (parentValue, args) => {
        return connectionFromPromisedArray(PostModel.getPosts(args.order), args)
      }
    },
    User: {
      type: User,
      args: {
        id: { type: GraphQLID },
        username: { type: GraphQLString }
      },
      resolve: (parentValue, args) => {
        const { type, id } = fromGlobalId(args.id);
        if(type === 'User') {
          return UserModel.getUser(id, args.username);
        }

        return null;
      }
    },
    id: {
      type: new GraphQLNonNull(GraphQLID),
      args: {},
      resolve: (parentValue, args) => 'viewer-fixed'
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    viewer: {
      name: 'Viewer',
      type: new GraphQLNonNull(Viewer),
      resolve: (parentValue, args) => {
        return {};
      }
    }
  }
});

module.exports = Query;
