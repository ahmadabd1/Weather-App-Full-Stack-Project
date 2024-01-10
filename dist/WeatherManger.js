class WeatherManger {
    constructor() {
        this.weatherDataList = []
        this.myLocateWeather 
    }
    //routes
    async getAllTheWeathersData(){
        const allDB = await $.get(`/weathers`)
        allDB.forEach(element => {
            element.inData=true    
        })
        this.weatherDataList = allDB
        return allDB
    }
    
    async getWeatherByCityName(cityname) {
        try {
            const theWeather = await $.get(`/weathers/${cityname}`)
            this.addToTheList(theWeather)
            return theWeather
        } catch (error) {
            alert("IT'S NOT DEFINDED")
        }
    }

    saveDataById(idData) {
        return $.post(`/weathers/${idData}`)
    }

    async deleteweather(id){
        const cityname = this.getNameOfWeatherById(id)
        const delweather = await $.ajax({
            url: `/weathers/${cityname}`,
            type: 'DELETE',
            success: function(result) {
            }
        });
        return delweather  
    }

    getMyWeather(lat,lon){
        
        return $.get(`/weather/my/${lat}/${lon}`)
        
    }
 
 
    getNameOfWeatherById(id){
        const i = this.weatherDataList.findIndex(x => x.id ==id)
        const name = this.weatherDataList[i].name
        this.weatherDataList.splice(i,1)
        return name
    }
    addToTheList(weather) {
        weather.inData = false
        this.weatherDataList.push(weather)
    }
    changethestatus(weather, id) {
        weather.id = id
        weather.inData = true
        const i = this.weatherDataList.findIndex(x =>x.id === parseInt(weather.id ))
        this.weatherDataList[i] = weather
    }
    getTheList() {
        return this.weatherDataList
    }
}