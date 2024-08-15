const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const Review = require("../models/reviews");
const { reviewValidate } = require("../middlewares/SchemaValidation");

router.post(
  "",
  reviewValidate,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { review, rating } = req.body;

    const listing = await Listing.findById(id);
    const data = new Review({ review, rating });

    listing.reviews.push(data);

    const resp = await data.save();
    const listdata = await listing.save();
    console.log(resp, listdata);
    req.flash("success", "Review Created");
    res.redirect(`/listings/${id}`);
  })
);

router.delete(
  "/:rid",
  wrapAsync(async (req, res) => {
    const { id, rid } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: rid } });
    await Review.findByIdAndDelete(id);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
