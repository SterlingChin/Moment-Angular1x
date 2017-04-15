angular.module('app').controller('mainCtrl', function ($scope, mainSvc, userPreferences) {

  //  ┌─┐┌─┐┌┬┐┌┬┐┬┌┐┌┌─┐┌─┐
  //  └─┐├┤  │  │ │││││ ┬└─┐
  //  └─┘└─┘ ┴  ┴ ┴┘└┘└─┘└─┘

  $scope.settings = userPreferences.userSettings();
  $scope.zipcode = $scope.settings.zipcode
  $scope.name = $scope.settings.userName
  console.log($scope.name)
  $scope.newUser = value => {
    ($scope.name === "enter name") ? true: false
  }

  //  ┌─┐ ┬ ┬┌─┐┌┬┐┌─┐┌─┐
  //  │─┼┐│ ││ │ │ ├┤ └─┐
  //  └─┘└└─┘└─┘ ┴ └─┘└─┘                          

  mainSvc.getQuote().then(response => {
    $scope.quoteText = response.quote;
    $scope.quoteAuthor = response.author;
  });

  //  ┬ ┬┌─┐┌─┐┌┬┐┬ ┬┌─┐┬─┐
  //  │││├┤ ├─┤ │ ├─┤├┤ ├┬┘
  //  └┴┘└─┘┴ ┴ ┴ ┴ ┴└─┘┴└─


  $scope.getWeather = zipcode => {
    mainSvc.getWeather(zipcode).then(response => {
      $scope.weather = response;
    })
    mainSvc.getForecast(zipcode).then(forecastObject => {
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
  }
  const getZip = () => {
    if ($scope.settings.zipcode !== 0) {
      $scope.getWeather($scope.settings.zipcode)
      // let myInterval = setInterval($scope.getWeather, 1000)
      return;
    } else {
      return "";
    }
  }
  getZip()

  //  ┌─┐┬─┐┌─┐┌─┐┌┬┐┬┌┐┌┌─┐
  //  │ ┬├┬┘├┤ ├┤  │ │││││ ┬
  //  └─┘┴└─└─┘└─┘ ┴ ┴┘└┘└─┘

  let greeting = () => {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    if (currentHours < 12) {
      $scope.greeting = "Good Morning";
    } else if (18 > currentHours && currentHours >= 12) {
      $scope.greeting = "Good Afternoon";
    } else {
      $scope.greeting = "Good Evening";
    }
  }
  greeting();


  //  ┌─┐┬  ┌─┐┌─┐┬┌─
  //  │  │  │ ││  ├┴┐
  //  └─┘┴─┘└─┘└─┘┴ ┴

  let updateClock = ()=>{
    let currentTime = new Date();
    let currentHours = currentTime.getHours();
    let currentMinutes = currentTime.getMinutes();
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    let timeOfDay = (currentHours < 12) ? "AM" : "PM";
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
    currentHours = (currentHours === 0) ? 12 : currentHours;
    let currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;
    document.getElementById("clock").firstChild.nodeValue = currentTimeString;
  }

  $scope.time = moment().format('h:mm A');

  $scope.todayDate = moment().format('MMM Do YYYY');
  $scope.day2 = moment().add(2, 'days').format('MMM Do');
  $scope.day3 = moment().add(3, 'days').format('MMM Do');
  $scope.day4 = moment().add(4, 'days').format('MMM Do');
  $scope.day5 = moment().add(5, 'days').format('MMM Do');
  $scope.day6 = moment().add(6, 'days').format('MMM Do');


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
