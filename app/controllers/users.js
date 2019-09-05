const userService = require('../services/users');
const bcryptService = require('../services/encryption');

exports.signUp = (req, res, next) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcryptService.encrypt(req.body.password)
  };
  userService
    .signUp(user)
    .then(u => res.send(u))
    .catch(next);
};
