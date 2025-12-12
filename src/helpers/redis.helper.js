const redisClient = require("../redis/redisClient.js");
class RedisHelper {
  static async getter(key) {
    const cached = redisClient.get(key);
    if (cached && Object.keys(cached)?.length)
      return await JSON.parse(redisClient.get(key));
    return null;
  }
  static async setter(key, value) {
    await redisClient.set(key, JSON.stringify(value));
  }
  static async clear(key) {
    await redisClient.del(key);
  }
}

module.exports = RedisHelper;
