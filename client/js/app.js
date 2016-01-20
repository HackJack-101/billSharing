'use strict';

var app = angular.module('app', ['ngRoute', 'ngMaterial']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/home.html'});
        $routeProvider.when('/login', {templateUrl: 'partials/login.html'});
        $routeProvider.when('/register', {templateUrl: 'partials/register.html'});
        $routeProvider.when('/recentactivity', {templateUrl: 'partials/recentactivity.html'});
        $routeProvider.when('/allbills', {templateUrl: 'partials/userbills.html'});
        $routeProvider.when('/allgroups', {templateUrl: 'partials/usergroups.html'});
        $routeProvider.when('/activitygrp', {templateUrl: 'partials/activitygroup.html'});
        $routeProvider.when('/allfriends', {templateUrl: 'partials/userfriends.html'});
        $routeProvider.when('/addgroup', {templateUrl: 'partials/addgroup.html'});
        $routeProvider.when('/account', {templateUrl: 'partials/account.html'});
        $routeProvider.otherwise({
            redirectTo: "/"
        });
    }
]);
