angular.module('app').service('mainSvc', function ($http, userPreferences) {
  var BASE_URL1 = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip='
  var BASE_URL2 = 'http://api.openweathermap.org/data/2.5/forecast/daily?zip='
  var APP_ID = '&APPID=' + config.appSecret

  this.getWeather = function (zip) {
    return $http({
      method: 'GET',
      url: BASE_URL1 + zip + APP_ID
    }).then(function (response) {
      if (response.status === 200) {
        return response.data
      }
      return "It's broken, sorry!";
    });
  };

  this.getForecast = function (zip) {
    return $http({
      method: 'GET',
      url: BASE_URL2 + zip + '&units=imperial&cnt=7' + APP_ID
    }).then(function (response) {
      var data = response.data.list;
      if (response.status === 200) {
        console.log(response.data)
        return data;
      }
      return "It's broken, sorry!";
    });
  };

  this.getQuote = function () {
    return $http({
      method: 'GET',
      url: "https://andruxnet-random-famous-quotes.p.mashape.com/",
      headers: {
        'X-Mashape-Key': 'N76CGzg78EmshZSF5CRPvHI8T6mpp1RnzVIjsn7bBk0CjlAu26',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      }
    }).then(function (response) {
      return response.data;
    });
  };
});
