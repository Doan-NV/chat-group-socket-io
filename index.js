// const { Redis } = require("ioredis");
const { Server } = require("socket.io");
// const { createAdapter } = require("@socket.io/redis-adapter");
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const pubClient = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD,
// });
// const subClient = pubClient.duplicate();

const io = new Server(server, {
  // adapter: createAdapter(pubClient, subClient),
  cors: {
    origin: "*",
    // credentials: true,
  },
  pingTimeout: 60000,
});
const socketConstants = require('./src/constants/index');

io.on(socketConstants.CONNECTION, (socket) => {

  socket.on(socketConstants.SETUP, (userData) => {
    socket.join(userData._id);
    socket.emit(socketConstants.CONNECTED);
  });

  socket.on(socketConstants.JOIN_CHAT, (room) => {
    socket.join(room);
  });

  socket.on(socketConstants.NEW_MESSAGE, (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) {
      return;
    }
    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) {
        return;
      };
      socket.in(user._id).emit(socketConstants.MESSAGE_RECEIVED, newMessageReceived);
    });
  });

  socket.off(socketConstants.SETUP, () => {
    socket.leave(userData._id);
  });
});
