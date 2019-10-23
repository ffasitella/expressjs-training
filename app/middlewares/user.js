const { check } = require('express-validator/check');
const { badRequestError } = require('../errors');
const { validationResult } = require('express-validator/check');

exports.validateSignUp = () => [
  check('firstName', 'Missing first name')
    .not()
    .isEmpty(),
  check('lastName', 'Missing last name')
    .not()
    .isEmpty(),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Missing email')
    .isEmail()
    .custom(address => address.includes('@wolox.com.ar'))
    .withMessage('Email must be part of Wolox domain'),
  check('password', 'Invalid password')
    .not()
    .isEmpty()
    .isLength(8)
    .isAlphanumeric()
];

exports.validateError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(badRequestError(errors.array()));
  }
  return next();
};
