import { Joi } from "celebrate";

export const signup = {
  body: {
    username: Joi.string().min(3).max(200).required(),
    name: Joi.string().min(3).max(200).required(),
    lastname: Joi.string().min(3).max(200).required(),
    age: Joi.number().required(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().required,
  },
};
export const login = {
  body: {
    username: Joi.string().max(200).required(),
    password: Joi.string().min(6).max(255).required(),
  },
};
