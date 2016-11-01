angular.module('newTabPhoto').controller('mainCtrl', function($scope) {
    // mainSvc.getUsersFavs().then(function(photos) {
    //     $scope.photos = photo;
    // });

    function greeting() {
        var currentTime = new Date();
        var currentHours = currentTime.getHours();
        console.log(currentHours);
        if (currentHours < 12) {
            $scope.greeting = "Good Morning";
        } else if (17 > currentHours && currentHours >= 12) {
            $scope.greeting = "Good Afternoon";
        } else {
            $scope.greeting = "Good Evening";
        }
    }
    greeting();

    $scope.name = "Steve";


    // function location() {
    //     return "http://forecast.io/embed/#lat=" + geoplugin_latitude() + "&lon=" + geoplugin_longitude() + "&name=" + geoplugin_city();
    // }
    // $scope.yourLocation = location();
    //
    // quoteSvc.getQuote(quoteSvc).then(function(quotes) {
    //     $scope.quote = quote;
    // });
});
