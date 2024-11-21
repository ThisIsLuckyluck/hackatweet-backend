const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstname: String,
  username: String,
  password: String,
  token: String,
});

const user = mongoose.model("users", usersSchema);

module.exports = user;
