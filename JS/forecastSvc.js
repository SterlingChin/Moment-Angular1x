angular.module('unsplashExtention').service('forecastSvc', function($http) {
    this.getForecast = function() {
        return $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?id=4047656&units=imperial&cnt=7&APPID=93491e6dadbe8a2ac36dc3e3855f670a'
        }).then(function(response) {
            var forecastObject = {};
            var data = response.data.list;
            if (response.status === 200) {
                console.log(response.data);
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
                console.log(forecastObject);
                return forecastObject;
            }
            return "It's broken, sorry! ";
        });
    };
});
