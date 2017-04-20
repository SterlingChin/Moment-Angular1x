angular.module('app')
  .directive('animateDir', function (userPreferences) {
    // ┌─┐┌┐┌┬┌┬┐┌─┐┌┬┐┬┌─┐┌┐┌┌─┐
    // ├─┤│││││││├─┤ │ ││ ││││└─┐
    // ┴ ┴┘└┘┴┴ ┴┴ ┴ ┴ ┴└─┘┘└┘└─┘
    return {
      scope: {
        settings: "="
      },
      restrict: 'EA',
      link: function (scope, elems, attrs) {
        $(document).ready(function () {
          //  ┌─┐┌─┐┌┬┐┌┬┐┬┌┐┌┌─┐┌─┐
          //  └─┐├┤  │  │ │││││ ┬└─┐
          //  └─┘└─┘ ┴  ┴ ┴┘└┘└─┘└─┘
          $('.settings-icon').on('mouseenter', function () {
            console.log('settings')
            $('#menu').fadeIn(300)
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
            console.log('quotes')
          });
          $('.bottom-center').on('mouseleave', function () {
            $('#quoteAuthor').fadeOut(300);
          });
          //  ┬ ┬┌─┐┌─┐┌┬┐┬ ┬┌─┐┬─┐
          //  │││├┤ ├─┤ │ ├─┤├┤ ├┬┘
          //  └┴┘└─┘┴ ┴ ┴ ┴ ┴└─┘┴└─
          $('.weather').on('mouseenter', function () {
            $('#weatherData').fadeIn(500);
            console.log('weather')
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

          // $('.question-icon').on('click', function () {
          //   $('.question-container').fadeIn(500);
          //   $('.question-container').css('display', 'flex');
          // });
          // $('#question-hide').on('click', function () {
          //   $('.question-container').fadeOut(500);
          // });

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
