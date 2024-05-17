const { Server } = require("socket.io");
const { addUserSession } = require("../utils/userSocketDataStore");
const { userConnectHandler, userDisconnectHandler, elementUpdateHandler, whiteboardClearHandler } = require("./socketEventHandler");

let elements = [];

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    const userId = socket.handshake.query.userId;
    const boardId = socket.handshake.query.boardId;
    
    console.log(`connect user called with User ID: ${userId}, BoardId: ${boardId}`);
    await userConnectHandler(io, socket, userId, boardId)


    socket.on("disconnect", async () => {
      await userDisconnectHandler(io, socket.id);
    });

    // event for board element update / new element creation
    socket.on("ELEMENT-UPDATE", async (eventData) => {
      console.log(`ELEMENT-UPDATE called `);
      // console.log(eventData);
      await elementUpdateHandler(io, socket, eventData);
    });

    // event for board clean event
    socket.on("WHITEBOARD-CLEAR", async (boardId) => {
      console.log(`whiteboard clear event called with boardId: ${boardId}`);
      await whiteboardClearHandler(io, boardId);
    });

    // need to handle below : TODO

    // event for user cursor position change
    socket.on("cursor-position", (cursorData) => {
      socket.broadcast.emit("cursor-position", {
        ...cursorData,
        userId: socket.id,
      });
    });
  });
};

module.exports = {
  initSocket,
};
