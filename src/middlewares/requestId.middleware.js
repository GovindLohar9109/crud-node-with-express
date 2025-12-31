const { v4: uuidv4 } = require("uuid");

function requestIdMiddleware(req, res, next) {
  try {
    req.requestId = uuidv4();
    next();
  } catch (err) {
    res.send(err);
  }
}

module.exports = requestIdMiddleware;
