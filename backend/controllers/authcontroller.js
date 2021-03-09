const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      users: users,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("stories");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ error: "User already registered." });
    user = await new User(req.body);

    await user.save();
    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.EXP_DATE,
    });
    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: "Please provide correct email and password",
    });
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    const correct = await user.comparePassword(password, user.password);
    if (!user || !correct) {
      return res.status(400).json({
        error: "Please provide correct email and password",
      });
    }
    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.EXP_DATE,
    });
    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
