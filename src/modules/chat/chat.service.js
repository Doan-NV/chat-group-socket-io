const chatRepository = require('./chat.repository');

const getCreateChat = async (req) => {
  const { userId } = req.body;
  if (!userId) {
    throw new Error('User ID is required');
  }

  const query = {
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  }

  const isChat = await chatRepository.findOnePopulateUserAndLastMessage(query);

  if (isChat) {
    return isChat;
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user.id, userId],
    };
    const createdChat = await chatRepository.createChat(chatData);
    const fullChat = await chatRepository.getFullChat(createdChat._id);
    return fullChat;
  }
}

const createGroupChat = async (req) => {
  const { name, users } = req.body;
  if (!name || !users) {
    throw new Error('Chat name and users are required');
  }

  if (users.length < 2) {
    throw new Error('At least 2 users are required');
  }

  users.push({ _id: req.user.id });


  const groupChatData = {
    chatName: name,
    users,
    isGroupChat: true,
    groupAdmin: {
      _id: req.user.id,
    },
  };

  const newGroupChat = await chatRepository.createChat(groupChatData);
  const fullGroupChat = await chatRepository.getFullGroupChat(newGroupChat._id);

  return fullGroupChat;
}


const getAllChats = async (req) => {
  const userID = req.user.id;
  const query = {
    users: { $elemMatch: { $eq: userID } },
  }
  const chats = await chatRepository.findPopulateUserGroupAdminAndLastMessage(query);

  if (!chats) {
    throw new Error('Chat not found');
  }

  return chats;
}

module.exports = {
  getCreateChat,
  createGroupChat,
  getAllChats,
};
