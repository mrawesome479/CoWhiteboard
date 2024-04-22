const { createBoard, assignUserToBoard, getBoardDetails, removeUserFromBoard, getBoardsForUser, deleteBoardById } = require("../controllers/boardController")

const router = require("express").Router();

router.post('/createBoard', createBoard);
router.post('/assignUser', assignUserToBoard);
router.post('/removeUser', removeUserFromBoard);
router.get('/:boardId', getBoardDetails);
router.delete('/:boardId', deleteBoardById);
router.get('/getBoardsForUser/:userId', getBoardsForUser);

// TODO: update board API - future once required

module.exports = router;