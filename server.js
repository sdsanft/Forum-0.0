const express = require('express')
const ejs = require('ejs')
const path = require('path')

const port = 3600

const app = express()

app.use('/scripts', express.static('scripts'))
app.use(express.static('dist'))

app.listen(port, function() {
    console.log("Listening at local port: " + port)
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'))
})