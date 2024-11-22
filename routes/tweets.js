var express = require("express");
var router = express.Router();
require("../models/connection"); //Importer la connexion avec la BDD
const Tweet = require("../models/tweets"); // Importer le model de la
const User = require("../models/users");

router.post("/", (req, res) => {
    const { authorId, content } = req.body;
    const user = User.findById(authorId);
    // let publishedDate = '';
    // let time = new Date(infos.arrival).getTime() - new Date(infos.departure).getTime();
    // time = new Date(time) / 1000 / 60;
    // publishedDate = `${time} minutes`;
    console.log();

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    } else {
        const newTweet = new Tweet({
            // author: {
            //     firstname: String,
            //     username: String,
            //     password: String,
            //     token: String,
            // },
            author: authorId,
            published_since: Date.now(),
            content,
        });
        newTweet.save().then((data) => {
            console.log(data);

            res.json({
                result: "Tweet has been successfully published,",
                author: authorId,
                published_since: data.published_since,
                content,
            });
        });
    }
});

router.get("/", (req, res) => {
    Tweet.findOne({ content: req.body.content })
        .populate("author")
        .then((data) => {
            if (data === null) {
                res.json({
                    result: "Tweet not found",
                });
            } else {
                res.json({
                    result: "Access to tweet has been successful",
                    tweet: data,
                });
            }
        });
});

router.put("/", (req, res) => {
    Tweet.updateOne({ _id: req.body_id }, { content: req.body.content }).then(
        () => {
            Tweet.find().then((data) => {
                res.json({
                    result: "Tweet was modified",
                    tweet: data,
                });
            });
        }
    );
});

router.delete("/", (req, res) => {
    Tweet.deleteOne(
        { content: req.body.content } 
    ).then(() => {
        Tweet.find().then((data) => {
            console.log(data); 
        });
    });
});

router.delete("/", (req, res) => {
    Tweet.deleteMany(
        { author: req.body.author } 
    ).then(() => {
        Tweet.find().then((data) => {
        });
    });
});

module.exports = router;
