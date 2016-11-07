angular.module('unsplashExtention').service('weatherSvc', function($http) {
    this.getWeather = function() {
        return $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?units=imperial&q=' + geoplugin_city() + '&APPID=93491e6dadbe8a2ac36dc3e3855f670a'
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
});
