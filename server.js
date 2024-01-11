// Server setup
const express = require('express')
const app = express()
const api = require('./routes/weatherApi')
var bodyParser = require('body-parser')
const path =require('path')

const mongoose = require('mongoose')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Mongoose setup
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/weatherDB", {
  useNewUrlParser: true,
}).catch((err)=> console.log(err))


app.use(express.static(path.join(__dirname,'dist')))
app.use(express.static(path.join(__dirname,'node_modules')))
app.use('/', api)

const PORT = 4200
app.listen(process.env.PORT || PORT, function () {
    console.log(`Running on port ${PORT}`)
})