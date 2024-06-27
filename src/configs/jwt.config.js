require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY || 'secretKey';
const options = {
  expiresIn: process.env.EXPIRES_IN || '1h',
};

module.exports = { secretKey, options };
