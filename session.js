const express = require("express");
const app = express();
const session = require("express-session");
var flash = require("connect-flash");

app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.get("/test", (req, res) => {
  //   res.cookie("testcookie", "cook it");
  res.send("session");
});

app.get("/ses", (req, res) => {
  res.send("ses");
});

app.get("/flash", function (req, res) {
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash("info", "Flash is back!");
  res.redirect("/go");
});

app.get("/go", function (req, res) {
  // Get an array of flash messages by passing the key to req.flash()
  console.log(req.flash("info"));
  res.send(req.flash("info"));
});

app.listen(8484, () => {
  console.log("App is running on port 8484");
});
