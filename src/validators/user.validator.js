const Joi = require("joi");

const createUserValidatorSchema = Joi.object({
  name: Joi.string().min(3).max(50).empty().required(),
  email: Joi.string().email().required(),
});
const updateUserValidatorSchema = Joi.object({
  name: Joi.string().min(3).max(10).empty().required(),
});

module.exports = { createUserValidatorSchema, updateUserValidatorSchema };
