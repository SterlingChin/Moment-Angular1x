"use strict";

angular.module('unsplashExtention', ["ngCookies"]);
'use strict';

angular.module('unsplashExtention').factory('userPreferences', ['$cookies', function ($cookies) {
    return {
        setCookieData: function setCookieData(settingData) {
            settingData = JSON.stringify(settingData);
            $cookies.put('settingKey', settingData);
            console.log(settingData);
        },

        userSettings: function userSettings() {
            var settings = $cookies.get('settingKey');
            if (settings) {
                settings = JSON.parse(settings);
                console.log(settings);
                return settings;
            }
            return {
                userName: " ",
                timeOption: false,
                greetingOption: false,
                weatherOption: false,
                quoteOption: false,
                backgroundOption: false
            };
        }
    };
}]);
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

angular.module('unsplashExtention').directive('animateDir', function (userPreferences) {
    return {
        scope: {
            settings: "="
        },
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
                    console.log(scope.settings);
                    $('.menu-container').hide(500);
                    $('.menu-items').hide(100);
                    $('.menu-title').hide(100);
                    setTimeout(function () {
                        $('.menu-container').css('display', 'none');
                    }, 500);
                    userPreferences.setCookieData(scope.settings);
                    console.log(scope.settings);
                });
                //
                // $('.name').on('keyUp', function() {
                //     console.log($('.name').val());
                //     var currentName = $('.name').val();
                //     localStorage.setItem('name', currentName);
                // });
            });
        }
    };
});
'use strict';

angular.module('unsplashExtention').controller('mainCtrl', function ($scope, quoteSvc, photoSvc, nameSvc, userPreferences) {
    quoteSvc.getQuote().then(function (response) {
        console.log(response);
        $scope.quoteText = response.quoteText.trim();
        $scope.quoteAuthor = response.quoteAuthor || "Unknown";
    });

    // weatherSvc.getWeather().then(function(response){
    //   console.log(response);
    //   $scope.weatherMain = response.weather.main;
    //   $scope.weatherIcon = response.weather.icon;
    //   $scope.weatherTemp = response.main.temp;
    //   $scope.weatherCity = response.name;
    // });

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
    $scope.settings = userPreferences.userSettings();
    console.log($scope.settings);
    $scope.name = $scope.settings.userName;
    console.log($scope.name);

    $scope.latitude = geoplugin_latitude();
    $scope.longitude = geoplugin_longitude();
    $scope.city = geoplugin_city();
    console.log(geoplugin_city());
    console.log(geoplugin_longitude());
    console.log(geoplugin_latitude());

    // $scope.location = 'http://api.openweathermap.org/data/2.5/weather?lat=' + geoplugin_latitude() + '&lon=' + geoplugin_longitude() + '&APPID=93491e6dadbe8a2ac36dc3e3855f670a';

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
'use strict';

angular.module('unsplashExtention').service('weatherSvc', function () {
  this.getWeather = function () {
    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + geoplugin_latitude() + '&lon=' + geoplugin_longitude() + '&APPID=93491e6dadbe8a2ac36dc3e3855f670a' }).then(function (response) {
      if (response.status === 200) {
        return response.data;
      }
      return response.status;
    });
  };
});
//# sourceMappingURL=bundle.js.map
