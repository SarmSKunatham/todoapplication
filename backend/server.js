// import here
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secretcode"));
app.use(session({ secret: 'secretcode', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passportConfig')(passport);

// app.use((req, res, next) => {
//     console.log(session);
//     console.log(req.user);
//     console.log('done');
//     next();
// });


// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/lists', require('./routes/api/lists'));



// Serve static assests if in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}




// -------------------------------------------------
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})