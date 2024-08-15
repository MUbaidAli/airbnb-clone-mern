require("dotenv").config();
const express = require("express");
const path = require("node:path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const db = require("./config/db");
const session = require("express-session");
const flash = require("connect-flash");
// const places = require("./utils/randomlistingdata");
const ExpressError = require("./utils/expressError");
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/reviews");
const signupRouter = require("./routes/signup");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
// require("toastify-js/src/toastify.css");

const app = express();

db();

// console.log(process.env);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);

// function wrapAsync(fn) {
//   return (req, res, next) => fn(req, res, next).catch(next);
// }

const sessionOptions = {
  secret: "secretKey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  // console.log(res.locals.success);
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/review", reviewRouter);
app.use("/", signupRouter);
// tooo add random data just uncomment and fo to /add route

// app.get(
//   "/add",
//   wrapAsync(async (req, res, next) => {
//     const data = await Listing.insertMany(places);
//     // const data = new Listing({ title: "any", desc: "anflkb" }); // data.save();
//     // await data.save()
//     console.log("done");
//     res.send("data added");
//   })
// );

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  const { message = "something wrong", status = 500 } = err;
  // res.status(status).send(message);
  res.status(status).render("error.ejs", { message, status });
});

app.listen(8484, () => {
  console.log("App is running on port 8484");
});
