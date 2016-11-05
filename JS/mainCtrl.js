angular.module('unsplashExtention').controller('mainCtrl', function($scope, quoteSvc, photoSvc, nameSvc, userPreferences) {
    quoteSvc.getQuote().then(function(response) {
        console.log(response);
        $scope.quoteText = response.quoteText.trim();
        $scope.quoteAuthor = response.quoteAuthor || "Unknown";
    });

    // weatherSvc.getWeather().then(function(response){
    //   console.log(response);
    //   $scope.weatherMain = response.weather.main;
    //   $scope.weatherIcon = response.weather.icon;
    //   $scope.weatherTemp = response.main.temp;
    //   $scope.weatherCity = response.name;
    // });

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

    // $scope.location = "http://forecast.io/embed/#lat=" + geoplugin_latitude() + "&lon=" + geoplugin_longitude() + "&name=" + geoplugin_city();
    $scope.settings = userPreferences.userSettings();
    console.log($scope.settings);
    $scope.name = $scope.settings.userName;
    console.log($scope.name);


    $scope.latitude = geoplugin_latitude();
    $scope.longitude = geoplugin_longitude();
    $scope.city = geoplugin_city();
    console.log(geoplugin_city());
    console.log(geoplugin_longitude());
    console.log(geoplugin_latitude());

    // $scope.location = 'http://api.openweathermap.org/data/2.5/weather?lat=' + geoplugin_latitude() + '&lon=' + geoplugin_longitude() + '&APPID=93491e6dadbe8a2ac36dc3e3855f670a';


});
