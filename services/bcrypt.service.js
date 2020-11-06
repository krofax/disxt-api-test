const bcrypt = require("bcrypt");

const config = require("../config/env");

const bcryptService = () => {
  const hashPassword = ({ password }) => {
    return bcrypt.hash(password, Number(config.hashingSalt));
  };

  const comparePassword = (password, hash) => bcrypt.compare(password, hash);

  return {
    hashPassword,
    comparePassword,
  };
};

module.exports = bcryptService;
