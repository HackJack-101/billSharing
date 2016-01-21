'use strict';

angular.module('app.controller.auth', ['app'])

        .controller('authController', function ($scope, $cookies, $location, User) {
            $scope.hasError = false;
            $scope.login = function () {
                User.login($scope.login).
                        success(function (data) {
                            if (data != null)
                            {
                                $cookies.remove('user');
                                $cookies.putObject('user', data);
                                $location.path("/").replace();
                            } else
                            {
                                $scope.hasError = true;
                                setTimeout(function () {
                                    $scope.$apply(function () {
                                        $scope.hasError = false;
                                    });
                                }, 1000);
                            }
                        }).
                        error(function (data) {
                            console.log('Error:');
                            console.log(data);
                        });
            };

        });