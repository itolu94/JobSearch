const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
      type: String,
      required: true
  },
  lastName: {
      type: String,
      required: true
  }, 
  username: { 
      type: String,
      required: true
  },
  password: {
    type: String,
    required: true,
  },
  jobs: {
    type: Array
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
