const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

// login

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    res.send("Welcome");
  }
);

// signup

router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const newUser = new User({ username, email });
    const added = await User.register(newUser, password);
    req.flash("success", "new User Created");
    res.redirect("/");
    // console.log(username, password, email);
  } catch (err) {
    console.log(err);
    req.flash("error", err.message);

    res.redirect("/signup");
  }

  //   res.send("added");
});

module.exports = router;
