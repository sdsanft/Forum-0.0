const express = require('express')
const ejs = require('ejs')

const port = 3600

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('scripts'))

app.listen(port, function() {
    console.log("Listening at local port: " + port)
})

app.get('/', function(req, res) {
    res.render('main.ejs', {port})
})

app.get('/canvas', function(req, res) {
    res.render('canvas.ejs', {port})
})