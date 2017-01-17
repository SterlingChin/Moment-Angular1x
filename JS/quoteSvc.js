angular.module('unsplashExtention').service('quoteSvc', function($http) {
    this.getQuote = function() {
        return $http({
            method: 'GET',
            url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
        }).then(function(response) {
            console.log(response.data)
            return response.data;
        });
    };
});
