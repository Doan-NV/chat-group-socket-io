const chatModel = require('../../models/chat.model');
const findOnePopulateUserAndLastMessage = async (query) => {
  const chat = await chatModel.findOne(query)
    .populate('users', '-password')
    .populate('latestMessage');
  return chat;
};

const createChat = async (data) => {
  const newChat = await chatModel.create(data);
  return newChat;
}

const getFullChat = async (chatId) => {
  const chat = await chatModel
    .findOne({ _id: chatId })
    .populate("users", "-password");
  return chat;
}

const getFullGroupChat = async (chatId) => {
  const fullGroupChat = await chatModel
    .findOne({ _id: chatId })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  return fullGroupChat;
}

const findOne = async (query) => {
  const chat = await chatModel.findOne({
    ...query, isDeleted: false
  }).exec();
  return chat;
}

const addToGroup = async (chatId, userId) => {
  const added = await chatModel.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  return added;
}

const updateChatAndPopulate = async (chatId, updateData) => {
  const updatedChat = await chatModel
    .findByIdAndUpdate(
      chatId,
      updateData,
      {
        new: true,
      }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  return updatedChat;
}

const findPopulateUserGroupAdminAndLastMessage = async (query) => {
  const chat = await chatModel.findOne(query)
    .populate('users', '-password')
    .populate('groupAdmin', '-password')
    .populate('latestMessage')
    .sort({ updatedAt: -1 });

  return chat;

}

module.exports = {
  findOnePopulateUserAndLastMessage,
  createChat,
  getFullChat,
  getFullGroupChat,
  findOne,
  addToGroup,
  updateChatAndPopulate,
  findPopulateUserGroupAdminAndLastMessage,
}