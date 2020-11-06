const { Router } = require("express");

const User = require("../controller/UserController");
const router = Router();

router.route("/signup").post(User.signup);
router.route("/login").post(User.login);

module.exports = router;
