import { UNAUTHORIZED } from "http-status";

import sendResponse from "../helpers/response";
import JWTService from "../services/auth.service";

export default (req, res, next) => {
  let tokenToVerify;

  if (req.header("Authorization")) {
    const parts = req.header("Authorization").split(" ");

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res.json(
          sendResponse(
            UNAUTHORIZED,
            "Format for Authorization: Bearer [token]"
          )
        );
      }
    } else {
      return res.json(
        sendResponse(
          UNAUTHORIZED,
          "Format for Authorization: Bearer [token]"
        )
      );
    }
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return res.json(
      sendResponse(UNAUTHORIZED, "No Authorization was found")
    );
  }

  return JWTService().verify(tokenToVerify, (err, thisToken) => {
    if (err)
      return res.json(
        sendResponse(
          UNAUTHORIZED,
          "Format for Authorization: Bearer [token]"
        )
      );
    req.token = thisToken;
    return next();
  });
};
