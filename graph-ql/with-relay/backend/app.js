const express = require('express');
const expressGraphQL = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const Post = require('./src/types/Post');
const Query = require('./src/types/Query');
const Mutation = require('./src/types/Mutation');

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

const app = express();
app.use(cors());

const MONGO_URI = 'mongodb://kevin:asprilla1@ds119150.mlab.com:19150/with-relay'
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use('/backend', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(5000);
console.log('Server started on port 5000');
