const joi = require("joi");

const reviewsJoiSchema = joi.object({
  review: joi.string().required(),
  rating: joi.number().min(1).max(5),
});

module.exports = reviewsJoiSchema;
