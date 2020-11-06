const httpStatus = require("http-status");

const authService = require("../services/auth.service");
const bcryptService = require("../services/bcrypt.service");
const User = require("../model/user");
const sendResponse = require("../helpers/response");

exports.signup = async (req, res) => {
  //Checking if username already exist
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist)
    return res.json(
      sendResponse(httpStatus.BAD_REQUEST, "Username already exist")
    );

  const user = new User({
    ...req.body,
  });

  try {
    const createdUser = await user.save();
    res.json(sendResponse(httpStatus.OK, "User registered", createdUser));
  } catch (err) {
    res.json({ status: 400, message: "User not register", payload: null });
  }
};

exports.login = async (req, res) => {
  //Checking username existence
  const user = await User.findOne({ username: req.body.username });
  if (!user)
    return res.json(
      sendResponse(httpStatus.BAD_REQUEST, "Username does not exist")
    );

  //Check password validity
  const validPassword = await bcryptService().comparePassword(
    req.body.password,
    user.password
  );
  if (!validPassword)
    return res.json(sendResponse(httpStatus.BAD_REQUEST, "Invalid Password"));

  //Create token when user logs in
  const token = authService().issue(user.toJSON());
  return res.json(
    sendResponse(httpStatus.OK, "User Logged in", null, null, token)
  );
};
