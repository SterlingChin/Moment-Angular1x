angular.module('unsplashExtention').controller('mainCtrl', function($scope, quoteSvc, photoSvc) {
    $scope.name = "Steve";
    quoteSvc.getQuote().then(function(response) {
        console.log(response);
        $scope.quoteText = response.quoteText;
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

    // $scope.latitude = function location() {
    //     return "http://forecast.io/embed/#lat=" + geoplugin_latitude() + "&lon=" + geoplugin_longitude() + "&name=" + geoplugin_city();
    // };
    // location();
    // console.log(location());

    $scope.latitude = geoplugin_latitude();
    $scope.longitude = geoplugin_longitude();
    $scope.city = geoplugin_city();

});
