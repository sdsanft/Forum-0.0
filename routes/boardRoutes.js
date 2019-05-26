const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://origin:Rs4tZGFf7EPytqBd@cluster0-zopsh.mongodb.net/test?retryWrites=true";

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/threads', function(req, res) {
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
        if (err) {
            res.json(err);
            throw err;
        }
        
        var db = client.db("FullStack")
        var threads = db.collection("Threads")

        cursor = threads.find().sort({lastUpdate: -1})

        var arr = [];

        cursor.forEach(doc => {
            arr.push(doc)
        }).then(() => {
            res.json({threads: arr})
        })
    })
})

router.post('/threads', function(req, res) {
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
        if (err) {
            res.json(err);
            throw err;
        }
        
        var db = client.db("FullStack")
        var threads = db.collection("Threads")

        var newThread = req.body.thread;

        threads.insertOne(newThread, (err) => {
            if(err) {
                console.log(err)
                res.json({err})
            } else{
                res.end()
            }
        })
    })
})

router.post('/threads/:id', function(req, res) {
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
        if (err) {
            res.json(err); 
            throw err;
        }

        var db = client.db("FullStack")
        var threads = db.collection("Threads")

        threads.findOne({_id: req.params.id}, (err, data) => {
            if(err) {
                res.json(err);
                console.log(err);
            }

            var posts = data.posts;
            posts.push(req.body.post)
            var mostRecent = req.body.post.author;
            var lastUpdate = req.body.post.time;

            threads.updateOne({_id: data._id}, {$set: {posts, mostRecent, lastUpdate}}, (err) => {
                if (err) console.log(err)
                res.end()
            })
        })
    })
})

module.exports = router;