var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
require("../models/connection");
const User = require("../models/users");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["firstname", "username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        password: hash,
        token: uid2(32),
      });
      newUser.save().then((data) => {
        res.json({
          result: "User has been successfully created",
          firstname: data.firstname,
          username: data.username,
          password: data.password,
          token: data.token,
        });
      });
    } else {
      res.json({ result: false, error: "User already exists" });
    }
  });
});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: "Connection failed", error: "Missing or empty fields" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({
        result: "Connection failed",
        error: "User not found or wrong password",
      });
    }
  });
});

router.get("/:username", (req, res) => {
  User.findOne({ username: req.params.username }).then((data) => {
    if (data) {
      res.json({
        result: "User found",
        firstname: data.firstname,
        username: `@${data.username}`,
        token: data.token,
      });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

module.exports = router;
