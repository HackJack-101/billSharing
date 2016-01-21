'use strict';

var app = angular.module('app', ['ngRoute', 'ngMaterial', 'ngCookies', 'ngMessages',
    'app.controller.user', 'app.service.user',
    'app.controller.bill', 'app.service.bill',
    'app.controller.group', 'app.service.group',
    'app.controller.payment', 'app.service.payment',
    'app.controller.auth'
]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'partials/home.html',
                    controller: ''
                }).
                when('/login', {
                    templateUrl: 'partials/login.html',
                    controller: 'authController'
                }).
                when('/register', {
                    templateUrl: 'partials/register.html',
                    controller: ''
                }).
                when('/recentactivity', {
                    templateUrl: 'partials/recentactivity.html',
                    controller: ''
                }).
                when('/allbills', {
                    templateUrl: 'partials/userbills.html',
                    controller: ''
                }).
                when('/allgroups', {
                    templateUrl: 'partials/usergroups.html',
                    controller: ''
                }).
                when('/activitygrp', {
                    templateUrl: 'partials/activitygroup.html',
                    controller: ''
                }).
                when('/allfriends', {
                    templateUrl: 'partials/userfriends.html',
                    controller: ''
                }).
                when('/addgroup', {
                    templateUrl: 'partials/addgroup.html',
                    controller: ''
                }).
                when('/addbill', {
                    templateUrl: 'partials/addbill.html',
                    controller: ''
                }).
                when('/addfriend', {
                    templateUrl: 'partials/addfriend.html',
                    controller: ''
                }).
                when('/account', {
                    templateUrl: 'partials/account.html',
                    controller: ''
                }).
                otherwise({
                    redirectTo: "/"
                });
    }
]);
