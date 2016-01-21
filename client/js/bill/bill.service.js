'use strict';

angular.module('app.service.bill', ['app'])


    .factory('Bill', function($http) {
        return {
            get : function(id) {
                return $http.get('/api/bill/' + id);
            },
            getAll : function() {
                return $http.get('/api/bill/');
            },           
            add : function(bill) {
                return $http.post('/api/bill/', bill);
            },
            edit : function(bill) {
                return $http.put('/api/bill/', bill);
            },
            delete : function(id) {
                return $http.delete('/api/bill/' + id);
            }
        }
    });