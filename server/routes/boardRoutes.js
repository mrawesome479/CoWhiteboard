const { createBoard, assignUserToBoard, getBoardDetails, removeUserFromBoard, getBoardsForUser, deleteBoardById, createBoardWithMembers } = require("../controllers/boardController")
const { addElementsToBoard } = require('../controllers/boardElementController')

const router = require("express").Router();

router.post('/createBoard', createBoard);
router.post('/createBoardWithMembers', createBoardWithMembers);
router.post('/assignUser', assignUserToBoard);
router.post('/removeUser', removeUserFromBoard);
router.get('/:boardId', getBoardDetails);
router.delete('/:boardId', deleteBoardById);
router.get('/getBoardsForUser/:userId', getBoardsForUser);

// API for board element update via HTTP path with boardId
router.post('/addElementsToBoard/:boardId', addElementsToBoard);

// TODO: update board API - future once required

module.exports = router;