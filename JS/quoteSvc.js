angular.module('unsplashExtention').service('quoteSvc', function($http){
  this.getQuote = function(){
    return $http({
        method: 'GET',
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/",
        headers: {
                'X-Mashape-Key': 'N76CGzg78EmshZSF5CRPvHI8T6mpp1RnzVIjsn7bBk0CjlAu26',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
    }).then(function(response){
      if(response.status === 200){
        // console.log(response.data.quoteText);
        // console.log(response.data.quoteAuthor);
        return response.data;
      }
      return "Have a beautiful day!";
    });
  };
});
