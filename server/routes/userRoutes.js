const { getUsersOfSystem, getUserInfoById } = require("../controllers/userController");

const router = require("express").Router();

router.post('/getUsersOfSystem/:userId', getUsersOfSystem);
router.get('/:userId', getUserInfoById);

module.exports = router;