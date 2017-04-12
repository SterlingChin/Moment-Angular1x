angular.module('unsplashExtention').service('weatherSvc', function($http, userPreferences) {
    var BASE_URL1 = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip='
    var BASE_URL2 = 'http://api.openweathermap.org/data/2.5/forecast/daily?zip='
    var APP_ID = '&APPID=93491e6dadbe8a2ac36dc3e3855f670a'

    this.getLocation = ()=>{
        return $http({
            method: 'GET',
            url: "https://ipinfo.io/json"
        }).then(response => {
            return response.data
        })
    }

    this.getWeather = function(zip) {
        return $http({
            method: 'GET',
            url: BASE_URL1 + zip + APP_ID
        }).then(function(response) {
            var weatherObject = {};
            if (response.status === 200) {
                weatherObject.temp = response.data.main.temp;
                weatherObject.icon = response.data.weather[0].icon;
                weatherObject.desc = response.data.weather[0].description;
                weatherObject.hum = response.data.main.humidity;
                weatherObject.pressure = response.data.main.pressure;
                weatherObject.windSpeed = response.data.wind.speed;
                return weatherObject;
            }
            return "It's broken, sorry!";
        });
    };

    this.getForecast = function(zip) {
        return $http({
            method: 'GET',
            url: BASE_URL2 + zip + '&units=imperial&cnt=7' + APP_ID
        }).then(function(response) {
            var forecastObject = {};
            var data = response.data.list;
            if (response.status === 200) {
                forecastObject.tempHigh = data[0].temp.max;
                forecastObject.tempLow = data[0].temp.min;
                forecastObject.tempHigh1 = data[1].temp.max;
                forecastObject.tempLow1 = data[1].temp.min;
                forecastObject.desc1 = data[1].weather[0].main;
                forecastObject.tempHigh2 = data[2].temp.max;
                forecastObject.tempLow2 = data[2].temp.min;
                forecastObject.desc2 = data[2].weather[0].main;
                forecastObject.tempHigh3 = data[3].temp.max;
                forecastObject.tempLow3 = data[3].temp.min;
                forecastObject.desc3 = data[3].weather[0].main;
                forecastObject.tempHigh4 = data[4].temp.max;
                forecastObject.tempLow4 = data[4].temp.min;
                forecastObject.desc4 = data[4].weather[0].main;
                forecastObject.tempHigh5 = data[5].temp.max;
                forecastObject.tempLow5 = data[5].temp.min;
                forecastObject.desc5 = data[5].weather[0].main;
                forecastObject.tempHigh6 = data[6].temp.max;
                forecastObject.tempLow6 = data[6].temp.min;
                forecastObject.desc6 = data[6].weather[0].main;
                return forecastObject;
            }
            return "It's broken, sorry! ";
        });
    };
});
