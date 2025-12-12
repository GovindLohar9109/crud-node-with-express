const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
function generateAccessToken(userId) {
  try {
    const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });
    return token;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
function verifyAccessToken(accessToken) {
  try {
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return user;
  } catch (err) {
    throw err;
  }
}

module.exports = { generateAccessToken, verifyAccessToken };
