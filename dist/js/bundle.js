"use strict";

angular.module('unsplashExtention', ["ngCookies"]);
"use strict";

// Not needed function...kept here because I may need it later
// function init() {
//     timeDisplay = document.createTextNode("");
//     document.getElementById("clock").appendChild(timeDisplay);
// }
// Isaac showed me moment.js.  This is a relic of the past.
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

angular.module('unsplashExtention').factory('userPreferences', ['$cookies', function ($cookies) {
    return {
        setCookieData: function setCookieData(settingData) {
            settingData = JSON.stringify(settingData);
            $cookies.put('settingKey', settingData);
        },

        userSettings: function userSettings() {
            var settings = $cookies.get('settingKey');
            if (settings) {
                settings = JSON.parse(settings);
                return settings;
            }
            return {
                userName: "____________",
                timeOption: false,
                greetingOption: false,
                weatherOption: false,
                quoteOption: false,
                forcastOption2: false
            };
        }
    };
}]);
'use strict';

angular.module('unsplashExtention').service('forecastSvc', function ($http) {
    this.getForecast = function () {
        return $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?id=4047656&units=imperial&cnt=7&APPID=93491e6dadbe8a2ac36dc3e3855f670a'
        }).then(function (response) {
            var forecastObject = {};
            var data = response.data.list;
            if (response.status === 200) {
                console.log(response.data);
                forecastObject.tempHigh = data[0].temp.max;
                forecastObject.tempLow = data[0].temp.min;
                forecastObject.tempHigh1 = data[1].temp.max;
                forecastObject.tempLow1 = data[1].temp.min;
                forecastObject.desc1 = data[1].weather[0].main;
                forecastObject.tempHigh2 = data[2].temp.max;
                forecastObject.tempLow2 = data[2].temp.min;
                forecastObject.desc2 = data[2].weather[0].main;
                forecastObject.tempHigh3 = data[3].temp.max;
                forecastObject.tempLow3 = data[3].temp.min;
                forecastObject.desc3 = data[3].weather[0].main;
                forecastObject.tempHigh4 = data[4].temp.max;
                forecastObject.tempLow4 = data[4].temp.min;
                forecastObject.desc4 = data[4].weather[0].main;
                forecastObject.tempHigh5 = data[5].temp.max;
                forecastObject.tempLow5 = data[5].temp.min;
                forecastObject.desc5 = data[5].weather[0].main;
                forecastObject.tempHigh6 = data[6].temp.max;
                forecastObject.tempLow6 = data[6].temp.min;
                forecastObject.desc6 = data[6].weather[0].main;
                console.log(forecastObject);
                return forecastObject;
            }
            return "It's broken, sorry! ";
        });
    };
});
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
                    $('.menu-container').hide(500);
                    $('.menu-items').hide(100);
                    $('.menu-title').hide(100);
                    setTimeout(function () {
                        $('.menu-container').css('display', 'none');
                    }, 500);
                    userPreferences.setCookieData(scope.settings);
                });

                $('.console').on('click', function () {
                    $('.console').hide(300);
                });

                $('.bottom-center').on('mouseenter', function () {
                    $('#quoteAuthor').fadeIn(300);
                });
                $('.bottom-center').on('mouseleave', function () {
                    $('#quoteAuthor').fadeOut(300);
                });

                $('.weather').on('mouseenter', function () {
                    $('#weatherData').fadeIn(500);
                });
                $('.weather').on('mouseleave', function () {
                    $('#weatherData').fadeOut(500);
                });

                $('#hideForecast').on('click', function () {
                    $('.forecast-container').fadeOut(500);
                });
                $('#sevenDay').on('click', function () {
                    $('.forecast-container').fadeIn(500);
                    $('.forecast-container').css('display', 'flex');
                });

                $('.question-icon').on('click', function () {
                    $('.question-container').fadeIn(500);
                    $('.question-container').css('display', 'flex');
                });
                $('#question-hide').on('click', function () {
                    $('.question-container').fadeOut(500);
                    // $('.question-container').css('display', 'none');
                });
            });
        }
    };
});
'use strict';

