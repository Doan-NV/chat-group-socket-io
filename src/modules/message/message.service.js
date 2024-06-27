const messageRepository = require("./message.repository");
const { notificationService } = require("../notification/index")
const getAllMessage = async (chatId) => {
  const messages = await messageRepository.getAllMessage(chatId);
  return messages;
}

const sendMessage = async (req) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    throw new Error("Invalid data passed into request");
  }

  const sender = req.user.id;

  let newMessage = {
    sender,
    content,
    chat: chatId,
  };

  let message = await messageRepository.createMessage(newMessage);
  message = await messageRepository.populateMessage(message);

  if (process.env.ENABLE_PUSH_NOTIFICATION === "true") {
    // Send push notification
    const notificationData = {
      title: "New Message",
      body: message.content,
    };
    const users = message.chat.users.filter(user => user.fmcToken && user._id.toString() !== sender.toString());
    await Promise.all(users.map(user => notificationService.sendNotification(user.fmcToken, notificationData)));
  }
  return message;
}

module.exports = {
  getAllMessage,
  sendMessage,
}