angular.module('unsplashExtention')
    .directive('animateDir', function(userPreferences) {
//   __    _      _   _       __   _____  _   ___   _      __  
//  / /\  | |\ | | | | |\/|  / /\   | |  | | / / \ | |\ | ( (` 
// /_/--\ |_| \| |_| |_|  | /_/--\  |_|  |_| \_\_/ |_| \| _)_) 

        return {
            scope: {
                settings: "="
            },
            restrict: 'EA',
            link: function(scope, elems, attrs) {
                $(document).ready(function() {
                    $('.settings-icon').on('mouseenter', function() {
                        $('.menu-container').show(500, function() {
                            setTimeout(function() {
                                $('.menu-container').css('display', 'flex');
                                $('.menu-items').show(150);
                                $('.menu-title').show(150);
                            }, 100);

                        });
                    });

                    $('.menu-container').on('mouseleave', function() {
                        $('.menu-container').hide(500);
                        $('.menu-items').hide(100);
                        $('.menu-title').hide(100);
                        setTimeout(function() {
                            $('.menu-container').css('display', 'none');
                        }, 500);
                        userPreferences.setCookieData(scope.settings);
                    });

                    $('.console').on('click', function() {
                        $('.console').hide(300);
                    });

                    $('.bottom-center').on('mouseenter', function() {
                        $('#quoteAuthor').fadeIn(300);
                    });
                    $('.bottom-center').on('mouseleave', function() {
                        $('#quoteAuthor').fadeOut(300);
                    });

                    $('.weather').on('mouseenter', function() {
                        $('#weatherData').fadeIn(500);
                    });
                    $('.weather').on('mouseleave', function() {
                        $('#weatherData').fadeOut(500);
                    });

                    $('#hideForecast').on('click', function() {
                        $('.forecast-container').fadeOut(500);
                    });
                    $('#sevenDay').on('click', function() {
                        $('.forecast-container').fadeIn(500);
                        $('.forecast-container').css('display', 'flex');
                    });

                    $('.question-icon').on('click', function() {
                        $('.question-container').fadeIn(500);
                        $('.question-container').css('display', 'flex');
                    });
                    $('#question-hide').on('click', function(){
                      $('.question-container').fadeOut(500);
                      // $('.question-container').css('display', 'none');
                    });

                });
            }
        };
    });
