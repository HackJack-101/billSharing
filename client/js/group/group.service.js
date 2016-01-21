'use strict';

angular.module('app.service.group', ['app'])


    .factory('Group', function($http) {
        return {
            get : function(id) {
                return $http.get('/api/group/' + id);
            },
            getAll : function() {
                return $http.get('/api/group/');
            },
            getBills : function(id) {
                return $http.get('/api/group/' + id + '/bills');
            },           
            add : function(group) {
                return $http.post('/api/group/', group);
            },
            edit : function(group) {
                return $http.put('/api/group/', group);
            },
            delete : function(id) {
                return $http.delete('/api/group/' + id);
            }
        }
    });