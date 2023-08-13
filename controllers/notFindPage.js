const NotFoundError = require('../utils/customErrorsClasses/NotFoundError');
const { NOT_FOUND_MESSAGE } = require('../utils/constants');

const notFindPage = async (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
};

module.exports = { notFindPage };
