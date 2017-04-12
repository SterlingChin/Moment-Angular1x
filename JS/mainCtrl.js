angular.module('unsplashExtention').controller('mainCtrl', function ($scope, quoteSvc, photoSvc, nameSvc, weatherSvc, userPreferences) {
  quoteSvc.getQuote().then(function (response) {
    if (!response.quoteText) {
      quoteSvc.getQuote();
    }
    $scope.quoteText = response.quote;
    $scope.quoteAuthor = response.author || "Unknown";
  });

  function getWeather() {
    console.log('pinged weather')
    weatherSvc.getLocation().then(response => {
      $scope.city = response.city
      return response.postal
    }).then(response => {
        weatherSvc.getWeather(response).then(function (weatherObject) {
          $scope.weatherTemp = weatherObject.temp;
          $scope.weatherIcon = weatherObject.icon;
          $scope.weatherDesc = weatherObject.desc;
          $scope.weatherHum = weatherObject.hum;
          $scope.weatherPres = weatherObject.pressure;
          $scope.weatherSpeed = weatherObject.windSpeed;
        })
        weatherSvc.getForecast(response).then(function (forecastObject) {
          $scope.forecastTempHigh = forecastObject.tempHigh;
          $scope.forecastTempLow = forecastObject.tempLow;
          $scope.forecastTempHigh1 = forecastObject.tempHigh1;
          $scope.forecastTempLow1 = forecastObject.tempLow1;
          $scope.forecastDesc1 = forecastObject.desc1;
          $scope.forecastTempHigh2 = forecastObject.tempHigh2;
          $scope.forecastTempLow2 = forecastObject.tempLow2;
          $scope.forecastDesc2 = forecastObject.desc2;
          $scope.forecastTempHigh3 = forecastObject.tempHigh3;
          $scope.forecastTempLow3 = forecastObject.tempLow3;
          $scope.forecastDesc3 = forecastObject.desc3;
          $scope.forecastTempHigh4 = forecastObject.tempHigh4;
          $scope.forecastTempLow4 = forecastObject.tempLow4;
          $scope.forecastDesc4 = forecastObject.desc4;
          $scope.forecastTempHigh5 = forecastObject.tempHigh5;
          $scope.forecastTempLow5 = forecastObject.tempLow5;
          $scope.forecastDesc5 = forecastObject.desc5;
          $scope.forecastTempHigh6 = forecastObject.tempHigh6;
          $scope.forecastTempLow6 = forecastObject.tempLow6;
          $scope.forecastDesc6 = forecastObject.desc6;
        });
      }

    );
  }
  getWeather()
  var myInterval = setInterval(getWeather, 1800000)


  function greeting() {
    var currentTime = new Date(); 
    var currentHours = currentTime.getHours();
    if (currentHours < 12) {
      $scope.greeting = "Good Morning";
    } else if (17 > currentHours && currentHours >= 12) {
      $scope.greeting = "Good Afternoon";
    } else {
      $scope.greeting = "Good Evening";
    }
  }
  greeting();


  $scope.time = moment().format('h:mm A');

  $scope.todayDate = moment().format('MMM Do YYYY');
  $scope.day2 = moment().add(2, 'days').format('MMM Do');
  $scope.day3 = moment().add(3, 'days').format('MMM Do');
  $scope.day4 = moment().add(4, 'days').format('MMM Do');
  $scope.day5 = moment().add(5, 'days').format('MMM Do');
  $scope.day6 = moment().add(6, 'days').format('MMM Do');

  $scope.settings = userPreferences.userSettings();

  weatherSvc.zip = $scope.settings.zipcode
  $scope.name = $scope.settings.userName;

  $scope.$watch('name', function () {
    if ($scope.name === "my name is Steve") {
      $('.console').show(300);
      $('.console').css('display', 'flex');
    }
  });

});
