'use strict';

angular.module('app.controller.user', ['app'])

.controller('userController', function($scope, $http, User) {

    $scope.getAll = function() {
        User.getAll().success(function(data) {
                $scope.users = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.get = function(id) {
        User.get(id).success(function(data) {
                $scope.user = data;
            })
            .error(function(data) {
                console.log('Error: ' + JSON.stringify(data));
            });
    }

    $scope.add = function(user) {
        User.add(user).success(function(data) {
                $scope.response = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.edit = function(user) {
        User.edit(user).success(function(data) {
                $scope.response = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.delete = function(id) {
        User.delete(id).success(function(data) {
                $scope.response = data;
                console.log("Deleted user with id : " + id);
            })
            .error(function(data) {
                console.log('Fail to delete user with id : ' + id + '. Error : ' + data);
            });
    };

});