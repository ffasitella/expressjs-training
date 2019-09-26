const { badRequestError } = require('../errors');
const { defaultError } = require('../errors');
const userModel = require('../models').user;
const logger = require('.././logger');

exports.signUp = user =>
  userModel
    .create({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password
    })
    .then(u => {
      logger.info(`${u.firstName}`);
      return u;
    })
    .catch(error => {
      logger.info(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw defaultError('Email is already in use');
      }
      throw badRequestError(error.message);
    });
