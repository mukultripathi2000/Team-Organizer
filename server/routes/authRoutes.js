const passport = require('passport');
const User = require('../models/userModel');

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.send('{}');
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.send('Sucessfully logout');
};

exports.register = (req, res, next) => {
  User.register(
    { username: req.body.username, name: req.body.name },
    req.body.password,
    (err) => {
      if (err) {
        next(err);
      } else {
        passport.authenticate('local')(req, res, () => {
          res.send('Sucessfully registered user');
        });
      }
    }
  );
};

exports.login = (req, res, next) => {
  const user = new User({
    username: req.body.email,
    password: req.body.password,
  });
  req.login(user, (err) => {
    if (err) {
      next(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        res.send('Succesfully logged user');
      });
    }
  });
};
