// passport config
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, (err, user) => {

                if (err) return done(err);
                if (!user) { return done(null, false); } else {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) return done(err);
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    })
                }
            })
        }
    ));
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((_id, done) => {
        User.findOne({ _id: _id }, (err, user) => {
            if (err) {
                done(null, false);
            } else {
                done(null, user);

            }
        });
    });
    console.log('passport config loaded');
}