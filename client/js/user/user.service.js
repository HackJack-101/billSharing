'use strict';

angular.module('app.service.user', ['app'])


        .factory('User', function ($http) {
            return {
                get: function (id) {
                    return $http.get('/api/user/' + id);
                },
                getByEmail: function (data) {
                    return $http.post('/api/user/email', {email: data});
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
                    return $http.put('/api/user/' + user._id, user);
                },
                editFriends: function (user, friends) {
                    var serialize = JSON.stringify({friends: friends});
                    return $http({
                        method: 'PUT',
                        url: '/api/user/' + user,
                        headers: {'Content-Type': "application/json"},
                        data: serialize
                    });
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