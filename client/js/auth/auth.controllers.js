'use strict';
var authControllers = angular.module('app.controller.auth', ['app']);

authControllers.controller('loginController', function ($scope, $cookies, $location, User) {
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
                    }
                }).
                error(function (data) {
                    console.log('Error:');
                    console.log(data);
                });
    };

});

authControllers.controller('logoutController', function ($cookies, $location) {
    $cookies.remove('user');
    $location.path("/").replace();
});