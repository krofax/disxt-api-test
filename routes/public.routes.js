const { Router } = require("express");
const { celebrate: validate } = require("celebrate");

const validation = require('../validations/user.validation')
const User = require("../controller/UserController");
const router = Router();

router
  .route("/signup")
  .post(
    validate(validation.signup, { abortEarly: false }),
    User.signup
  );
router
  .route("/login")
  .post(validate(validation.login, { abortEarly: false }), User.login);


module.exports = router;
