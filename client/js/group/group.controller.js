'use strict';

angular.module('app.controller.group', ['app'])

.controller('groupController', function($scope, $http, Group) {

    $scope.getAll = function() {
        Group.getAll().success(function(data) {
                $scope.groups = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.get = function(id) {
        Group.get(id).success(function(data) {
                $scope.group = data;
            })
            .error(function(data) {
                console.log('Error: ' + JSON.stringify(data));
            });
    }

    $scope.getBills = function(id) {
        Group.getBills(id).success(function(data) {
                $scope.groupBills = data;
            })
            .error(function(data) {
                console.log('Error: ' + JSON.stringify(data));
            });
    }

    $scope.add = function(group) {
        Group.add(group).success(function(data) {
                $scope.response = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.edit = function(group) {
        Group.edit(group).success(function(data) {
                $scope.response = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.delete = function(id) {
        Group.delete(id).success(function(data) {
                $scope.response = data;
                console.log("Deleted group with id : " + id);
            })
            .error(function(data) {
                console.log('Fail to delete group with id : ' + id + '. Error : ' + data);
            });
    };

});