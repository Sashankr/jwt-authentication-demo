const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

mongoose.connect("mongodb://localhost/jwtauth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const User = require("./model/user");

app.post("/", async (req, res) => {
  try {
    const { username, password: plainTextPassword } = await req.body;
    const password = await bcrypt.hash(plainTextPassword, 10);

    const response = await User.create({
      username,
      password,
    });
    res.json({ status: "ok" });

    console.log("user created successfully", response);
  } catch (error) {
    if (error.code === 11000) {
      res.statusCode = 405;
      return res.json({ status: "error", error: "Username already exists" });
    }
    throw error;
  }
});

app.listen(5000, () => {
  console.log("Server running");
});
