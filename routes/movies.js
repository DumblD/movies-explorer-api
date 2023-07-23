const router = require('express').Router();
const {
  validateMoviesPost,
  validateMoviesId,
} = require('../appconfig/appConfig');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', validateMoviesPost, createMovie);

router.delete('/movies/:movieId', validateMoviesId, deleteMovie);

module.exports = router;
