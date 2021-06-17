const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    await mongoose.connect(
      process.env.LOCALSERVER,
      {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
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
