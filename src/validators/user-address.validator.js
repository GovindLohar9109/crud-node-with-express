const Joi = require("joi");

const createUserAddressValidatorSchema = Joi.object({
  address_line: Joi.string().min(3).max(200).empty().required(),
  city: Joi.string().min(1).empty().required(),
  state: Joi.string().min(1).empty().required(),
  zip: Joi.number().min(1).empty().required(),
  country: Joi.string().min(3).required(),
});
const updateUserAddressValidatorSchema = Joi.object({
  address_line: Joi.string().min(3).max(200).empty().required(),
  city: Joi.string().min(1).empty().required(),
  state: Joi.string().min(1).empty().required(),
  zip: Joi.number().min(1).empty().required(),
  country: Joi.string().min(3).required(),
});

module.exports = {
  createUserAddressValidatorSchema,
  updateUserAddressValidatorSchema,
};
