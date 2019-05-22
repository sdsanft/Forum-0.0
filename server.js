const express = require('express')
const path = require('path')

const port = 3600

const app = express()

app.use(express.static('dist'))

app.listen(port, function(err) {
    if(err) {
        throw err;
    }
    console.log("Listening at local port: " + port)
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'))
})