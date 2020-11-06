import { BAD_REQUEST, OK } from "http-status";

import authService from "../services/auth.service";
import bcryptService from "../services/bcrypt.service";
import UserModel from "../model/user";
import sendResponse from "../helpers/response";

export async function signup(req, res) {
  //Checking if username already exist
  const usernameExist = await UserModel.findOne({
    username: req.body.username,
  });
  if (usernameExist)
    return res.json(
      sendResponse(BAD_REQUEST, "Username already exist")
    );

  const user = new UserModel({
    ...req.body,
  });

  try {
    const createdUser = await user.save();
    res.json(sendResponse(OK, "User registered", createdUser));
  } catch (err) {
    res.json({ status: 400, message: "User not register", payload: null });
  }
}

export async function login(req, res) {
  //Checking username existence
  const user = await UserModel.findOne({ username: req.body.username });
  if (!user)
    return res.json(
      sendResponse(BAD_REQUEST, "Username does not exist")
    );

  //Check password validity
  const validPassword = await bcryptService().comparePassword(
    req.body.password,
    user.password
  );
  if (!validPassword)
    return res.json(sendResponse(BAD_REQUEST, "Invalid Password"));

  //Create token when user logs in
  const token = authService().issue(user.toJSON());
  return res.json(
    sendResponse(OK, "User Logged in", null, null, token)
  );
}
