const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://origin:Rs4tZGFf7EPytqBd@cluster0-zopsh.mongodb.net/test?retryWrites=true";

const port = 3600

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('dist'))

const client = new MongoClient(url, { useNewUrlParser: true });

app.listen(port, function(err) {
    if(err) {
        throw err;
    }
    console.log("Listening at local port: " + port)
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'))
})

app.post('/login', function(req, res) {
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
		if(err) {res.json(err); throw err;}
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

app.post('/createUser', function(req, res) {
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