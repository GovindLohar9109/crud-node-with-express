const express = require("express");
const UserController = require("../controllers/users/user.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const validatorMiddleware = require("../middlewares/validator.middleware.js");

const {
  createUserValidatorSchema,
  updateUserValidatorSchema,
} = require("../validators/user.validator.js");

const router = express.Router();

router.get(
  "/users",
  authMiddleware,

  UserController.getUser,
);
router.post(
  "/users",
  validatorMiddleware(createUserValidatorSchema),
  UserController.addUser,
);
router.put(
  "/users",
  authMiddleware,
  validatorMiddleware(updateUserValidatorSchema),
  UserController.updateUser,
);
router.delete("/users", authMiddleware, UserController.deleteUser);

module.exports = router;
