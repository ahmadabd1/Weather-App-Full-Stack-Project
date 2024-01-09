
const axios = require('axios');
const configs = require('./configs')

class ApiManger {
    constructor() {
        this.weatherDataList=[]
    }
    getTheData(name) {
        try{
        const weatherPromise = axios.get(`${configs.URL_WEATHERS}q=${name}&appid=${configs.API_WEATHERS}&units=metric`)
        return weatherPromise
        }catch(error){
            console.error("the input no defined")
        }
    }

    filterWeatherData(dataWeather) {
        return dataWeather.then(data => {
            return {
                id: data.data.id,
                name: data.data.name,
                conditionPic: data.data.weather[0].icon,
                tempe: data.data.main.temp,
                condition: data.data.weather[0].description,
                date:new Date().toString()
            }
        })
    }

}
module.exports = ApiManger





