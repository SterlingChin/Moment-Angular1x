angular.module('unsplashExtention').controller('mainCtrl', function($scope, quoteSvc, photoSvc) {
    $scope.name = "Steve";
    var quoteObj = quoteSvc.getQuote();
    console.log(quoteObj);

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




    // function location() {
    //     return "http://forecast.io/embed/#lat=" + geoplugin_latitude() + "&lon=" + geoplugin_longitude() + "&name=" + geoplugin_city();
    // }
    // $scope.yourLocation = location();
    //
});
