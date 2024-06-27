const userRepository = require('./user.repository');

const createUser = async (data) => {
  const newUser = await userRepository.createUser(data);
  return newUser;
};

const getUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  return user;
};

const getListUser = async (username) => {
  const user = await userRepository.getListUser(username);
  return user;
}

const findOneByQuery = async (query) => {
  const user = await userRepository.findOneByQuery(query);
  return user;
}

const getUserByEmail = async (email) => {
  const user = await userRepository.getUserByEmail(email);
  return user;

}

const getProfile = async (user) => {
  const detail = await userRepository.getUserById(user.id);
  return detail;
}



module.exports = {
  createUser,
  getUserById,
  getListUser,
  findOneByQuery,
  getUserByEmail,
  getProfile
};
