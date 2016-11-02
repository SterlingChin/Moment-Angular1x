angular.module('unsplashExtention').controller('mainCtrl', function($scope, quoteSvc, photoSvc, nameSvc) {
    quoteSvc.getQuote().then(function(response) {
        console.log(response);
        $scope.quoteText = response.quoteText.trim();
        $scope.quoteAuthor = response.quoteAuthor || "Unknown";
    });

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
    //
    // $scope.latitude = geoplugin_latitude();
    // $scope.longitude = geoplugin_longitude();
    // $scope.city = geoplugin_city();
    $scope.name = nameSvc.name;
    $scope.saveName = function(name) {
        nameSvc.setName(name);
        console.log(saveName);
    };
    $scope.timeOption = false;
    $scope.greetingOption = false;
    $scope.weatherOption = false;
    $scope.quoteOption = false;

});
