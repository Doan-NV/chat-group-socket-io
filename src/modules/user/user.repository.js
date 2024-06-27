const { default: mongoose } = require('mongoose');
const User = require('../../models/user.model');

const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

const getUserById = async (id) => {
  const user = await User.findOne({_id: new mongoose.Types.ObjectId(id)}).select("-password").exec();
  return user;
};

const getListUser = async (name) => {
  const user = await User.find({ name }).select('name').lean().exec();
  return user;
}

const findOneByQuery = async (query) => {
  const user = await User.findOne({...query}).exec();
  return user;
}

const findByQuery = async (query) => {
  const user = await User.find({...query}).exec();
  return user;
}

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email }).exec();
  return user;
}

module.exports = {
  createUser,
  getUserById,
  getListUser,
  findOneByQuery,
  findByQuery,
  getUserByEmail,
};
