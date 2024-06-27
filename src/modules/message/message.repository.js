const messageModel = require("../../models/message.model");

const getAllMessage = async (chatId) => {
  const messages = await messageModel
    .find({ chat: chatId })
    .populate("sender", "name email")
    .populate("chat");
  return messages;
}

const createMessage = async (data) => {
  const newMessage = await messageModel.create(data);
  return newMessage;
}

const populateMessage = async (message) => {
  const data = await messageModel.findById(message._id)
    .populate("sender", "name email fmcToken")
    .populate({
      path: "chat",
      populate: {
        path: "users",
        select: "name email fmcToken",
      }
    });
  return data;
}

module.exports = {
  getAllMessage,
  createMessage,
  populateMessage,
}