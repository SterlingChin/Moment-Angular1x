angular.module('unsplashExtention').service('photoSvc', function($http){
  this.getUsersFavs = function(){
    var baseUrl = "https://api.unsplash.com/";
    var collectionID = 140375;
    return $http({
      method: 'GET',
      url: baseUrl + "collections/:" + collectionID + "/photos"
    }).then(function(response){
      if(response === 200){
        return response.data.results;
      }
      return "link broken";
    });
  };
});
