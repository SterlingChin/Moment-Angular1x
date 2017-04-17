"use strict";

angular.module('app', ["ngCookies"]);

//      _            _ _                  _     _                            
//  ___| |_ ___ _ __| (_)_ __   __ _  ___| |__ (_)_ __    ___ ___  _ __ ___  
// / __| __/ _ \ '__| | | '_ \ / _` |/ __| '_ \| | '_ \  / __/ _ \| '_ ` _ \ 
// \__ \ ||  __/ |  | | | | | | (_| | (__| | | | | | | || (_| (_) | | | | | |
// |___/\__\___|_|  |_|_|_| |_|\__, |\___|_| |_|_|_| |_(_)___\___/|_| |_| |_|
//                             |___/                                  

//Ogre
//Broadway KB
//JS Stick Letters
//Calvin S
"use strict";

//  ┌─┐┬  ┌─┐┌─┐┬┌─
//  │  │  │ ││  ├┴┐
//  └─┘┴─┘└─┘└─┘┴ ┴

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

angular.module('app').controller('mainCtrl', function ($scope, mainSvc, userPreferences) {

  //  ┌─┐┌─┐┌┬┐┌┬┐┬┌┐┌┌─┐┌─┐
  //  └─┐├┤  │  │ │││││ ┬└─┐
  //  └─┘└─┘ ┴  ┴ ┴┘└┘└─┘└─┘

  $scope.settings = userPreferences.userSettings();
  $scope.zipcode = $scope.settings.zipcode;
  $scope.name = $scope.settings.userName;
  console.log($scope.name);
  // $scope.newUser = value => {
  //   ($scope.name === "enter name") ? true: false
  // }

  //  ┌─┐┬  ┌─┐┌─┐┬┌─
  //  │  │  │ ││  ├┴┐
  //  └─┘┴─┘└─┘└─┘┴ ┴

  var updateClock = $scope.time = moment().format('h:mm A');

  $scope.todayDate = moment().format('MMM Do YYYY');

  var day1 = moment().add(1, 'days').format('MMM Do');
  var day2 = moment().add(2, 'days').format('MMM Do');
  var day3 = moment().add(3, 'days').format('MMM Do');
  var day4 = moment().add(4, 'days').format('MMM Do');
  var day5 = moment().add(5, 'days').format('MMM Do');
  var day6 = moment().add(6, 'days').format('MMM Do');

  var timeConverter = moment(1492887600000).format("MMM Do");
  console.log(timeConverter);
  // let calendar = [day1, day2, day3, day4, day5, day6]
  // console.log(calendar)

  //  ┌─┐ ┬ ┬┌─┐┌┬┐┌─┐┌─┐
  //  │─┼┐│ ││ │ │ ├┤ └─┐
  //  └─┘└└─┘└─┘ ┴ └─┘└─┘                          

  mainSvc.getQuote().then(function (response) {
    $scope.quoteText = response.quote;
    $scope.quoteAuthor = response.author;
  });

  //  ┬ ┬┌─┐┌─┐┌┬┐┬ ┬┌─┐┬─┐
  //  │││├┤ ├─┤ │ ├─┤├┤ ├┬┘
  //  └┴┘└─┘┴ ┴ ┴ ┴ ┴└─┘┴└─


  $scope.getWeather = function (zipcode) {
    mainSvc.getWeather(zipcode).then(function (response) {
      $scope.weather = response;
    });
    mainSvc.getForecast(zipcode).then(function (response) {
      console.log(response);
      var list = response;
      for (var i = 0; i < list.length; i++) {
        list[i].dt = moment(Number(list[i].dt.toString() + '000')).format('MMM Do');
      }
      $scope.forecast = response;
      console.log($scope.forecast);
    });
  };
  var getZip = function getZip() {
    if ($scope.settings.zipcode !== 0) {
      $scope.getWeather($scope.settings.zipcode);
      // let myInterval = setInterval($scope.getWeather, 1000)
      return;
    } else {
      return "";
    }
  };
  getZip();

  //  ┌─┐┬─┐┌─┐┌─┐┌┬┐┬┌┐┌┌─┐
  //  │ ┬├┬┘├┤ ├┤  │ │││││ ┬
  //  └─┘┴└─└─┘└─┘ ┴ ┴┘└┘└─┘

  var greeting = function greeting() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    if (currentHours < 12) {
      $scope.greeting = "Good Morning";
    } else if (18 > currentHours && currentHours >= 12) {
      $scope.greeting = "Good Afternoon";
    } else {
      $scope.greeting = "Good Evening";
    }
  };
  greeting();

  //  ┬ ┬┌─┐┌┬┐┌─┐┬ ┬┌─┐┌─┐
  //  │││├─┤ │ │  ├─┤├┤ └─┐
  //  └┴┘┴ ┴ ┴ └─┘┴ ┴└─┘└─┘

  $scope.$watch('name', function () {
    if ($scope.name === "my name is Steve") {
      $('.console').show(300);
      $('.console').css('display', 'flex');
    }
  });
});
'use strict';

