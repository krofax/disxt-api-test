const { Joi } = require("celebrate");

module.exports = {
  signup: {
    body: {
      username: Joi.string().max(200).required(),
      name: Joi.string().max(200).required(),
      lastname: Joi.string().max(200).required(),
      age: Joi.number().required(),
      password: Joi.string().min(6).max(255).required(),
      role: Joi.string().required
    },
  },

  login: {
    body: {
      username: Joi.string().max(200).required(),
      password: Joi.string().min(6).max(255).required(),
    },
  },
};
