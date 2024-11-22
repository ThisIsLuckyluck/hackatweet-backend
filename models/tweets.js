const mongoose = require("mongoose");

const tweetsSchema = new mongoose.Schema({
  author: {type:mongoose.Schema.Types.ObjectId, ref: "users"},
  published_since: Date,
  content: String,
});

const Tweet = mongoose.model("tweets", tweetsSchema);

module.exports = Tweet;
