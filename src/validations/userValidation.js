const Joi = require("joi");

const userSignUpValidation = Joi.object({
  firstName: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(18).max(60).optional(),
  password: Joi.string().min(6).required(),
  skills: Joi.array().items(Joi.string()).max(10),
  gender: Joi.string().valid("male", "female", "others"),
});

const userUpdateValidation = Joi.object({
  age: Joi.number().min(18).max(60).optional(),
  gender: Joi.string().valid("male", "female", "others").optional(),
  skills: Joi.array().items(Joi.string()).max(10).optional(),
});

module.exports = { userSignUpValidation, userUpdateValidation };
