const { Server } = require("socket.io");
const { addUserSession } = require("../utils/userSocketDataStore");
const { userConnectHandler } = require("./socketEventHandler");

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

    // below code to be implemented later
    
    io.to(socket.id).emit("whiteboard-state", elements);

    socket.on("element-update", (elementData) => {
      updateElementInElements(elementData);
      socket.broadcast.emit("element-update", elementData);
    });

    socket.on("whiteboard-clear", () => {
      elements = [];
      socket.broadcast.emit("whiteboard-clear");
    });

    socket.on("cursor-position", (cursorData) => {
      socket.broadcast.emit("cursor-position", {
        ...cursorData,
        userId: socket.id,
      });
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("user-disconnected", socket.id);
    });
  });
};

const updateElementInElements = (elementData) => {
  const index = elements.findIndex((element) => element.id === elementData.id);

  if (index === -1) return elements.push(elementData);

  elements[index] = elementData;
};

module.exports = {
  initSocket,
};
