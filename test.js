require("dotenv").config();
const express = require("express");
const path = require("node:path");
const methodOverride = require("method-override");
const db = require("./config/db");
const Listing = require("./models/listing");
const places = require("./utils/randomlistingdata");
const app = express();

db();

// console.log(process.env);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

function asyncWrap(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

app.get(
  "/listings/:id/edit",
  asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    const data = await Listing.findById(id);
    // console.log(data);
    res.render("editListing.ejs", { data });
  })
);

app.delete(
  "/listings/:id",
  asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);
// asyncWrap Function
function asyncWrap(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

// using put request with asyncWrap
app.put(
  "/listings/:id",
  asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    const formData = req.body;
    await Listing.findByIdAndUpdate(id, formData);
    res.redirect(`/listings/${id}`);
  })
);

// error handler
app.use((err, req, res, next) => {
  const { message = "something wrong", status = 500 } = err;
  res.status(status).send(message);
});

app.get("/listings/new", (req, res) => {
  res.render("newListing.ejs");
});

app.get("/listings/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Listing.findById(id);

    res.render("showListings.ejs", { data });
  } catch (error) {
    next(error);
  }
});

app.post(
  "/listings",
  asyncWrap(async (req, res) => {
    const formData = req.body;

    const data = new Listing(formData);
    await data.save();

    // console.log(data);
    res.redirect("/listings");
  })
);

app.get("/listings", async (req, res, next) => {
  try {
    const data = await Listing.find();

    // console.log(data);
    res.render("listing.ejs", { data });
  } catch (error) {
    next(error);
  }
});

app.get(
  "/add",
  asyncWrap(async (req, res, next) => {
    const data = await Listing.insertMany(places);
    // const data = new Listing({ title: "any", desc: "anflkb" }); // data.save();
    // await data.save()
    console.log("done");
    res.send("data added");
  })
);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.use((err, req, res, next) => {
  const { message = "something wrong", status = 500 } = err;
  res.status(status).send(message);
});

app.listen(8484, () => {
  console.log("App is running on port 8484");
});

//////////////////////////////////////////////////////////////////////////////////////

function asyncWrap(fn) {
  return (req, res, next) => {
    // Call the provided async function (fn) with req, res, and next as arguments.
    // If the async function throws an error or returns a rejected promise,
    // the .catch(next) will pass the error to the next middleware (error handler).
    fn(req, res, next).catch(next);
  };
}
// Example usage of asyncWrap with a PUT request to update a listing by ID
app.put(
  "/listings/:id",
  asyncWrap(async (req, res, next) => {
    const { id } = req.params; // Extracting the ID from request parameters
    const formData = req.body; // Extracting the form data from request body
    await Listing.findByIdAndUpdate(id, formData); // Updating the listing in the database
    res.redirect(`/listings/${id}`); // Redirecting to the updated listing's page
  })
);

// Global error handling middleware
app.use((err, req, res, next) => {
  const { message = "Something went wrong", status = 500 } = err; // Default error message and status
  res.status(status).send(message); // Sending the error response with status and message
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
