const express = require("express");
const route = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/authMiddleware");
require("dotenv").config();

route.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("stories");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = route;
