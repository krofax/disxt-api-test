import { Router } from "express";
import { celebrate as validate } from "celebrate";

import { signup, login } from '../validations/user.validation';
import { signup as _signup, login as _login } from "../controller/UserController";
const router = Router();

router
  .route("/signup")
  .post(
    // validate(signup, { abortEarly: false }),
    _signup
  );
router
  .route("/login")
  .post(
    // validate(login, { abortEarly: false }),
    _login);


export default router;
