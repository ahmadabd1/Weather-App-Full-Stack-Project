const express = require('express')
const router = express.Router()

const Weather = require('../models/Weather ')
const apiManger = require('../models/apimanger')

const apiMangweather = new apiManger()

router.get('/weather/my/:lat/:lon',async function(req,res){
    const lat = req.params.lat
    const lon = req.params.lon
    const weatherData =await apiMangweather.fetMyWeatherLocation(lat,lon)
    const filterData = apiMangweather.filterWeatherData(weatherData)
    res.send(filterData)
})

router.get('/weathers', async function (req, res) {
    const Db =  await Weather.find({})
    res.send(Db)     
})

router.get('/weathers/:cityName', async function (req, res) {
    try{
        const cityName = req.params.cityName
        const data = await apiMangweather.getTheData(cityName)
        const filterData = apiMangweather.filterWeatherData(data)
        apiMangweather.weatherDataList.push(filterData)
        res.send(filterData)
    } catch(error){
        console.error("The city is not exits!")
    }
})
//EX 1 :
router.post('/weathers/:id', function (req, res) {
    const weatherId = req.params.id
    const newData = new Weather(apiMangweather.weatherDataList.find(weatherID => weatherID.id === (parseInt(weatherId))))
    newData.save().then(() => res.send(newData))
})

//EX 2 :
router.post('/weathers', function (req, res) {
    const name = req.body.name
    const tempe = req.body.tempe
    const conditionPic = req.body.conditionPic
    const condition = req.body.condition

    const newData = new Weather({ name: name, tempe: tempe, conditionPic: conditionPic, condition: condition })
    newData.save()
    res.send(newData)
})

router.delete('/weathers/:cityName', function (req, res) {
    Weather.find({ "name": req.params.cityName }).deleteOne().exec().then(()=>res.send("data is deleted"))
})

module.exports = router