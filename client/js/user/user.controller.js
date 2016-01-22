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
        data = data.data;
        for (var i = 0; i < data.length; i++)
        {
            data[i].type = "Remboursement effectué";
            data[i].name = data[i].description;
            $scope.activities.push(data[i]);
        }
    }).then(function () {
        User.getPaymentsReceived(id).success(function (data) {
            for (var i = 0; i < data.length; i++)
            {
                data[i].type = "Remboursement reçu";
                data[i].name = data[i].description;
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

userController.controller('userPaymentsController', function ($scope, $cookies, $location, User) {

// Get logged user
    $scope.user = $cookies.getObject('user');
    if ($cookies.getObject('user'))
        $scope.user = $cookies.getObject('user');
    else
        $location.path("/login").replace();

    var id = $scope.user._id;
    $scope.activities = [];

    User.getPayments(id).then(function (data) {
        data = data.data;
        for (var i = 0; i < data.length; i++)
        {
            data[i].type = "Remboursement effectué";
            data[i].name = data[i].description;
            $scope.activities.push(data[i]);
        }
    });

});

userController.controller('addFriendController', function ($scope, $cookies, $location, User) {

    // Get logged user
    $scope.user = $cookies.getObject('user');
    if ($cookies.getObject('user'))
        $scope.user = $cookies.getObject('user');
    else
        $location.path("/login").replace();


    $scope.hasError = false;
    $scope.success = false;
    $scope.alreadyAdded = false;
    $scope.lastfriend = "";
    $scope.addFriend = function () {
        User.getByEmail($scope.email).success(function (data) {
            var firstName = data.firstName;
            var lastName = data.lastName;
            $scope.lastfriend = firstName + ' ' + lastName;

            var userToGet;
            User.get($scope.user._id).success(function (u) {
                userToGet = u;


                if (userToGet.friends.indexOf(data._id) < 0) {
                    userToGet.friends.push(data._id);
                    User.editFriends(userToGet._id, userToGet.friends).success(function (data) {
                        $scope.success = true;
                    }).error(function (data) {
                        console.log('Error: ' + JSON.stringify(data));
                        $scope.hasError = true;
                    });
                } else {
                    $scope.alreadyAdded = true;
                }

            }).error(function (data) {
                console.log('Fail to add friend. Error : ' + JSON.stringify(data));
                $scope.hasError = true;
            });

        }).error(function (u) {
            console.log("Error :" + u);
        });
    };
});

userController.controller('userFriendsController', function ($scope, $cookies, $location, User) {

// Get logged user
    $scope.user = $cookies.getObject('user');
    if ($cookies.getObject('user'))
        $scope.user = $cookies.getObject('user');
    else
        $location.path("/login").replace();


    $scope.friends = [];
    for (var i = 0; i < $scope.user.friends.length; i++) {
        User.get($scope.user.friends[i]).success(function (data) {
            $scope.friends.push(data);

        }).error(function (data) {
            console.log('Error: ' + data);
        });
    }
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
    $scope.user.value = 0;

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
                if (!$scope.friends[friendID] && friendID != $scope.user._id)
                {
                    $scope.friends[friendID] = {id: friendID, value: 0, lastName: "", firstName: ""};
                    User.get(friendID).success(function (data) {
                        $scope.friends[data._id].firstName = data.firstName;
                        $scope.friends[data._id].lastName = data.lastName;
                    });
                }
            }
            Group.getBills(groupID).success(function (data) {
                var sum = 0;
                for (var j = 0; j < data.length; j++)
                {
                    sum += data[j].value;
                    var owner = data[j].owner;
                    if (owner == $scope.user._id)
                        $scope.user.value += data[j].value;
                    else
                        $scope.friends[owner].value += data[j].value;
                }
                var avg = sum / friends.length;
                for (var l = 0; l < friends.length; l++)
                {
                    var friendID = friends[l];
                    if (friendID == $scope.user._id)
                        $scope.user.value -= avg;
                    else
                        $scope.friends[friendID].value -= avg;
                }

            });
        }
    });


    $scope.deficit = function (a) {
        return -Math.min(a, 0);
    };

    $scope.excess = function (a) {
        return Math.max(a, 0);
    };

    $scope.abs = function (a) {
        return Math.abs(a);
    };

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
        var userToGet;
        User.get($scope.user._id).success(function (u) {
            userToGet = u;
            // for each id in friends, it will get more information than only "id"
            for (var i = 0; i < userToGet.friends.length; i++) {


                User.get(userToGet.friends[i]).success(function (data) {
                    $scope.friends.push(data);

                }).error(function (data) {
                    console.log('Error: ' + data);
                });
            }
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };

});