const { SignUp, SignIn } = require("../controllers/authController")

const router = require("express").Router();

router.post('/signup', SignUp);
router.post('/login', SignIn)

module.exports = router;