const { UserAddress } = require("../models");
const { User } = require("../models");
const RedisHelper = require("../helpers/redis.helper.js");

class UserAddressService {
  static async getUserAddresses(userId, query) {
    const { limit, page } = query;

    const skip = page * limit;
    try {
      const result = await UserAddress.findAll({
        where: {
          user_id: userId,
          deleted_at: null,
        },
        limit: limit,
        offset: skip,
        include: [
          {
            model: User,
            as: "users",
            required: true,
          },
        ],
      });
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  }
  static async getUserAddress(userId, addressId) {
    const cached = await RedisHelper.getter(String(userId + "$" + addressId));
    if (cached) {
      return cached;
    }

    try {
      const result = await UserAddress.findOne({
        where: { user_id: userId, id: addressId, deleted_at: null },
      });

      if (result?.dataValues)
        RedisHelper.setter(String(userId + "$" + addressId), result.dataValues);

      return result;
    } catch (err) {
      throw err;
    }
  }

  static async addUserAddress(userId, user) {
    try {
      await UserAddress.create({ user_id: userId, ...user });

      return;
    } catch (err) {
      throw err;
    }
  }
  static async updateUserAddress(userId, addressId, userData) {
    try {
      let currDate = new Date();
      await UserAddress.update(
        { updated_at: currDate, ...userData },
        { where: { user_id: userId, id: addressId } },
      );

      RedisHelper.clear(String(userId + "$" + addressId));
      return;
    } catch (err) {
      throw err;
    }
  }
  static async deleteUserAddress(userId, addressId) {
    try {
      let currDate = new Date();
      await UserAddress.update(
        { deleted_at: currDate },
        { where: { user_id: userId, id: addressId } },
      );

      RedisHelper.clear(String(userId + "$" + addressId));
      return;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserAddressService;
