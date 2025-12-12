const { StatusCodes } = require("http-status-codes");
function validatorMiddleware(validatorSchema) {
  return (req, res, next) => {
    try {
      const validatorResult = validatorSchema.validate(req.body);

      if (validatorResult.error) {
        res
          .status(StatusCodes.UNPROCESSABLE_ENTITY) // UNPROCESSABLE // 422
          .json({ status: false, error: "Validation failed..." });
      } else next();
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: false, error: err.message });
    }
  };
}

module.exports = validatorMiddleware;
