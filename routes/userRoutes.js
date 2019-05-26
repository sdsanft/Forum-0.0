const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://origin:Rs4tZGFf7EPytqBd@cluster0-zopsh.mongodb.net/test?retryWrites=true";

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/login', function(req, res) {
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
		if(err) {
            res.json(err);
            throw err;
        }
        
        var db = client.db("FullStack")
        var users = db.collection("Users")
		users.findOne({_id: req.body.user}, function(err, result) {
			if (err) throw err;

			if(result == null) {
				res.json({error: "User not found"})
			} else {
				if (req.body.pw == result.password) {
                    res.json(result)
                } else{
                    res.json({error: "Incorrect Password"})
                }
			}
		})
	})
})

router.post('/createUser', function(req, res) {
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
        if (err) {res.json(err); throw err;}
        var db = client.db("FullStack")
        var users = db.collection("Users")
        users.findOne({_id: req.body.user}, function(err, result) {
            if(result) {
                res.json({error: "User already exists"})
            } else {
                var user = {_id: req.body.user, password: req.body.pw}
                users.insertOne(user, function() {
                    res.json(user)
                })
            }
        })
    })
})

module.exports = router;