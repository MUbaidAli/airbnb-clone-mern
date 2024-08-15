const reviewsJoiSchema = require("../utils/validation");
const ExpressError = require("../utils/expressError");

function reviewValidate(req, res, next) {
  const { error } = reviewsJoiSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.message);
  }
  next();
}

module.exports = { reviewValidate };
