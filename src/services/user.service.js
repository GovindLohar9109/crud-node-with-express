const { User } = require("../models");
const { generateAccessToken } = require("../helpers/jwt.helper.js");
const { StatusCodes } = require("http-status-codes");
const RedisHelper = require("../helpers/redis.helper.js");
const logger = require("../logger/logger.js");

class UserService {
  static async getUser(userId, requestId) {
    const cached = await RedisHelper.getter(String(userId));
    if (cached) {
      return cached;
    }

    try {
      const result = await User.findOne({
        where: { id: userId, deleted_at: null },
      });
      logger.info("Service getUser", { requestId });
      if (result) RedisHelper.setter(String(userId), result.dataValues);

      return result?.dataValues;
    } catch (err) {
      throw err;
    }
  }

  static async addUser(userData, requestId) {
    const { email } = userData;
    try {
      let result = await User.findOne({ where: { email: email } });
      logger.info("Service addUser", { requestId });
      if (!result) {
        result = await User.create(userData);

        const accessToken = generateAccessToken(result.dataValues.id);
        return accessToken;
      } else {
        let error = new Error("User alredy exist");
        error.status = StatusCodes.CONFLICT; // 409
        throw error;
      }
    } catch (err) {
      throw err;
    }
  }
  static async updateUser(userId, userData, requestId) {
    try {
      await User.update(
        { updated_at: new Date(), ...userData },
        { where: { id: userId } },
      );
      RedisHelper.clear(String(userId));
      return;
    } catch (err) {
      throw err;
    }
    logger.info("Service updateUser", { requestId });
  }
  static async deleteUser(userId, requestId) {
    try {
      await User.update({ deleted_at: new Date() }, { where: { id: userId } });
      RedisHelper.clear(String(userId));
      logger.info("Service deleteUser", { requestId });
      return;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
