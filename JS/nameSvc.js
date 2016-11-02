angular.module('unsplashExtention').service('nameSvc', function(){
  this.name = '';
  if(localStorage.getItem('user')){
    this.name = localStorage.getItem('user');
  }
  this.setName = function(name){
    localStorage.setItem('name', name);
  };
});
