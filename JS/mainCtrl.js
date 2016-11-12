angular.module('unsplashExtention').controller('mainCtrl', function($scope, quoteSvc, photoSvc, nameSvc, weatherSvc, forecastSvc, userPreferences) {
    quoteSvc.getQuote().then(function(response) {
      if(!response.quoteText){
        quoteSvc.getQuote();
      }
        $scope.quoteText = response.quoteText.trim();
        $scope.quoteAuthor = response.quoteAuthor || "Unknown";
    });

    // console.log('http://api.openweathermap.org/data/2.5/weather?lat=' + geoplugin_latitude() + '&lon=' + geoplugin_longitude() + '&APPID=93491e6dadbe8a2ac36dc3e3855f670a');

    weatherSvc.getWeather().then(function(weatherObject) {
        $scope.weatherTemp = weatherObject.temp;
        $scope.weatherIcon = weatherObject.icon;
        $scope.weatherDesc = weatherObject.desc;
        $scope.weatherHum = weatherObject.hum;
        $scope.weatherPres = weatherObject.pressure;
        $scope.weatherSpeed = weatherObject.windSpeed;
    });

    forecastSvc.getForecast().then(function(forecastObject) {
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

    function greeting() {
        var currentTime = new Date();
        console.log(currentTime);
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
    // $scope.newBackground = photoSvc.getPhoto().then(function(response) {
    //     return response;
    // });

    $scope.settings = userPreferences.userSettings();

    $scope.name = $scope.settings.userName;

    $scope.$watch('name', function() {
        if ($scope.name === "my name is Steve") {
            $('.console').show(300);
            $('.console').css('display', 'flex');
        }
    });

    $scope.latitude = geoplugin_latitude();
    $scope.longitude = geoplugin_longitude();
    $scope.city = geoplugin_city();
    // console.log(geoplugin_city());
    // console.log(geoplugin_longitude());
    // console.log(geoplugin_latitude());

    //call back function which calls back the state to change the background.
});
