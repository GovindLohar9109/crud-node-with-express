const { StatusCodes } = require("http-status-codes");
const UserService = require("../../services/user.service.js");
const { userSerializer } = require("../../serializers/index.js");
const {
  errorMessage,
  successMessage,
} = require("../../utils/responseMessages.js");
const logger = require("../../logger/logger.js");

class UserController {
  static async getUser(req, res) {
    try {
      const result = await UserService.getUser(req.userId, req.requestId);

      const responseData = successMessage(
        true,
        "Success",
        userSerializer(result),
      );
      res.status(StatusCodes.OK).json(responseData); // 200
    } catch (err) {
      err.status = err.status || StatusCodes.INTERNAL_SERVER_ERROR; // 500
      logger.error("Controller getUser " + err.message, {
        requestId: req.requestId,
      });
      const responseData = errorMessage(false, err.message);
      res.status(err.status).json(responseData);
    }
  }
  static async addUser(req, res) {
    try {
      const result = await UserService.addUser(req.body, req.requestId);
      const responseData = {
        ...successMessage(true, "User created", null),
        accesToken: result,
      };
      res.status(StatusCodes.CREATED).json(responseData); // 201
    } catch (err) {
      err.status = err.status || StatusCodes.INTERNAL_SERVER_ERROR; // 500
      logger.error("Controller addUser " + err.message, {
        requestId: req.requestId,
      });
      const responseData = errorMessage(false, err.message);
      res.status(err.status).json(responseData);
    }
  }
  static async updateUser(req, res) {
    try {
      await UserService.updateUser(req.userId, req.body, req.requestId);
      const responseData = successMessage(true, "User updated", null);
      res.status(StatusCodes.OK).json(responseData); // 200
    } catch (err) {
      err.status = err.status || StatusCodes.INTERNAL_SERVER_ERROR; // 500
      logger.error("Controller updateUser " + err.message, {
        requestId: req.requestId,
      });
      const responseData = errorMessage(false, err.message);
      res.status(err.status).json(responseData);
    }
  }
  static async deleteUser(req, res) {
    try {
      await UserService.deleteUser(req.userId, req.requestId);
      const responseData = successMessage(true, "User deleted", null);
      res.status(StatusCodes.OK).json(responseData); // 200
    } catch (err) {
      err.status = err.status || StatusCodes.INTERNAL_SERVER_ERROR; // 500
      logger.error("Controller deleteUser " + err.message, {
        requestId: req.requestId,
      });
      const responseData = errorMessage(false, err.message);
      res.status(err.status).json(responseData);
    }
  }
}

module.exports = UserController;
