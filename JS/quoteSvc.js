angular.module('unsplashExtention').service('quoteSvc', function($http) {
    this.getQuote = function() {
        return $http({
            method: 'GET',
            // url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
            url: "https://andruxnet-random-famous-quotes.p.mashape.com/",
            headers: {
                'X-Mashape-Key': 'N76CGzg78EmshZSF5CRPvHI8T6mpp1RnzVIjsn7bBk0CjlAu26',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        }).then(function(response) {
            console.log(response.data)
            return response.data;
        });
    };
});
