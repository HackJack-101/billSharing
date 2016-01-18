'use strict';

var app = angular.module('app', ['ngRoute', 'ngMaterial']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/home.html'});
        $routeProvider.when('/recentactivity', {templateUrl: 'partials/recentactivity.html'});
        $routeProvider.when('/allbills', {templateUrl: 'partials/userbills.html'});
        $routeProvider.when('/login', {templateUrl: 'partials/login.html'});
        $routeProvider.when('/register', {templateUrl: 'partials/register.html'});
        $routeProvider.when('/addgroup', {templateUrl: 'partials/addgroup.html'});
        $routeProvider.otherwise({
            redirectTo: "/"
        });
    }
]);
