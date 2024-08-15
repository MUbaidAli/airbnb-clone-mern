const mongoose = require("mongoose");
const Review = require("./reviews");
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRbcrj53mGyk-u4JwrIb6z1RBAeCpxR78gfQ&s",
    set: (val) =>
      !val
        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIZk0VSxmdvLsbG947ajmya7s_pB6EIWTqnnxF0ZJq5uUhjx3nMYIb9YSmZm79q2wnEKk&usqp=CAU"
        : val,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  console.log("postttt");
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
