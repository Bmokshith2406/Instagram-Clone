const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { JWT_SecKey } = require("../keys.js");
const requireLogin = require("../middleware/requiredLogin.js");

router.get("/", (req, res) => {
  res.send("Hello Dear!");
});

router.post("/signup", (req, res) => {
  const { name, userName, email, password } = req.body;

  if (!name || !email || !userName || !password) {
    return res.status(422).json({ error: "Please Fill all the Fields" });
  }

  USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then(
    (savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User Already Exists with same Email or Username" });
      }
      bcrypt.hash(password, 14).then((hashedPassword) => {
        const user = new USER({
          name,
          email,
          userName,
          password: hashedPassword,
        });
        user
          .save()
          .then((user) => {
            res.json({
              message: "Registered Successfully",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  );
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please Fill Email and Password" });
  }
  USER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res
        .status(422)
        .json({ error: "User Not Registered with Given Email." });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((match) => {
        if (match) {
          //return res.status(200).json({ message: "Signed in Successfully" });
          const token = jwt.sign({ _ID: savedUser.id }, JWT_SecKey);
          const { _id, name, email, userName } = savedUser;
          res.json({ token, user: { _id, name, email, userName } });
          console.log({ token, user: { _id, name, email, userName } });
        } else {
          return res.status(422).json({
            error: "Invalid Password",
          });
        }
      })
      .catch((err) => console.log(err));
  });
});

module.exports = router;
