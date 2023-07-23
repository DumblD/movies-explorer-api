const router = require('express').Router();
const { validateUsersMeInfo } = require('../appconfig/appConfig');
const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

router.get('/users/me', getUserInfo);

router.patch('/users/me', validateUsersMeInfo, updateUserInfo);

module.exports = router;
