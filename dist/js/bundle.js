'use strict';

angular.module('unsplashExtention', []);
// angular.module('unsplashExtention', ['ngCookies']).controller('cookiesCtrl', ['$cookies', function($cookies) {
//   var favoriteCookie = $cookies.get('myF'
// }]);
"use strict";
"use strict";

// Not needed function...kept here because I may need it later
// function init() {
//     timeDisplay = document.createTextNode("");
//     document.getElementById("clock").appendChild(timeDisplay);
// }

function updateClock() {
    var currentTime = new Date();

    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    var timeOfDay = currentHours < 12 ? "AM" : "PM";
    currentHours = currentHours > 12 ? currentHours - 12 : currentHours;
    currentHours = currentHours === 0 ? 12 : currentHours;
    var currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;
    document.getElementById("clock").firstChild.nodeValue = currentTimeString;
}
'use strict';

angular.module('unsplashExtention').directive('animateDir', function () {
    return {
        restrict: 'EA',
        link: function link(scope, elems, attrs) {
            $(document).ready(function () {

                $('.settings-icon').on('mouseenter', function () {

                    $('.menu-container').show(500, function () {
                        setTimeout(function () {
                            $('.menu-container').css('display', 'flex');
                            $('.menu-items').show(150);
                            $('.menu-title').show(150);
                        }, 100);
                    });
                });

                $('.menu-container').on('mouseleave', function () {
                    $('.menu-container').hide(500);
                    $('.menu-items').hide(100);
                    $('.menu-title').hide(100);
                    setTimeout(function () {
                        $('.menu-container').css('display', 'none');
                    }, 500);
                });

                $('.name').on('keyUp', function () {
                    console.log($('.name').val());
                    var currentName = $('.name').val();
                    localStorage.setItem('name', currentName);
                });
                $('.menu-toggle').on('click');
            });
        }
    };
});
'use strict';

angular.module('unsplashExtention').controller('mainCtrl', function ($scope, quoteSvc, photoSvc, nameSvc) {
    quoteSvc.getQuote().then(function (response) {
        console.log(response);
        $scope.quoteText = response.quoteText.trim();
        $scope.quoteAuthor = response.quoteAuthor || "Unknown";
    });

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

    // $scope.location = "http://forecast.io/embed/#lat=" + geoplugin_latitude() + "&lon=" + geoplugin_longitude() + "&name=" + geoplugin_city();
    //
    // $scope.latitude = geoplugin_latitude();
    // $scope.longitude = geoplugin_longitude();
    // $scope.city = geoplugin_city();
    $scope.name = nameSvc.name;
    $scope.saveName = function (name) {
        nameSvc.setName(name);
        console.log(saveName);
    };

    $scope.$watch('toggle', function () {
        $scope.toggleText = $scope.timeOption ? 'On' : 'Off';
        $scope.timeOption = false;
    });

    $scope.timeOptionOn = true;
    $scope.timeOptionOff = false;
    $scope.greetingOption = false;
    $scope.weatherOption = false;
    $scope.quoteOption = false;
    $scope.backgroundOption = false;
});
'use strict';

angular.module('unsplashExtention').service('nameSvc', function () {
  this.name = '';
  if (localStorage.getItem('user')) {
    this.name = localStorage.getItem('user');
  }
  this.setName = function (name) {
    localStorage.setItem('name', name);
  };
});
'use strict';

angular.module('unsplashExtention').service('photoSvc', function ($http) {
  this.getUsersFavs = function () {
    var baseUrl = "https://api.unsplash.com/";
    var collectionID = 140375;
    return $http({
      method: 'GET',
      url: baseUrl + "collections/:" + collectionID + "/photos"
    }).then(function (response) {
      if (response === 200) {
        console.log(response.data);
        return response.data.results;
      }
      return "link broken";
    });
  };
});
'use strict';

angular.module('unsplashExtention').service('quoteSvc', function ($http) {
  this.getQuote = function () {
    return $http({
      method: 'GET',
      url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
    }).then(function (response) {
      if (response.status === 200) {
        // console.log(response.data.quoteText);
        // console.log(response.data.quoteAuthor);
        return response.data;
      }
      return "Have a beautiful day!";
    });
  };
});
//# sourceMappingURL=bundle.js.map
