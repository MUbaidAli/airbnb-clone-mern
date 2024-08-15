// const mongoose = require("mongoose");

// async function relDB() {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/rel");
//     console.log("connected");
//   } catch (err) {
//     console.log(err);
//   }
// }

// relDB();

// const userSchema = new mongoose.Schema({
//   name: String,
//   addresses: [{ location: String, city: String }],
// });

// const UserModel = mongoose.model("UserModel", userSchema);

// async function addData() {
//   try {
//     const address1 = { location: "johar town ", city: "karachi" };
//     const address2 = { location: "DHA phase 1", city: "lahore" };
//     const data = new UserModel({ name: "kamran", addresses: [] });
//     data.addresses.push(address1, address2);
//     const res = await data.save();
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// }
// addData();

//===============================

// one to many

// const userSchema = new mongoose.Schema({
//   name: String,
//   orders: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Order",
//     },
//   ],
// });

// const orderSchema = new mongoose.Schema({
//   item: String,
//   price: Number,
// });

// userSchema.post("findOneAndDelete", async (customer) => {
//   // console.log(customer);
//   if (customer.orders.length) {
//     const res = await Order.deleteMany({ _id: { $in: customer.orders } });

//     console.log(res);
//   }
// });
// // userSchema.pre("findOneAndDelete", async (customer) => {
// //   //   console.log(customer);
// //   console.log("pre");
// // });

// const Customer = mongoose.model("Customer", userSchema);
// const Order = mongoose.model("Order", orderSchema);

// async function addOrder() {
//   try {
//     const data = await Order.insertMany([
//       { item: "pizza", price: 1100 },
//       { item: "burger", price: 350 },
//       { item: "fries", price: 150 },
//     ]);

//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// // addOrder();

// async function addUser() {
//   try {
//     const data = new Customer({ name: "bubly" });

//     const orderData = await Order.find({
//       item: { $in: ["fries"] },
//     });

//     data.orders = orderData;

//     const res = await data.save();

//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// }
// // addUser();
// async function getData() {
//   try {
//     // const data = await Customer.find({});
//     const data = await Customer.find({}).populate("orders");

//     console.log(data[0]);
//   } catch (error) {
//     console.log(error);
//   }
// }

// // getData();

// async function deleteUser() {
//   try {
//     const res = await Customer.findByIdAndDelete("66b6563d60cf09301753f7bb");
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// }
// deleteUser();

// ==========================================================
// const express = require("express");
// const Joi = require("joi");
// const mongoose = require("mongoose");

// // Define the Mongoose User schema
// // This schema outlines the structure of the User model in MongoDB.
// const userSchema = new mongoose.Schema({
//   name: String, // User's name
//   email: String, // User's email
//   password: String, // User's password
// });
// // Create the User model from the schema
// // This model will be used to interact with the 'users' collection in MongoDB.
// const User = mongoose.model("User", userSchema);

// // Define the Joi schema for validation
// // This schema is used to validate the incoming request data before saving it to the database.
// const userJoiSchema = Joi.object({
//   name: Joi.string().min(3).required(), // Name must be a string with at least 3 characters
//   email: Joi.string().email().required(), // Email must be a valid email address
//   password: Joi.string().min(6).required(), // Password must be at least 6 characters long
// });

// // Middleware function for validating the request body
// // This function uses the Joi schema to validate the data.
// // If the data is invalid, it sends a 400 response with the validation error message.
// function validateUser(req, res, next) {
//   const { error } = userJoiSchema.validate(req.body);
//   if (error) {
//     return res
//       .status(400)
//       .send(`Validation Error: ${error.details[0].message}`);
//   }
//   next(); // If validation passes, move on to the next middleware or route handler
// }
// const app = express(); // Create an Express application
// app.use(express.json()); // Middleware to parse incoming JSON requests
// // Define a POST route to create a new user
// // The validateUser middleware is used to validate the request before creating the user.
// app.post("/api/users", validateUser, async (req, res) => {
//   // Create a new User instance with the validated request data
//   let user = new User(req.body);
//   // Save the user to the MongoDB database
//   user = await user.save();
//   // Send the saved user data back in the response
//   res.send(user);
// });

// // Connect to the MongoDB database
// // Replace 'mydatabase' with your actual database name.
// mongoose
//   .connect("mongodb://localhost/mydatabase")
//   .then(() =>
//     app.listen(3000, () => console.log("Server running on port 3000"))
//   ) // Start the server on port 3000
//   .catch((err) => console.error("Could not connect to MongoDB...", err)); // Handle connection errors
