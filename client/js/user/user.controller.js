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

userController.controller('userController', function ($scope, $cookies, $location, User, Group) {

// Get logged user
    $scope.user = $cookies.getObject('user');
    if ($cookies.getObject('user'))
        $scope.user = $cookies.getObject('user');
    else
        $location.path("/login").replace();
    $scope.bills = [];
    $scope.friends = {};
    $scope.debts = 0;

    var id = $scope.user._id;

    // Get user groups
    User.getGroupsByUserId(id).success(function (data) {
        $scope.groups = data;
    }).then(function () {
        for (var i = 0; i < $scope.groups.length; i++)
        {
            var groupID = $scope.groups[i]._id;
            var friends = $scope.groups[i].friends;
            for (var k = 0; k < friends.length; k++)
            {
                var friendID = friends[k];
                if (!$scope.friends[friendID])
                {
                    $scope.friends[friendID] = {id: friendID, value: 0, lastName: "", firstName: ""};
                    User.get(friendID).success(function (data) {
                        $scope.friends[data._id].firstName = data.firstName;
                        $scope.friends[data._id].lastName = data.lastName;
                    });
                }
            }
            Group.getBills(groupID).success(function (data) {
                for (var j = 0; j < data.length; j++)
                {
                    var sum = data[j].value / friends.length;
                    var owner = data[j].owner;
                    for (var l = 0; l < friends.length; l++)
                    {
                        var friendID = friends[l];
                        if (friendID != owner)
                            $scope.friends[friendID].value += sum;
                    }
                }
            });
        }
    });

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
        }).error(function (data) {
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

    $scope.getFriendsByUserId = function (id) {

        User.get(id).success(function (data) {
            $scope.friends = [];

            // for each id in friends, it will get more information than only "id"
            for (var i = 0; i < data.friends.length; i++) {
                User.get(data._id).success(function (data2) {
                    $scope.friends.push(data2);
                });
            }
        })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    $scope.addFriend = function () {

        alert("id : " + $scope.user._id + " friend : " + $scope.friend);
        // $scope.friend = 

    };

});