const router = require('express').Router();
const {
  validateAuthentication,
  validateRegistration,
} = require('../appconfig/appConfig');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const invalidRoutes = require('./notFindPages');
const {
  login,
  createUser,
  logout,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', validateAuthentication, login);

router.post('/signup', validateRegistration, createUser);

router.post('/signout', logout);

router.use(auth);

router.use(usersRouter, moviesRouter, invalidRoutes);

module.exports = router;
