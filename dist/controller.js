const rend = new Render()
const mangeWeathers = new WeatherManger()


const mongoDB = function () {
    const displayDB = mangeWeathers.getAllTheWeathersData()
    displayDB.then(data => {
        rend.displayTheWeathers(data)
    })
}
mongoDB()

searchBTN.on('click', function () {
    const searchInput = cityInput.val()

    if (searchInput != "") {
        divDisplay.empty()
        const theWeather = mangeWeathers.getWeatherByCityName(searchInput)
        theWeather.then(res => {
            rend.displayTheWeathers(mangeWeathers.getTheList())
        })
    } else {
        console.error("the iput is empty!")
    }
})

divDisplay.on('click', '.btnadd', function () {
    divDisplay.empty()
    const idweather = $(this).attr("id")
    const saveData = mangeWeathers.saveDataById(idweather)
    saveData.then(resweather => {
        mangeWeathers.changethestatus(resweather, idweather)
        rend.displayTheWeathers(mangeWeathers.getTheList())
    })
})

divDisplay.on('click', '.btndelete', function () {
    
    divDisplay.empty()
    const idweather = $(this).attr("id")
    const deleteData = mangeWeathers.deleteweather(idweather)
    deleteData.then(resweather => {
        console.log(resweather)
    })
    rend.displayTheWeathers(mangeWeathers.getTheList())
})

divDisplay.on('click', '.reload', function () {
    divDisplay.empty()
    const nameToRefresh = $(this).closest("div").find("h2").text()
    const idToRefresh = $(this).closest("div").find("i").attr("id")
    const deleteData = mangeWeathers.deleteweather(idToRefresh)
    deleteData.then(resweather => {
        console.log(resweather)
        const reloadData = mangeWeathers.getWeatherByCityName(nameToRefresh)
        reloadData.then(res => {
            rend.displayTheWeathers(mangeWeathers.getTheList())
        })
    })
})
