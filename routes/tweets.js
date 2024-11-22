var express = require("express");
var router = express.Router();
require("../models/connection"); //Importer la connexion avec la BDD
const Tweet = require("../models/tweets"); // Importer le model de la
const User = require("../models/users");



// Route pour poster un tweet --------------------------------------------------------------------------------------------------------------
router.post("/postTweet", (req, res) => {
    console.log(req.body.token);
    User.findOne({token : req.body.token})
    .then(data => {
      if (data === null) {
        return res.status(404).json({ error: "User not found" });
      }
      const newTweet = new Tweet({
        author: data._id,
        published_since: new Date(),
        content: req.body.content,
    });
    newTweet.save().then((data) => {
        res.json({
            result: "Tweet has been successfully published,",
            data: data,
        });
    });
    });       
});

// Route pour récupérer info d'un tweet par content ou par id ?----------------------------------------------------------------------------------------
router.get("/allTweets", (req, res) => {
    Tweet.find()
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


// Route pour update un tweet --------------------------------------------------------------------------------------------------------------------
router.put("/updateById", (req, res) => {
    Tweet.updateOne(
        { _id: req.body._id }, 
        { content: req.body.content }
    ).then(() => {
            Tweet.find().then(data => {
                res.json({
                    result: "Tweet was modified",
                    tweet: data,
                });
            });
        }
    );
});



// Route pour supprimer un tweet --------------------------------------------------------------------------------------------------------------------
router.delete("/deleteById", (req, res) => {
    Tweet.deleteOne(
        { _id: req.body._id } 
    ).then(() => {
        Tweet.find().then((data) => { 
            res.json({result: "Tweet has been deleted"})
        });
    });
});



module.exports = router;
