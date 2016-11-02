angular.module('unsplashExtention').service('quoteSvc', function($http){
  this.getQuote = function(){
    return $http({
      method: 'GET',
      url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
    }).then(function(response){
      if(response.status === 200){
        console.log(response.data.quoteText);
        console.log(response.data.quoteAuthor);
        return response.data;
      }
      return "Have a beautiful day!";
    });
  };
});
