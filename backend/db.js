const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGOURI,
      {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
      },
      () => {
        console.log(`connected to Mongo database`);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = connection;
