const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

const JWT_SECRET =
  "afjafjai#jfafafja$asjwqijr!@gdzmxcnzfgfuwqhfegcvnmclvlkfgijgvnhnb";

mongoose.connect("mongodb://localhost/jwtauth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const User = require("./model/user");

app.post("/api/change-password", async (req, res) => {
  try {
    const { token, newpassword } = req.body;
    const user = jwt.verify(token, JWT_SECRET);
    const _id = user.id;

    const password = await bcrypt.hash(newpassword, 10);
    console.log(user);

    await User.updateOne(
      { _id },
      {
        $set: { password },
      }
    );
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err.message);
    res.json({ status: "error", error: err });
    throw err;
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Username/Password is wrong" });
  }

  if (await bcrypt.compare(password, user.password)) {
    // username password combination available
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET
    );

    return res.json({ status: "ok", data: token });
  }
  return res.json({
    status: "error",
    error: "Username/Password is wrong",
  });
});

app.post("/api/signup", async (req, res) => {
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
