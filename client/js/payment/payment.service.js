'use strict';

angular.module('app.service.payement', ['app'])


    .factory('Payement', function($http) {
        return {
            get : function(id) {
                return $http.get('/payement/' + id);
            },
            getAll : function() {
                return $http.get('/payement/');
            },           
            add : function(payement) {
                return $http.post('/payement/', payement);
            },
            edit : function(payement) {
                return $http.put('/payement/', payement);
            },
            delete : function(id) {
                return $http.delete('/payement/' + id);
            }
        }
    });