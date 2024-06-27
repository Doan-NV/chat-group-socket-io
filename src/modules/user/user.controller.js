const userService = require('./user.service');

const createUser = (req, res, next) => {
  try {
    const user = userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const getUserById = (req, res, next) => {
  try {
    const user = userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const searchUser = (req, res, next) => {
  try {
    const users = userService.searchUser(req.query);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }

}

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


module.exports = {
  createUser,
  getUserById,
  searchUser,
  getProfile,
};
