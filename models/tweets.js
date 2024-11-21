const mongoose = require("mongoose");

const tweetsSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  published_since: Date,
  content: String,
  isLiked: Boolean,
  Like_number: number,
});

const tweet = mongoose.model("tweets", tweetsSchema);

module.exports = tweet;
