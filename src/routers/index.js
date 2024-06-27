const authRouter = require('./auth.router');
const chatRouter = require('./chat.router');
const messageRouter = require('./message.router');
const userRouter = require('./user.router');

module.exports = {
  chatRouter,
  authRouter,
  messageRouter,
  userRouter,
};
