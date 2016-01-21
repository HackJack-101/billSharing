'use strict';

angular.module('app.service.group', ['app'])


    .factory('Group', function($http) {
        return {
            get : function(id) {
                return $http.get('/group/' + id);
            },
            getAll : function() {
                return $http.get('/group/');
            },
            getBills : function(id) {
                return $http.get('/group/' + id + '/bills');
            },           
            add : function(group) {
                return $http.post('/group/', group);
            },
            edit : function(group) {
                return $http.put('/group/', group);
            },
            delete : function(id) {
                return $http.delete('/group/' + id);
            }
        }
    });