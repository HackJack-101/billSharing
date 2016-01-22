'use strict';

var app = angular.module('app', ['ngRoute', 'ngMaterial', 'ngCookies', 'ngMessages',
    'app.controller.user', 'app.service.user',
    'app.controller.bill', 'app.service.bill',
    'app.controller.group', 'app.service.group',
    'app.controller.payment', 'app.service.payment',
    'app.controller.auth'
]);

app.directive('shortcuts', function () {
    return {
        templateUrl: 'template/shortcuts.html'
    };
});

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'partials/user-dashboard.html',
                    controller: 'userController'
                }).
                when('/login', {
                    templateUrl: 'partials/user-login.html',
                    controller: 'loginController'
                }).
                when('/logout', {
                    templateUrl: 'partials/user-login.html',
                    controller: 'logoutController'
                }).
                when('/register', {
                    templateUrl: 'partials/user-register.html',
                    controller: ''
                }).
                when('/activity', {
                    templateUrl: 'partials/user-activity.html',
                    controller: 'userActivityController'
                }).
                when('/bills', {
                    templateUrl: 'partials/user-bills.html',
                    controller: ''
                }).
                when('/groups', {
                    templateUrl: 'partials/user-groups.html',
                    controller: 'groupsController'
                }).
                when('/group/:id', {
                    templateUrl: 'partials/group-activity.html',
                    controller: 'groupController'
                }).
                when('/friends', {
                    templateUrl: 'partials/user-friends.html',
                    controller: 'userFriendsController'
                }).
                when('/group/', {
                    templateUrl: 'partials/group-add.html',
                    controller: 'groupController'
                }).
                when('/bill/', {
                    templateUrl: 'partials/bill-add.html',
                    controller: 'billController'
                }).
                when('/payment/', {
                    templateUrl: 'partials/user-payment.html',
                    controller: ''
                }).
                when('/friend/', {
                    templateUrl: 'partials/friend-add.html',
                    controller: 'addFriendController'
                }).
                when('/account', {
                    templateUrl: 'partials/user-account.html',
                    controller: ''
                }).
                otherwise({
                    redirectTo: "/"
                });
    }
]);
