const jwt = require("jsonwebtoken");

const config = require("../config/env");

const authService = () => {
  const issue = (payload) =>
    jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpirationInterval,
    });

  const verify = (token, cb) => jwt.verify(token, config.jwtSecret, {}, cb);

  return {
    issue,
    verify,
  };
};

module.exports = authService;
