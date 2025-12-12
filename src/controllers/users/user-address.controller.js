const UserAddressService = require("../../services/user-address.service.js");
const { StatusCodes } = require("http-status-codes");
const {
  successMessage,
  errorMessage,
} = require("../../utils/responseMessages.js");
const { userAddressSerializer } = require("../../serializers/index.js");
class UserAddressController {
  static async getUserAddresses(req, res) {
    try {
      const result = await UserAddressService.getUserAddresses(
        req.userId,
        req.query,
      );

      const responseData = successMessage(
        true,
        "Success",
        userAddressSerializer(result),
      );
      res.status(StatusCodes.OK).json(responseData); // 200
    } catch (err) {
      err.status = err.status || StatusCodes.INTERNAL_SERVER_ERROR; // 500
      const responseData = errorMessage(false, err.message);
      res.status(err.status).json(responseData);
    }
  }
  static async getUserAddress(req, res) {
    try {
      const result = await UserAddressService.getUserAddress(
        req.userId,
        req.params.addressId,
      );

      const responseData = successMessage(
        true,
        "Success",
        userAddressSerializer(result),
      );
      res.status(StatusCodes.OK).json(responseData); // 200
    } catch (err) {
      err.status = err.status || StatusCodes.INTERNAL_SERVER_ERROR; // 500
      const responseData = errorMessage(false, err.message);
      res.status(err.status).json(responseData);
    }
  }

  static async addUserAddress(req, res) {
    try {
      await UserAddressService.addUserAddress(req.userId, req.body);

      const responseData = successMessage(true, "User address created", null);
      res.status(StatusCodes.CREATED).json(responseData); // 201
    } catch (err) {
      err.status = err.status || StatusCodes.INTERNAL_SERVER_ERROR; // 500
      const responseData = errorMessage(false, err.message);
      res.status(err.status).json(responseData);
    }
  }
  static async updateUserAddress(req, res) {
    try {
      await UserAddressService.updateUserAddress(
        req.userId,
        req.params.addressId,
        req.body,
      );

      const responseData = successMessage(true, "User address updated", null);
      res.status(StatusCodes.OK).json(responseData); // 200
    } catch (err) {
      err.status = err.status || StatusCodes.INTERNAL_SERVER_ERROR; // 500
      const responseData = errorMessage(false, err.message);
      res.status(err.status).json(responseData);
    }
  }
  static async deleteUserAddress(req, res) {
    try {
      await UserAddressService.deleteUserAddress(
        req.userId,
        req.params.addressId,
      );

      const responseData = successMessage(true, "User address deleted", null);
      res.status(StatusCodes.OK).json(responseData); // 200
    } catch (err) {
      err.status = err.status || StatusCodes.INTERNAL_SERVER_ERROR; // 500
      const responseData = errorMessage(false, err.message);
      res.status(err.status).json(responseData);
    }
  }
}

module.exports = UserAddressController;
