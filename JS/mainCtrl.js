angular.module('app').controller('mainCtrl', function ($scope, mainSvc, userPreferences) {

  //  ┌─┐┌─┐┌┬┐┌┬┐┬┌┐┌┌─┐┌─┐
  //  └─┐├┤  │  │ │││││ ┬└─┐
  //  └─┘└─┘ ┴  ┴ ┴┘└┘└─┘└─┘

  $scope.settings = userPreferences.userSettings();
  $scope.zipcode = $scope.settings.zipcode
  $scope.name = $scope.settings.userName
  console.log($scope.name)
  // $scope.newUser = value => {
  //   ($scope.name === "enter name") ? true: false
  // }

  //  ┌─┐┬  ┌─┐┌─┐┬┌─
  //  │  │  │ ││  ├┴┐
  //  └─┘┴─┘└─┘└─┘┴ ┴

  let updateClock = $scope.time = moment().format('h:mm A')

  $scope.todayDate = moment().format('MMM Do YYYY');

  let day1 = moment().add(1, 'days').format('MMM Do');
  let day2 = moment().add(2, 'days').format('MMM Do');
  let day3 = moment().add(3, 'days').format('MMM Do');
  let day4 = moment().add(4, 'days').format('MMM Do');
  let day5 = moment().add(5, 'days').format('MMM Do');
  let day6 = moment().add(6, 'days').format('MMM Do');

  let timeConverter = moment(1492887600000).format("MMM Do")
  console.log(timeConverter)
  // let calendar = [day1, day2, day3, day4, day5, day6]
  // console.log(calendar)

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
    mainSvc.getForecast(zipcode).then(response => {
      console.log(response)
      let list = response
      for(let i = 0; i< list.length;i++){
        list[i].dt = moment(Number(list[i].dt.toString() + '000')).format('MMM Do')
      }
      $scope.forecast = response
      console.log($scope.forecast)

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
