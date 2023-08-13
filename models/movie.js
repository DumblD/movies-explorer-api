const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    // eslint-disable-next-line no-useless-escape
    match: /^https?:\/\/[A-Za-z0-9-._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]+$/,
  },
  trailerLink: {
    type: String,
    required: true,
    // eslint-disable-next-line no-useless-escape
    match: /^https?:\/\/[A-Za-z0-9-._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]+$/,
  },
  thumbnail: {
    type: String,
    required: true,
    // eslint-disable-next-line no-useless-escape
    match: /^https?:\/\/[A-Za-z0-9-._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]+$/,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model('movie', movieSchema);
