'use strict';

angular.module('app.service.bill', ['app'])


    .factory('Bill', function($http) {
        return {
            get : function(id) {
                return $http.get('/bill/' + id);
            },
            getAll : function() {
                return $http.get('/bill/');
            },           
            add : function(bill) {
                return $http.post('/bill/', bill);
            },
            edit : function(bill) {
                return $http.put('/bill/', bill);
            },
            delete : function(id) {
                return $http.delete('/bill/' + id);
            }
        }
    });