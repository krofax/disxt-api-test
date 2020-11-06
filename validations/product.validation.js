import { Joi } from "celebrate";

export const product = {
  body: {
    name: Joi.string().max(200).required(),
    price: Joi.number().required(),
    description: Joi.string().max(1500).required()
  },
};
