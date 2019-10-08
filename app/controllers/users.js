const userService = require('../services/users');
const bcryptService = require('../services/encryption');
const errors = require('../errors');
const passwordRegex = /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/;

exports.signUp = (req, res, next) => {
  if (!req.body.firstName) {
    throw errors.badRequestError('Please add first name');
  }
  if (!req.body.lastName) {
    throw errors.badRequestError('Please add last name');
  }
  if (!req.body.email || !req.body.email.endsWith('@wolox.com.ar')) {
    throw errors.badRequestError('Email must be part of Wolox domain');
  }
  if (!req.body.password || !req.body.password.lenght >= 8 || !req.body.password.match(passwordRegex)) {
    throw errors.badRequestError('Invalid password');
  }
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcryptService.encrypt(req.body.password)
  };
  userService
    .signUp(user)
    .then(u => res.status(200).send(u))
    .catch(next);
};
