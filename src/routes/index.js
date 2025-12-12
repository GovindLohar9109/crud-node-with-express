const express = require("express");
const userRoute = require("./user.router.js");
const userAddressRoute = require("./user-address.route.js");
const redisClient = require("../redis/redisClient.js");
const { StatusCodes } = require("http-status-codes");
const sequelize = require("../models/index.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.use("/", userRoute);
router.use("/", authMiddleware, userAddressRoute);

// health api
router.get("/api/health", async (_, res) => {
  try {
    const serverTime = new Date().toISOString(); // will return server time
    const redisPing = await redisClient.ping(); //check if redis is working or not
    const [dbResult] = await sequelize.query("SELECT NOW() as now"); // check if db i reachable
    const dbTime = dbResult[0].now;
    res.status(StatusCodes.OK).json({
      status: true,
      message: "Everything is working",
      serverTime,
      redisPing,
      dbTime,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

module.exports = router;
