const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = require('graphql');

const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../interface/Node');

const User = new GraphQLObjectType({
  name: 'User',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField(),
    username: {
      type: GraphQLString,
      resolve: user => user.username
    },
    password: {
      type: GraphQLString,
      resolve: user => user.password
    },
    fullname: {
      type: GraphQLString,
      resolve: user => user.fullname
    }
  }
});

module.exports = { User };
