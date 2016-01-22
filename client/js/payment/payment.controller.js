'use strict';

angular.module('app.controller.payment', ['app'])

.controller('paymentController', function($scope, Payment) {

    $scope.getAll = function() {
        Payment.getAll().success(function(data) {
                $scope.payments = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.get = function(id) {
        Payment.get(id).success(function(data) {
                $scope.payment = data;
            })
            .error(function(data) {
                console.log('Error: ' + JSON.stringify(data));
            });
    }

    $scope.add = function(payment) {
        Payment.add(payment).success(function(data) {
                $scope.response = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.edit = function(payment) {
        Payment.edit(payment).success(function(data) {
                $scope.response = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.delete = function(id) {
        Payment.delete(id).success(function(data) {
                $scope.response = data;
                console.log("Deleted payment with id : " + id);
            })
            .error(function(data) {
                console.log('Fail to delete payment with id : ' + id + '. Error : ' + data);
            });
    };

});