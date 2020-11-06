import { hash as _hash, compare } from "bcrypt";

import { hashingSalt } from "../config/env";

const bcryptService = () => {
  const hashPassword = ({ password }) => {
    return _hash(password, Number(hashingSalt));
  };

  const comparePassword = (password, hash) => compare(password, hash);

  return {
    hashPassword,
    comparePassword,
  };
};

export default bcryptService;
