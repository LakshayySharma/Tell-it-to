const express = require("express");
const cors = require("cors");
const storyRoutes = require("./routes/storyRoutes");
const connection = require("./db");
const { urlencoded } = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json(urlencoded({ extended: true })));
app.use(cors());

connection();

app.use("/api/stories", storyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen("5000", (req, res) => {
  console.log(`Server listening at port 5000`);
});
