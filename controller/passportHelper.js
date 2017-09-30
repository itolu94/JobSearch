const mongoose = require('mongoose');
const User = mongoose.model('User');
const Notes = require('../model/notes.js');
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
                name: (data.firstName + data.lastName) || '',
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


exports.createFacebookAccount = (data, cb) => {
        let newUser = new User({
            email:   data.id,
            username: data.displayName,
            name: data.displayName,
            password: `password/facebook.${data.id}`
        });
        newUser.save((err) => {
            if (err) {
                return cb(err);
            }
            return cb(null, newUser);
        });

};