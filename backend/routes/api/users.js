const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


// User Model
const User = require('../../models/User');
const passport = require('passport');

//passport middleware
// require('../../config/passportConfig')(passport);
// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/register', (req, res) => {
    const { name, email, username, password } = req.body;

    // Simple validation
    if (!name || !email || !username || !password) {
        return res.status(400).json({ "msg": 'pass all fields' });
    }

    // Check for existing user
    User.findOne({ username })
        .then(user => {
            if (user) return res.status(400).json({ "msg": 'user already exists' });
            else {
                const newUser = new User({
                    name,
                    email,
                    username,
                    password
                });

                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json({
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email,
                                    password: user.password
                                }
                            }))
                            .catch(err => console.log(err));
                    });
                })
            }
        })
});


// @route POST api/users/login
// @desc Login user using local passport strategy
// @access Public
// router.post('/login', (req, res, next) => {
//     passport.authenticate("local", { session: true }, (err, user, info) => {
//         if (err) throw err;
//         if (!user) res.status(400).json({ "msg": 'user not found' });
//         else {
//             req.logIn(user, (err) => {
//                 if (err) {
//                     res.status(400).json({ msg: "Could not log in user" });
//                 }
//                 res.json({
//                     user: {
//                         id: user.id,
//                         username: user.username,
//                         email: user.email
//                     }
//                 });
//                 console.log('user logged in');
//                 console.log(req.user);
//             });

//         }
//     })(req, res, next);

// });
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                error: 'User not found'
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            res.json({
                user: user
            });
        });
    })(req, res, next);
    console.log('user logged in');
})

// @route to send that the user is authenticated to frontend
router.get('/', (req, res) => {
    console.log('/');
    console.log(req.user);
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        res.sendStatus(200);
        console.log('200');
    } else {
        res.sendStatus(401);
        console.log(401);
    }



});
// @route POST api/users/logout
// @desc Logout user
// @access Public
router.delete('/logout', (req, res) => {
    console.log(req.user);
    req.logout();
    req.session.destroy();
    res.json({ "msg": 'logged out' });
    console.log('logged out');
    console.log(req.session)
    console.log(req.user);
    console.log(req.isAuthenticated());
    console.log('test')
});
router.put('/check', (req, res) => {
    res.json(req.user);
    console.log(req.user);
})



module.exports = router;