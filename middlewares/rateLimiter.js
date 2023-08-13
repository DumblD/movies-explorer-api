const rateLimit = require('express-rate-limit');
const {
  TOO_MANY_REQUESTS_MESSAGE,
  TOO_MANY_SIGNIN_ATTEMPTS_MESSAGE,
} = require('../utils/constants');

const limiter = rateLimit({
  max: 5,
  windowMS: 10000, // 10 секунд
  message: { message: TOO_MANY_REQUESTS_MESSAGE },
});

const signInLimiter = rateLimit({
  max: 3,
  windowMS: 10000, // 10 секунд
  message: { message: TOO_MANY_SIGNIN_ATTEMPTS_MESSAGE },
});

module.exports = {
  limiter,
  signInLimiter,
};
