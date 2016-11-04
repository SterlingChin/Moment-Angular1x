angular.module('unsplashExtention').service('weatherSvc', function(){
  this.getWeather = function(){
    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + geoplugin_latitude() + '&lon=' + geoplugin_longitude() + '&APPID=93491e6dadbe8a2ac36dc3e3855f670a'}).then(function(response){
        if(response.status === 200){
          return response.data;
        }
        return response.status;
    });
  };
});
