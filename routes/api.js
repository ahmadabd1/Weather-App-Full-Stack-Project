const express = require('express')
const router = express.Router()

const Weather = require('../models/Weather ')
const apiManger = require('../models/apimanger')

const apiMangweather = new apiManger()

const filterWeatherData = function (dataWeather) {
    return dataWeather.then(data => {
        return {
            id: data.data.weather[0].id,
            name: data.data.name,
            conditionPic: data.data.weather[0].icon,
            tempe: data.data.main.temp,
            condition: data.data.weather[0].description
        }
    })
}

router.get('/weathers/:cityName', function (req, res) {
    const cityName = req.params.cityName
    const data = apiMangweather.getTheData(cityName)
    const filterData = filterWeatherData(data)
    filterData.then(weatherDb => {
        apiMangweather.weatherDataList.push(weatherDb)
        res.send(weatherDb)
    })


})
//EX 1 :
router.post('/weathers/:id', function (req, res) {
    const weatherId = req.params.id
    const newData = new Weather(apiMangweather.getTheList().find(weatherID => weatherID.id === (parseInt(weatherId))))
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

    Weather.find({ "name": req.params.cityName }).deleteOne().exec()
    res.send("all the data is deleted")



})
module.exports = router