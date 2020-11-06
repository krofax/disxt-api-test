const httpStatus = require("http-status");

const sendResponse = require("../helpers/response").default;

module.exports = (req, res, next) => {
  const { role } = req.token;

  if (role !== "admin") {
    return res.json(
      sendResponse(
        httpStatus.UNAUTHORIZED,
        "You need to be an admin to perform this operation.",
        null,
        "Invalid role"
      )
    );
  }

  return next();
};
