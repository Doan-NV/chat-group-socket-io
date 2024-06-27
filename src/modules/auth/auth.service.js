const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { options, secretKey } = require('../../configs/jwt.config');
const { userService } = require('../user');

const register = async (userData) => {
  const { email } = userData;
  const existingUser = await userService.getUserByEmail(email);
  
  if (existingUser) {
    throw new Error('Username already exists');
  }

  const user = await userService.createUser(userData);
  const token = jwt.sign({ id: user._id }, secretKey, options);

  return token;
};

const login = async ({ email, password }) => {
  const user = await userService.findOneByQuery({email: email});

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({ id: user._id }, secretKey, options);

  return token;
};


module.exports = {
  register,
  login,
};
