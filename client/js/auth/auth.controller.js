'use strict';

angular.module('app.controller.auth', ['app'])

        .controller('authController', function ($scope, $cookies, $location, User) {

            $scope.login = function () {
                console.log('submit');
                User.login($scope.login).
                        success(function (data) {
                            console.log(data);
                            if (data != null)
                            {
                                $cookies.remove('user');
                                $cookies.putObject('user', data);
                                $location.path("/").replace;
                            }
                        }).
                        error(function (data) {
                            console.log('Error:');
                            console.log(data);
                        });
            };

        });