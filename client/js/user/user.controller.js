'use strict';


var userController = angular.module('app.controller.user', ['app']);

userController.controller('userActivityController', function ($scope, $cookies, $location, User) {

// Get logged user
    $scope.user = $cookies.getObject('user');
    if ($cookies.getObject('user'))
        $scope.user = $cookies.getObject('user');
    else
        $location.path("/login").replace();

    var id = $scope.user._id;
    $scope.activities = [];

    User.getPayments(id).then(function (data) {
        for (var i = 0; i < data.length; i++)
        {
            data[i].type = "Remboursement effectué";
            $scope.activities.push(data[i]);
        }
    }).then(function () {
        User.getPaymentsReceived(id).success(function (data) {
            for (var i = 0; i < data.length; i++)
            {
                data[i].type = "Remboursement reçu";
                $scope.activities.push(data[i]);
            }
        });
    }).then(function () {
        User.getBillsPaid(id).success(function (data) {
            for (var i = 0; i < data.length; i++)
            {
                data[i].type = "Facture payée";
                $scope.activities.push(data[i]);
            }
        });
    });

});

userController.controller('userController', function ($scope, $cookies, $location, User) {

// Get logged user
    $scope.user = $cookies.getObject('user');
    if ($cookies.getObject('user'))
        $scope.user = $cookies.getObject('user');
    else
        $location.path("/login").replace();

    $scope.getAll = function () {
        User.getAll().success(function (data) {
            $scope.users = data;
        })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };
    $scope.get = function (id) {
        User.get(id).success(function (data) {
            $scope.user = data;
        })
                .error(function (data) {
                    console.log('Error: ' + JSON.stringify(data));
                });
    };
    $scope.getPaymentsByUserId = function (id) {
        User.getPaymentsByUserId(id).success(function (data) {
            $scope.groups = data;
        })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };
    $scope.add = function (user) {
        User.add(user).success(function (data) {
            $scope.response = data;
        })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };
    $scope.edit = function (user) {
        User.edit(user).success(function (data) {
            $scope.response = data;
        })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };
    $scope.delete = function (id) {
        User.delete(id).success(function (data) {
            $scope.response = data;
            console.log("Deleted user with id : " + id);
        })
                .error(function (data) {
                    console.log('Fail to delete user with id : ' + id + '. Error : ' + data);
                });
    };

    $scope.getFriends = function () {

            $scope.friends = [];
            // for each id in friends, it will get more information than only "id"
            for (var i = 0; i < $scope.user.friends.length; i++) {
                User.get($scope.user.friends[i]).success(function (data) {
                    $scope.friends.push(data);

                }).error(function (data) {
                    console.log('Error: ' + data);
                });
            }
    };

    $scope.addFriend = function () {

            alert("id : "+$scope.user._id +" friend : "+$scope.friend);
                
            User.getByEmail($scope.friend).success(function (data) {

                $scope.user.friends.push(data);

                User.edit(user).success(function (data) {
                    $scope.response = data;
                })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });

                })
                    .error(function (data) {
                        console.log('Fail to add friend. Error : ' + data);
                    });


    };

});