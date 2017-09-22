const mongoose = require('mongoose');
const User = mongoose.model('User');
const Notes = mongoose.model('Notes');
const bcrypt = require('bcrypt');

exports.createAccount = (data, cb) => {
  User.findOne({
    email: data.email,
  }, (err, users) => {
    if (users) return cb({err: 'email already registered'});
    bcrypt.hash(data.password, 10, (err, hash) => {
      let newUser = new User({
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hash
      });
      newUser.save((err) => {
        if (err) {
          return cb(err);
        }
        return cb(null);
      });
    });
  });
};