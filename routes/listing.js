const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
// const flash = require("connect-flash");
// listing

router.get(
  "/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = await Listing.findById(id);
    // console.log(data);
    res.render("editListing.ejs", { data });
  })
);

router.delete(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing Deleted Successfully");
    res.redirect("/listings");
  })
);
router.put(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const formData = req.body;

    await Listing.findByIdAndUpdate(id, formData);
    // console.log(data);
    req.flash("success", "Listing Data Updated Successfully");
    res.redirect(`/listings/${id}`);
  })
);

router.get("/new", (req, res) => {
  res.render("newListing.ejs");
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Listing.findById(id).populate("reviews");

    res.render("showListings.ejs", { data });
  } catch (error) {
    next(error);
  }
});

router.post(
  "",
  wrapAsync(async (req, res) => {
    const formData = req.body;
    if (!formData) {
      throw new ExpressError(400, "Send Valid Data");
    }

    const data = new Listing(formData);
    await data.save();
    req.flash("success", "Listing Is Created Successfully");

    // console.log(data);
    res.redirect("/listings");
  })
);

router.get("", async (req, res, next) => {
  try {
    const data = await Listing.find();

    // console.log(data);
    res.render("listing.ejs", { data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
