angular.module('app').directive('weatherDir', function(){
    return {
        restrict: 'EA',
        templateUrl:'./js/directives/weather.html'
    }
})