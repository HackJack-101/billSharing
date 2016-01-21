'use strict';

angular.module('app.service.user', ['app'])


        .factory('User', function ($http) {
            return {
                get: function (id) {
                    return $http.get('/user/' + id);
                },
                getAll: function () {
                    return $http.get('/user/');
                },
                add: function (user) {
                    return $http.post('/user/', user);
                },
                edit: function (user) {
                    return $http.put('/user/', user);
                },
                delete: function (id) {
                    return $http.delete('/user/' + id);
                },
                login: function (data)
                {
                    return $http.post('/user/login', {email: data.email, password: data.password});
                }
            };
        });