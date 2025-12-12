const express = require("express");
const UserAddressController = require("../controllers/users/user-address.controller.js");

const validatorMiddleware = require("../middlewares/validator.middleware.js");

const {
  createUserAddressValidatorSchema,
  updateUserAddressValidatorSchema,
} = require("../validators/user-address.validator.js");

const router = express.Router();

router.get(
  "/users/addresses",

  UserAddressController.getUserAddresses,
);
router.get("/users/addresses/:addressId", UserAddressController.getUserAddress);

router.post(
  "/users/addresses",

  validatorMiddleware(createUserAddressValidatorSchema),
  UserAddressController.addUserAddress,
);
router.put(
  "/users/addresses/:addressId",
  validatorMiddleware(updateUserAddressValidatorSchema),
  UserAddressController.updateUserAddress,
);

router.delete(
  "/users/addresses/:addressId",
  UserAddressController.deleteUserAddress,
);

module.exports = router;