angular.module('app').service('mainSvc', function ($http, userPreferences) {
  var BASE_URL1 = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';
  var BASE_URL2 = 'http://api.openweathermap.org/data/2.5/forecast/daily?zip=';
  var APP_ID = '&APPID=' + config.appSecret;

  this.getWeather = function (zip) {
    return $http({
      method: 'GET',
      url: BASE_URL1 + zip + APP_ID
    }).then(function (response) {
      if (response.status === 200) {
        return response.data;
      }
      return "It's broken, sorry!";
    });
  };

  this.getForecast = function (zip) {
    return $http({
      method: 'GET',
      url: BASE_URL2 + zip + '&units=imperial&cnt=7' + APP_ID
    }).then(function (response) {
      var data = response.data.list;
      if (response.status === 200) {
        console.log(response.data);
        return data;
      }
      return "It's broken, sorry!";
    });
  };

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
      return response.data;
    });
  };
});
'use strict';

angular.module('app').factory('userPreferences', ['$cookies', function ($cookies) {
  //  ┬ ┬┌─┐┌─┐┬─┐  ┌─┐┬─┐┌─┐┌─┐┌─┐
  //  │ │└─┐├┤ ├┬┘  ├─┘├┬┘├┤ ├┤ └─┐
  //  └─┘└─┘└─┘┴└─  ┴  ┴└─└─┘└  └─┘
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
        userName: "enter name",
        zipcode: 0,
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

angular.module('app').directive('animateDir', function (userPreferences) {
  //               _                 _   _                 
  //    __ _ _ __ (_)_ __ ___   __ _| |_(_) ___  _ __  ___ 
  //   / _` | '_ \| | '_ ` _ \ / _` | __| |/ _ \| '_ \/ __|
  //  | (_| | | | | | | | | | | (_| | |_| | (_) | | | \__ \
  //   \__,_|_| |_|_|_| |_| |_|\__,_|\__|_|\___/|_| |_|___/
  //                                                                                                   
  return {
    scope: {
      settings: "="
    },
    restrict: 'EA',
    link: function link(scope, elems, attrs) {
      $(document).ready(function () {
        //  ┌─┐┌─┐┌┬┐┌┬┐┬┌┐┌┌─┐┌─┐
        //  └─┐├┤  │  │ │││││ ┬└─┐
        //  └─┘└─┘ ┴  ┴ ┴┘└┘└─┘└─┘
        $('.settings-icon').on('mouseenter', function () {
          $('#menu').fadeIn(300);
        });

        $('#menu').on('mouseleave', function () {
          $('#menu').fadeOut(300);
          userPreferences.setCookieData(scope.settings);
        });
        //  ┌─┐ ┬ ┬┌─┐┌┬┐┌─┐┌─┐
        //  │─┼┐│ ││ │ │ ├┤ └─┐
        //  └─┘└└─┘└─┘ ┴ └─┘└─┘ 
        $('.bottom-center').on('mouseenter', function () {
          $('#quoteAuthor').fadeIn(300);
        });
        $('.bottom-center').on('mouseleave', function () {
          $('#quoteAuthor').fadeOut(300);
        });
        //  ┬ ┬┌─┐┌─┐┌┬┐┬ ┬┌─┐┬─┐
        //  │││├┤ ├─┤ │ ├─┤├┤ ├┬┘
        //  └┴┘└─┘┴ ┴ ┴ ┴ ┴└─┘┴└─
        $('.weather').on('mouseenter', function () {
          $('#weatherData').fadeIn(500);
        });
        $('.weather').on('mouseleave', function () {
          $('#weatherData').fadeOut(500);
        });

        $('#hideForecast').on('click', function () {
          $('.forecast-main').fadeOut(500);
        });
        $('#sevenDay').on('click', function () {
          $('.forecast-main').fadeIn(500);
          $('.forecast-main').css('display', 'flex');
        });

        $('.question-icon').on('click', function () {
          $('.question-container').fadeIn(500);
          $('.question-container').css('display', 'flex');
        });
        $('#question-hide').on('click', function () {
          $('.question-container').fadeOut(500);
        });
        //  ┬ ┬┌─┐┬  ┌─┐
        //  ├─┤├┤ │  ├─┘
        //  ┴ ┴└─┘┴─┘┴  
        $('.console').on('click', function () {
          $('.console').hide(300);
        });
      });
    }
  };
});
'use strict';

angular.module('app').directive('clockDir', function () {
    return {
        restrict: 'EA',
        templateUrl: './js/directives/clock.html'
    };
});
'use strict';

angular.module('app').directive('forecastDir', function () {
    return {
        restrict: 'EA',
        templateUrl: './js/directives/forecast.html'
    };
});
'use strict';

angular.module('app').directive('quoteDir', function () {
    return {
        restrict: "EA",
        templateUrl: './js/directives/quote.html'
    };
});
'use strict';

angular.module('app').directive('settingsDir', function () {
    return {
        restrict: 'EA',
        templateUrl: "./js/directives/settings.html"
    };
});
'use strict';

angular.module('app').directive('weatherDir', function () {
    return {
        restrict: 'EA',
        templateUrl: './js/directives/weather.html'
    };
});
'use strict';

angular.module('app').directive('welcomeDir', function () {
    return {
        restrict: 'EA',
        templateUrl: './js/directives/welcome.html'
    };
});
//# sourceMappingURL=bundle.js.map
