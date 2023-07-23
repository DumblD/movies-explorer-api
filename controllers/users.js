const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../utils/customErrorsClasses/UnauthorizedError');

const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const foundUser = await User.findOne({ email })
      .select('+password');
    if (!foundUser) {
      throw new UnauthorizedError('Неуспешная авторизация');
    }
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Неуспешная авторизация');
    }
    const jwt = jsonWebToken.sign(
      { _id: foundUser._id },
      process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'jwt-secret-key',
    );
    res
      .cookie('jwt', jwt, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
    res.status(200).send({ message: 'Аутентификация прошла успешна' });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const createdUser = await User.create({ ...req.body, password: passwordHash });
    const newUser = JSON.parse(JSON.stringify(createdUser));
    const {
      __v,
      password,
      _id,
      ...newUserClear
    } = newUser;
    res.status(201).send(newUserClear);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    if (req.cookies) {
      res
        .cookie('jwt', '', {
          maxAge: 0,
          httpOnly: true,
          sameSite: true,
        });
      res.status(200).send({ message: 'Cookies удалены' });
    }
  } catch (err) {
    next(err);
  }
};

const searchUser = async (userId) => {
  const foundUser = await User.findById(userId)
    .orFail();
  return foundUser;
};

const getUserInfo = async (req, res, next) => {
  try {
    const foundUser = await searchUser(req.user._id);
    const userInfo = JSON.parse(JSON.stringify(foundUser));
    const {
      _id,
      ...userInfoClear
    } = userInfo;
    res.status(200).send(userInfoClear);
  } catch (err) {
    next(err);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const updateInfo = {
      email: req.body.email,
      name: req.body.name,
    };
    const updatedUserInfo = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateInfo },
      { new: true, runValidators: true },
    );
    const newUserInfo = JSON.parse(JSON.stringify(updatedUserInfo));
    const {
      _id,
      ...newUserInfoClear
    } = newUserInfo;
    res.status(200).send(newUserInfoClear);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  createUser,
  logout,
  getUserInfo,
  updateUserInfo,
};
