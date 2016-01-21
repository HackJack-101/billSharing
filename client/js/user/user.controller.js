'use strict';

angular.module('app.controller.user', ['app'])

        .controller('userController', function ($scope, $cookies, $location, User) {

// Get logged user
            $scope.user = $cookies.getObject('user');
            if ($cookies.getObject('user'))
                $scope.user = $cookies.getObject('user');
            else
                $location.path("/login").replace();
            
            $scope.getAll = function () {
                User.getAll().success(function (data) {
                    $scope.users = data;
                })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
            };

            $scope.get = function (id) {
                User.get(id).success(function (data) {
                    $scope.user = data;
                })
                        .error(function (data) {
                            console.log('Error: ' + JSON.stringify(data));
                        });
            };

            $scope.getPaymentsByUserId = function (id) {
                User.getPaymentsByUserId(id).success(function (data) {
                    $scope.groups = data;
                })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
            };

            $scope.getFriendsByUserId = function (id) {

                User.get(id).success(function (data) {
                $scope.friends = [];

                    // for each id in friends, it will get more information than only "id"
                    for (var i = 0; i < data.friends.length; i++) {
                        User.get(data._id).success(function (data2) {
                            $scope.friends.push(data2);
                        });
                    }
                })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
            };

            $scope.add = function (user) {
                User.add(user).success(function (data) {
                    $scope.response = data;
                })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
            };

            $scope.edit = function (user) {
                User.edit(user).success(function (data) {
                    $scope.response = data;
                })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
            };

            $scope.delete = function (id) {
                User.delete(id).success(function (data) {
                    $scope.response = data;
                    console.log("Deleted user with id : " + id);
                })
                        .error(function (data) {
                            console.log('Fail to delete user with id : ' + id + '. Error : ' + data);
                        });
            };

            $scope.addFriend = function ()
            {

                alert("id : "+$scope.user._id +" friend : "+$scope.friend);
                // $scope.friend = 

            };

        });