const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  max: 5,
  windowMS: 10000, // 10 секунд
  message: { message: 'Вы не можете сделать больше запросов. Попробуйте позже' },
});

const signInLimiter = rateLimit({
  max: 3,
  windowMS: 10000, // 10 секунд
  message: { message: 'Слишком много попыток входа. Попробуйте позже.' },
});

module.exports = {
  limiter,
  signInLimiter,
};
