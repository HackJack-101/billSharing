'use strict';

angular.module('app.service.payment', ['app'])


        .factory('Payment', function ($http) {
            return {
                get: function (id) {
                    return $http.get('/api/payment/' + id);
                },
                getAll: function () {
                    return $http.get('/api/payment/');
                },
                add: function (payment) {
                    return $http.post('/api/payment/', payment);
                },
                edit: function (payment) {
                    return $http.put('/api/payment/', payment);
                },
                delete: function (id) {
                    return $http.delete('/api/payment/' + id);
                }
            }
        });