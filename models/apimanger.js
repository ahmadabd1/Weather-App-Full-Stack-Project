
const axios = require('axios');
const configs = require('./configs')

class ApiManger {
    constructor() {
        this.weatherDataList=[]
        this.myLocate
    }
    getTheData(name) {
        try{
        const weatherPromise = axios.get(`${configs.URL_WEATHERS}q=${name}&appid=${configs.API_WEATHERS}&units=metric`)
        return weatherPromise
        }catch(error){
            console.error("the input no defined")
        }
    }
   async fetMyWeatherLocation(lat,lon){
        const myWeatherPromise = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c0f07e5f9e057fb360f77824be970b25&units=metric`)
        this.myLocate=myWeatherPromise
        return myWeatherPromise
    }
    filterWeatherData(dataWeather) {
        try {
            return {
                id: dataWeather.data.id,
                name: dataWeather.data.name,
                conditionPic: dataWeather.data.weather[0].icon,
                tempe: dataWeather.data.main.temp,
                condition: dataWeather.data.weather[0].description,
                date:new Date()
            }
        } catch (error) {
            console.error("no filters")
        }
      
    }

}
module.exports = ApiManger





