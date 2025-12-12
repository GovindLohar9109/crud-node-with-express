const { StatusCodes } = require("http-status-codes");
const { errorMessage } = require("../utils/responseMessages.js");
const { verifyAccessToken } = require("../helpers/jwt.helper.js");

function authMiddleware(req, res, next) {
  try {
    const accessToken = req.headers?.authorization?.split(" ")[1];

    if (!accessToken) {
      res
        .status(StatusCodes.UNAUTHORIZED) //401
        .json(errorMessage(false, "Token not found"));
    }

    const decoded = verifyAccessToken(accessToken);

    req.userId = decoded.userId;
    next();
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorMessage(false, "Invalid token")); // 400
  }
}

module.exports = authMiddleware;
