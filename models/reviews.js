const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  review: String,
  rating: Number,
  date: { type: Date, default: Date.now() },
});

const Review = mongoose.model("Review", reviewsSchema);

module.exports = Review;
