'use strict';

angular.module('app.controller.payement', ['app'])

.controller('payementController', function($scope, Payement) {

    $scope.getAll = function() {
        Payement.getAll().success(function(data) {
                $scope.payements = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.get = function(id) {
        Payement.get(id).success(function(data) {
                $scope.payement = data;
            })
            .error(function(data) {
                console.log('Error: ' + JSON.stringify(data));
            });
    }

    $scope.add = function(payement) {
        Payement.add(payement).success(function(data) {
                $scope.response = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.edit = function(payement) {
        Payement.edit(payement).success(function(data) {
                $scope.response = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.delete = function(id) {
        Payement.delete(id).success(function(data) {
                $scope.response = data;
                console.log("Deleted payement with id : " + id);
            })
            .error(function(data) {
                console.log('Fail to delete payement with id : ' + id + '. Error : ' + data);
            });
    };

});