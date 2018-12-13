const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  content: String
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = {
  getPosts: () => {
    return PostModel.find();
  },
  getPost: id => {
    return PostModel.findOne({ _id: id });
  },
  createPost: post => {
    return PostModel(post).save();
  }
};
