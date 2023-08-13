const mongoose = require('mongoose');
const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('../utils/errorsStatusCodes');
const NotFoundError = require('../utils/customErrorsClasses/NotFoundError');
const ConflictError = require('../utils/customErrorsClasses/ConflictError');
const BadRequestError = require('../utils/customErrorsClasses/BadRequestError');
const ValidationError = require('../utils/customErrorsClasses/ValidationError');
const {
  NOT_FOUND_MESSAGE,
  NOT_UNIQUE_EMAIL_MESSAGE,
  INCORRECT_DATA_TRANSMITTED_MESSAGE,
} = require('../utils/constants');

const errorsHandler = (err, req, res, next) => {
  let error = err;
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    error = new NotFoundError(NOT_FOUND_MESSAGE);
  } else if (err.code === 11000) {
    error = new ConflictError(NOT_UNIQUE_EMAIL_MESSAGE);
  } else if (err instanceof mongoose.Error.CastError) {
    error = new BadRequestError(INCORRECT_DATA_TRANSMITTED_MESSAGE);
  } else if (err instanceof mongoose.Error.ValidationError) {
    error = new ValidationError(INCORRECT_DATA_TRANSMITTED_MESSAGE);
  }
  if (!error.statusCode) {
    // eslint-disable-next-line no-console
    console.log({ error: err.message });
  }
  res.status(error.statusCode || HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
    message: error.statusCode ? error.message : 'Произошла ошибка',
  });
  next();
};

module.exports = errorsHandler;