angular.module('unsplashExtention').controller('mainCtrl', function ($scope, quoteSvc, photoSvc, nameSvc, weatherSvc, forecastSvc, userPreferences) {
    quoteSvc.getQuote().then(function (response) {
        if (!response.quoteText) {
            quoteSvc.getQuote();
        }
        $scope.quoteText = response.quote;
        $scope.quoteAuthor = response.author || "Unknown";
    });

    // console.log('http://api.openweathermap.org/data/2.5/weather?lat=' + geoplugin_latitude() + '&lon=' + geoplugin_longitude() + '&APPID=93491e6dadbe8a2ac36dc3e3855f670a');
    function getWeather() {
        weatherSvc.getWeather().then(function (weatherObject) {
            $scope.weatherTemp = weatherObject.temp;
            $scope.weatherIcon = weatherObject.icon;
            $scope.weatherDesc = weatherObject.desc;
            $scope.weatherHum = weatherObject.hum;
            $scope.weatherPres = weatherObject.pressure;
            $scope.weatherSpeed = weatherObject.windSpeed;
            console.log('weather ping');
        });
    };
    getWeather();
    var myInterval = setInterval(getWeather, 1800000);

    forecastSvc.getForecast().then(function (forecastObject) {
        $scope.forecastTempHigh = forecastObject.tempHigh;
        $scope.forecastTempLow = forecastObject.tempLow;
        $scope.forecastTempHigh1 = forecastObject.tempHigh1;
        $scope.forecastTempLow1 = forecastObject.tempLow1;
        $scope.forecastDesc1 = forecastObject.desc1;
        $scope.forecastTempHigh2 = forecastObject.tempHigh2;
        $scope.forecastTempLow2 = forecastObject.tempLow2;
        $scope.forecastDesc2 = forecastObject.desc2;
        $scope.forecastTempHigh3 = forecastObject.tempHigh3;
        $scope.forecastTempLow3 = forecastObject.tempLow3;
        $scope.forecastDesc3 = forecastObject.desc3;
        $scope.forecastTempHigh4 = forecastObject.tempHigh4;
        $scope.forecastTempLow4 = forecastObject.tempLow4;
        $scope.forecastDesc4 = forecastObject.desc4;
        $scope.forecastTempHigh5 = forecastObject.tempHigh5;
        $scope.forecastTempLow5 = forecastObject.tempLow5;
        $scope.forecastDesc5 = forecastObject.desc5;
        $scope.forecastTempHigh6 = forecastObject.tempHigh6;
        $scope.forecastTempLow6 = forecastObject.tempLow6;
        $scope.forecastDesc6 = forecastObject.desc6;
    });

    function greeting() {
        var currentTime = new Date();
        console.log(currentTime);
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

    $scope.time = moment().format('h:mm A');

    $scope.todayDate = moment().format('MMM Do YYYY');
    $scope.day2 = moment().add(2, 'days').format('MMM Do');
    $scope.day3 = moment().add(3, 'days').format('MMM Do');
    $scope.day4 = moment().add(4, 'days').format('MMM Do');
    $scope.day5 = moment().add(5, 'days').format('MMM Do');
    $scope.day6 = moment().add(6, 'days').format('MMM Do');
    // $scope.newBackground = photoSvc.getPhoto().then(function(response) {
    //     return response;
    // });

    $scope.settings = userPreferences.userSettings();

    $scope.name = $scope.settings.userName;

    $scope.$watch('name', function () {
        if ($scope.name === "my name is Steve") {
            $('.console').show(300);
            $('.console').css('display', 'flex');
        }
    });

    // $scope.latitude = geoplugin_latitude();
    // $scope.longitude = geoplugin_longitude();
    $scope.city = "Provo";
    // console.log(geoplugin_city());
    // console.log(geoplugin_longitude());
    // console.log(geoplugin_latitude());
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
  //   this.getPhoto = function(){
  //     return $http({
  //       method: 'GET',
  //       url: "https://source.unsplash.com/category/nature/1920x1080"
  //     }).then(function(response){
  //         return response;
  //       });
  //
  // };
});
'use strict';

angular.module('unsplashExtention').service('quoteSvc', function ($http) {
    this.getQuote = function () {
        return $http({
            method: 'GET',
            url: "https://andruxnet-random-famous-quotes.p.mashape.com/",
            headers: {
                'X-Mashape-Key': 'N76CGzg78EmshZSF5CRPvHI8T6mpp1RnzVIjsn7bBk0CjlAu26',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            console.log(response.data);
            return response.data;
        });
    };
});
'use strict';

angular.module('unsplashExtention').service('weatherSvc', function ($http) {
    this.getWeather = function () {
        return $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?units=imperial&id=4047656&APPID=93491e6dadbe8a2ac36dc3e3855f670a'
        }).then(function (response) {
            var weatherObject = {};
            if (response.status === 200) {
                weatherObject.temp = response.data.main.temp;
                weatherObject.icon = response.data.weather[0].icon;
                weatherObject.desc = response.data.weather[0].description;
                weatherObject.hum = response.data.main.humidity;
                weatherObject.pressure = response.data.main.pressure;
                weatherObject.windSpeed = response.data.wind.speed;
                console.log(response);
                return weatherObject;
            }
            return "It's broken, sorry!";
        });
    };
});
//# sourceMappingURL=bundle.js.map
