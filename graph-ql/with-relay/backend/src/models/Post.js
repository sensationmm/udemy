const mongoose = require('mongoose');
const { Schema } = mongoose;
const { fromGlobalId } = require('graphql-relay');

const UserModel = require('./User');

const PostSchema = new Schema({
  title: String,
  content: String,
  userId: String
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = {
  getPosts: order => {
    return PostModel.find().sort({ _id: (order === 'DESC') ? -1 : 1 });
  },
  getPost: id => {
    return PostModel.findOne({ _id: id });
  },
  createPost: post => {
    return PostModel(post).save();
  },
  getPostAuthor: async postId => {
    const post = await module.exports.getPost(postId);
    const { type, id } = fromGlobalId(post.userId);

    if(type === 'User') {
      return UserModel.getUser(id);
    }

    return null;
  }
};
