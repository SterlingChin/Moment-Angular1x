angular.module('unsplashExtention')
    .directive('animateDir', function() {
        return {
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
                    });

                    $('.name').on('keyUp', function() {
                        console.log($('.name').val());
                        var currentName = $('.name').val();
                        localStorage.setItem('name', currentName);
                    });
                });
            }
        };
    });
