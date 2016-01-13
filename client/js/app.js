'use strict';

var app = angular.module('app', ['ngRoute', 'ngMaterial']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/home.html'});
    }
]);
