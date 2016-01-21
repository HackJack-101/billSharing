'use strict';

angular.module('app.service.user', ['app'])


        .factory('User', function ($http) {
            return {
                get: function (id) {
                    return $http.get('/api/user/' + id);
                },
                getAll: function () {
                    return $http.get('/api/user/');
                },
                getGroupsByUserId: function (id) {
                    return $http.get('/api/user/' + id + '/groups');
                },
                getPayments: function (id) {
                    return $http.get('/api/user/' + id + '/payments');
                },
                getPaymentsReceived: function (id) {
                    return $http.get('/api/user/' + id + '/paymentsReceived');
                },
                getBillsPaid: function (id) {
                    return $http.get('/api/user/' + id + '/billsPaid');
                },
                add: function (user) {
                    return $http.post('/api/user/', user);
                },
                edit: function (user) {
                    return $http.put('/api/user/', user);
                },
                delete: function (id) {
                    return $http.delete('/api/user/' + id);
                },
                login: function (data)
                {
                    return $http.post('/api/user/login', {email: data.email, password: data.password});
                }
            };
        });