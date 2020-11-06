import { sign, verify as _verify } from "jsonwebtoken";

import config from "../config/env";

const authService = () => {
  const issue = (payload) =>
    sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpirationInterval,
    });

  const verify = (token, cb) => _verify(token, config.jwtSecret, {}, cb);

  return {
    issue,
    verify,
  };
};

export default authService;
