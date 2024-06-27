const {fileBaseConfig} = require('../../configs/index');
const sendNotification = async (token, notification) => {
  const message = {
    token,
    notification,
  }
  await fileBaseConfig.messaging().send(message);
}

module.exports = {
  sendNotification,
}