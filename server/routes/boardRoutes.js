const { createBoard, assignUserToBoard, getBoardDetails, removeUserFromBoard } = require("../controllers/boardController")

const router = require("express").Router();

router.post('/createBoard', createBoard);
router.post('/assignUser', assignUserToBoard);
router.post('/removeUser', removeUserFromBoard);
router.get('/:boardId', getBoardDetails);

module.exports = router;