'use strict';
var authController = angular.module('app.controller.auth', ['app']);

authController.controller('loginController', function ($scope, $cookies, $location, User) {
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

authController.controller('logoutController', function ($cookies, $location) {
    $cookies.remove('user');
    $location.path("/").replace();
});