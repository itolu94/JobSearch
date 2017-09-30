const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./../../model/user');
const passportHelper = require('../passportHelper');
const Strategy = require('passport-facebook').Strategy;


module.exports = (passport, port) => {
    const checkPassword = (password, savedPassword) => {
        return bcrypt.compareSync(password, savedPassword, (err, result) => {
            return result;
        });
    };

    passport.use('signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, cb) => {
        Users.findOne({
            email,
        }, (err, user) => {
            if (err) return cb(err);
            if (!user) return cb(null, false);
            if (!checkPassword(password, user.password)) return cb(null, false);
            return cb(null, user);
        });
    }));

    passport.use('facebook', new Strategy({
            clientID: '1871471559835158',
            clientSecret: '74c218b580baf18eae1b6cbe72d127e6',
            callbackURL: `https://developerjobsearch.herokuapp.com//facebook/login/return`
        },
        function (accessToken, refreshToken, profile, cb) {
            if (profile) {
                Users.findOne({email: profile.id}, (err, user) => {
                    if (err) {
                        console.log(err);
                        return cb(err);
                    } else if (user) {
                        return cb(null, user)
                    } else {
                        passportHelper.createFacebookAccount(profile, (err, user) => {
                            if (err) {
                                console.log(err);
                                return cb(err);
                            }
                            return cb(null, user);
                        });
                    }

                });
            }

        }));


    passport.serializeUser((user, cb) => cb(null, user._id));

    passport.deserializeUser((_id, cb) => {
        Users.find({
            _id,
        }, (err) => {
            if (err) {
                return cb(err);
            }
            return cb(null, _id);
        });
    });
};