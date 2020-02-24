const express = require('express');
const app = express();
const morgan = require('morgan');
const session = require('express-session');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SESSION MIDDLEWARE
app.use(session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    resave: false,
    saveUninitialized: false
}));

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    try {
      done(null, user.id);
    } catch (err) {
      done(err);
    }
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(done);
});

// server.js
app.use('/api', require('./api')); // matches all requests to /api

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html');
});

app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});