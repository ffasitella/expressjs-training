const userService = require('../services/users');
const bcryptService = require('../services/encryption');
const jwt = require('jwt-simple');
const { badRequestError } = require('../errors');

exports.signUp = (req, res, next) => {
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

exports.signIn = (req, res, next) => {
  userService
    .findByEmail({ email: req.body.email })
    .then(user => {
      if (user && bcryptService.isValid(req.body.password, user.password)) {
        const token = jwt.encode(user, process.env.JWT_SECRET);
        res.setHeader('Authorization', `Bearer ${token}`);
        res.end();
      } else {
        throw badRequestError('Invalid login attempt');
      }
    })
    .catch(next);
};
