const express = require("express");
const authController = require("../controllers/authcontroller");
const route = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

require("dotenv").config();

route.get("/", authController.getAllUsers);
route.get("/:id", authController.getOneUser);
route.post("/signup", authController.signUp);
route.post("/login", authController.login);

module.exports = route;
