'use strict';

angular.module('app.service.payment', ['app'])


    .factory('Payment', function($http) {
        return {
            get : function(id) {
                return $http.get('/payment/' + id);
            },
            getAll : function() {
                return $http.get('/payment/');
            },           
            add : function(payment) {
                return $http.post('/payment/', payment);
            },
            edit : function(payment) {
                return $http.put('/payment/', payment);
            },
            delete : function(id) {
                return $http.delete('/payment/' + id);
            }
        }
    });