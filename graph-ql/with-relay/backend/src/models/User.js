const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String,
  fullname: String
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
  getUser: (id, username) => {
    return UserModel.findOne({ 
      $or: [{ _id: id }, { username: username }]
    });
  },
  loginUser: loginUserInput => {
    const { username, password } = loginUserInput;
    return UserModel.findOne({
      $and: [{ username: username }, { password: password } ]
    });
  },
  createUser: user => {
    return UserModel(user).save();
  }
};
