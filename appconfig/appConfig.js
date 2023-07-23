const { celebrate, Joi } = require('celebrate');

const validateUsersMeInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'Поле "name" должно быть текстовым полем',
        'string.empty': 'Поле "name" должно быть заполнено',
        'string.min': 'Поле "name" - минимальная длина {#limit}',
        'string.max': 'Длина поля "name" должна быть меньше или равна {#limit}',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.base': 'Поле "email" должно быть текстовым полем',
        'string.empty': 'Поле "email" должно быть заполнено',
        'any.required': 'Поле "email" должно быть заполнено',
        'string.email': 'Поле "email" должно быть валидным email-адресом',
      }),
  }),
});

const validateMoviesPost = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.base': 'Поле "country" должно быть текстовым полем',
        'string.empty': 'Поле "country" должно быть заполнено',
        'any.required': 'Поле "country" должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'string.base': 'Поле "director" должно быть текстовым полем',
        'string.empty': 'Поле "director" должно быть заполнено',
        'any.required': 'Поле "director" должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'number.base': 'Поле "duration" должно быть числом',
        'any.required': 'Поле "director" должно быть заполнено',
      }),
    year: Joi.string().required()
      .messages({
        'string.base': 'Поле "year" должно быть текстовым полем',
        'string.empty': 'Поле "year" должно быть заполнено',
        'any.required': 'Поле "year" должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'string.base': 'Поле "description" должно быть текстовым полем',
        'string.empty': 'Поле "description" должно быть заполнено',
        'any.required': 'Поле "description" должно быть заполнено',
      }),
    // eslint-disable-next-line no-useless-escape
    image: Joi.string().required().pattern(/^https?:\/\/[A-Za-z0-9-._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]+$/)
      .messages({
        'string.base': 'Поле "image" должно быть текстовым полем',
        'string.empty': 'Поле "image" должно быть заполнено',
        'any.required': 'Поле "image" должно быть заполнено',
        'string.pattern.base': 'Поле "image" должно соответствовать шаблону: {#regex}',
      }),
    // eslint-disable-next-line no-useless-escape
    trailerLink: Joi.string().required().pattern(/^https?:\/\/[A-Za-z0-9-._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]+$/)
      .messages({
        'string.base': 'Поле "trailerLink" должно быть текстовым полем',
        'string.empty': 'Поле "trailerLink" должно быть заполнено',
        'any.required': 'Поле "trailerLink" должно быть заполнено',
        'string.pattern.base': 'Поле "trailerLink" должно соответствовать шаблону: {#regex}',
      }),
    // eslint-disable-next-line no-useless-escape
    thumbnail: Joi.string().required().pattern(/^https?:\/\/[A-Za-z0-9-._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]+$/)
      .messages({
        'string.base': 'Поле "thumbnail" должно быть текстовым полем',
        'string.empty': 'Поле "thumbnail" должно быть заполнено',
        'any.required': 'Поле "thumbnail" должно быть заполнено',
        'string.pattern.base': 'Поле "thumbnail" должно соответствовать шаблону: {#regex}',
      }),
    movieId: Joi.number().required()
      .messages({
        'number.base': 'Поле "movieId" должно быть числом',
        'any.required': 'Поле "movieId" должно быть заполнено',
      }),
    nameRU: Joi.string().required()
      .messages({
        'string.base': 'Поле "nameRU" должно быть текстовым полем',
        'string.empty': 'Поле "nameRU" должно быть заполнено',
        'any.required': 'Поле "nameRU" должно быть заполнено',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.base': 'Поле "nameEN" должно быть текстовым полем',
        'string.empty': 'Поле "nameEN" должно быть заполнено',
        'any.required': 'Поле "nameEN" должно быть заполнено',
      }),
  }),
});

const validateMoviesId = celebrate({
  params: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    movieId: Joi.string().required().hex().length(24)
      .messages({
        'string.base': '"movieId" должно быть текстовым полем',
        'string.empty': '"movieId" должно быть заполнено',
        'any.required': '"movieId" должно быть заполнено',
        'string.hex': '"movieId" должен содержать только шестнадцатеричные символы',
        'string.length': 'Длина "movieId" должна составлять {#limit} символов',
      }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.base': 'Поле "email" должно быть текстовым полем',
        'string.empty': 'Поле "email" должно быть заполнено',
        'any.required': 'Поле "email" должно быть заполнено',
        'string.email': 'Поле "email" должно быть валидным email-адресом',
      }),
    password: Joi.string().required()
      .messages({
        'string.base': 'Поле "password" должно быть текстовым полем',
        'string.empty': 'Поле "password" должно быть заполнено',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.base': 'Поле "email" должно быть текстовым полем',
        'string.empty': 'Поле "email" должно быть заполнено',
        'any.required': 'Поле "email" должно быть заполнено',
        'string.email': 'Поле "email" должно быть валидным email-адресом',
      }),
    password: Joi.string().required()
      .messages({
        'string.base': 'Поле "password" должно быть текстовым полем',
        'string.empty': 'Поле "password" должно быть заполнено',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'Поле "name" должно быть текстовым полем',
        'string.empty': 'Поле "name" должно быть заполнено',
        'string.min': 'Поле "name" - минимальная длина {#limit}',
        'string.max': 'Длина поля "name" должна быть меньше или равна {#limit}',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

module.exports = {
  validateUsersMeInfo,
  validateMoviesPost,
  validateMoviesId,
  validateAuthentication,
  validateRegistration,
};
