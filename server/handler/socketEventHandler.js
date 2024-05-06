const { addUserSession, mapUserToBoard, getBoardElementDataElseIfRequireCreateNewBoard } = require("../utils/userSocketDataStore");
const User = require("./../models/userModel");

const userConnectHandler = async (io, socket, userId, boardId) => {
    console.log(`userConnectHandler called with ${userId}, ${boardId}`);
    
    // add socket_id with userId in userSessions map to maintain the data
    addUserSession(userId, socket.id)

    // add userId into room with boardId, if room not exists with boardId please create else join the same room
    socket.join(boardId)

    // update boardUserMapping map with boardId and userId to maintain the data
    mapUserToBoard(userId, boardId)

    // get boardElements from boards map if available else get elements data from DB and update boards map data and process with below notification
    let boardElements = await getBoardElementDataElseIfRequireCreateNewBoard(boardId);
    console.log(`board data: ${boardElements}`);

    // publish BOARD_ELEMENTS event with boardID and boardElements to connected user socket id - to provide initial board elements on the client
    io.to(socket.id).emit('BOARD_ELEMENTS', boardElements)

    // publish USER_BOARD_JOINED event with boardID and userId to the room with boardId - to provide user connected info to the other subscribed users.
    const user = await User.findById({_id: userId})
    io.to(boardId).except(socket.id).emit('USER_BOARD_JOINED', {boardId, user})
}

module.exports = {
    userConnectHandler
};