const { createClient } = require("redis");
require("dotenv").config();
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => console.log("Redis Failed ", err));

redisClient.connect();

module.exports = redisClient;
