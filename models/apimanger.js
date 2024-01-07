
const axios = require('axios');
class ApiManger {
    constructor() {
        this.weatherDataList = []
    }
    getTheData(name) {
        const weatherPromise = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=c0f07e5f9e057fb360f77824be970b25&units=metric`)
        return weatherPromise
    }
    getTheList(){
        return this.weatherDataList
    }
}
module.exports = ApiManger





