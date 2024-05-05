const { getUsersOfSystem } = require("../controllers/userController");

const router = require("express").Router();

router.post('/getUsersOfSystem/:userId', getUsersOfSystem);

module.exports = router;