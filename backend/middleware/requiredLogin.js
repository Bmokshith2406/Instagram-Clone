const jwt = require("jsonwebtoken");
const { JWT_SecKey } = require("../keys");
const mongoose = require("mongoose");
const USER = mongoose.model("USER");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must log in 1" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SecKey, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must log in 2" });
    }
    const { _ID } = payload;
    console.log(_ID);
    USER.findById(_ID).then((userData) => {
      req.user = userData;
      next();
    });
  });
};
