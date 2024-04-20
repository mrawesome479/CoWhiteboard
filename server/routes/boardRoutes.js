const { createBoard, assignUserToBoard } = require("../controllers/boardController")

const router = require("express").Router();

router.post('/createBoard', createBoard);
router.post('/assignUser', assignUserToBoard);

module.exports = router;