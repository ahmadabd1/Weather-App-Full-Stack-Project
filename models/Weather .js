const mongoose = require('mongoose')
const Schema = mongoose.Schema

const weatherSchema = new Schema({
    id:Number,
    name: String,
    tempe: Number,
    condition: String,
    conditionPic:String,
    date:Date
})

const Weather = mongoose.model("weather", weatherSchema)
module.exports = Weather