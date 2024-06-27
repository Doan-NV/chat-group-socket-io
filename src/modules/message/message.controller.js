const messageService = require("./message.service");
const getAllMessage = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const messages = await messageService.getAllMessage(chatId);

  res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
}

const sendMessage = async (req, res, next) => {
  try {
    const message = await messageService.sendMessage(req);

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }

}

module.exports = {
  getAllMessage,
  sendMessage,
}

