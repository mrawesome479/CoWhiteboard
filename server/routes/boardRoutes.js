const { createBoard, assignUserToBoard, getBoardDetails } = require("../controllers/boardController")

const router = require("express").Router();

router.post('/createBoard', createBoard);
router.post('/assignUser', assignUserToBoard);
router.get('/:boardId', getBoardDetails);

module.exports = router;