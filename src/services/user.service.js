const { User } = require("../models");
const { generateAccessToken } = require("../helpers/jwt.helper.js");
const { StatusCodes } = require("http-status-codes");
const RedisHelper = require("../helpers/redis.helper.js");

class UserService {
  static async getUser(userId) {
    const cached = await RedisHelper.getter(String(userId));
    if (cached) {
      return cached;
    }

    try {
      const result = await User.findOne({
        where: { id: userId, deleted_at: null },
      });
      if (result) RedisHelper.setter(String(userId), result.dataValues);

      return result?.dataValues;
    } catch (err) {
      throw err;
    }
  }

  static async addUser(userData) {
    const { email } = userData;
    try {
      let result = await User.findOne({ where: { email: email } });

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
  static async updateUser(userId, userData) {
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
  }
  static async deleteUser(userId) {
    try {
      await User.update({ deleted_at: new Date() }, { where: { id: userId } });
      RedisHelper.clear(String(userId));
      return;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
