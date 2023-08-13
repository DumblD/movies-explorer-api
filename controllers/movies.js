const Movie = require('../models/movie');
const {
  NO_RIGHTS_MESSAGE,
  FILM_REMOVED_MESSAGE,
} = require('../utils/constants');
const ForbiddenError = require('../utils/customErrorsClasses/ForbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const ownId = req.user._id;
    const movies = await Movie.find({ owner: ownId })
      .orFail();
    res.status(200).send({ data: movies });
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const createdCard = await Movie.create({ ...req.body, owner: ownerId });
    const newMovie = JSON.parse(JSON.stringify(createdCard));
    delete newMovie.__v;
    res.status(201).send(newMovie);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const ownId = req.user._id;
    const selectedMovie = await Movie.findById(req.params.movieId)
      .orFail();
    const movieIdOwner = selectedMovie.owner.toString();
    if (ownId !== movieIdOwner) {
      throw new ForbiddenError(NO_RIGHTS_MESSAGE);
    }
    await selectedMovie.deleteOne();
    res.status(200).send({ message: FILM_REMOVED_MESSAGE });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
