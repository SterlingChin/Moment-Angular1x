angular.module('unsplashExtention').factory('userPreferences', ['$cookies', function($cookies) {
                return {
                    setCookieData: function(settingData) {
                      settingData = JSON.stringify(settingData);
                        $cookies.put('settingKey', settingData);
                        console.log(settingData);
                    },

                            userSettings: function() {
                                var settings = $cookies.get('settingKey');
                                if (settings) {
                                    settings = JSON.parse(settings);
                                        console.log(settings);
                                    return settings;
                                }
                                return {
                                    timeOption: false,
                                    greetingOption: false,
                                    weatherOption: false,
                                    quoteOption: false,
                                    backgroundOption: false
                                };
                            }
                          };
                        }

                ]);
