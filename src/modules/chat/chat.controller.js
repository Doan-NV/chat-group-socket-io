const chatService = require("./chat.service");

const getCreateChat = async (req, res, next) => {
  try {
    const data = await chatService.getCreateChat(req);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createGroupChat = async (req, res, next) => {
  try {
    const data = await chatService.createGroupChat(req);
    res.json(data);
  } catch (error) {
    next(error);
  }

}

const getAllChats = async (req, res, next) => {
  try {
    const data = await chatService.getAllChats(req);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }

}

module.exports = {
  getCreateChat,
  createGroupChat,
  getAllChats,
}



