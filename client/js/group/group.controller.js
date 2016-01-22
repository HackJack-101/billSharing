'use strict';

var groupControllers = angular.module('app.controller.group', ['app']);



groupControllers.controller('groupsController', function ($scope, $cookies, $location, User) {
    // Get logged user
    $scope.user = $cookies.getObject('user');
    if ($cookies.getObject('user'))
        $scope.user = $cookies.getObject('user');
    else
        $location.path("/login").replace();

    // Get user groups
    User.getGroupsByUserId($scope.user._id).success(function (data) {
        $scope.groups = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
});

groupControllers.controller('groupController', function ($scope, $cookies, $location, $routeParams, Group, User) {

    $scope.group = {};
    $scope.friends = [];
    $scope.bills = [];
    $scope.payments = [];
    // Get logged user
    $scope.user = $cookies.getObject('user');
    if ($cookies.getObject('user'))
        $scope.user = $cookies.getObject('user');
    else
        $location.path("/login").replace();

    var id = $routeParams.id;
    Group.get(id).success(function (data) {
        $scope.group = data;
        for (var i = 0; i < $scope.group.friends.length; i++) {
            User.get($scope.group.friends[i]).success(function (data) {
                $scope.friends.push(data);

            }).error(function (data) {
                console.log('Error: ' + data);
            });
        }
    }).error(function (data) {
        console.log('Error: ' + JSON.stringify(data));
    });

    Group.getBills(id).success(function (data) {
        $scope.bills = data;
        for (var i = 0; i < data.length; i++)
        {
            User.get(data[i].owner).success(function (data) {
                for (var j = 0; j < $scope.bills.length; j++)
                    if ($scope.bills[j].owner == data._id)
                        $scope.bills[j].owner = data.firstName + ' ' + data.lastName;
            });
        }
    }).error(function (data) {
        console.log('Error: ' + JSON.stringify(data));
    });

    Group.getPayments(id).success(function (data) {
        $scope.payments = data;
        for (var i = 0; i < data.length; i++)
        {
            User.get(data[i].to).success(function (data) {
                for (var j = 0; j < $scope.payments.length; j++)
                {
                    if ($scope.payments[j].to == data._id)
                        $scope.payments[j].to = data.firstName + ' ' + data.lastName;
                    else if ($scope.payments[j].from == data._id)
                        $scope.payments[j].from = data.firstName + ' ' + data.lastName;
                }
            });
            User.get(data[i].from).success(function (data) {
                for (var j = 0; j < $scope.payments.length; j++)
                {
                    if ($scope.payments[j].to == data._id)
                        $scope.payments[j].to = data.firstName + ' ' + data.lastName;
                    else if ($scope.payments[j].from == data._id)
                        $scope.payments[j].from = data.firstName + ' ' + data.lastName;
                }
            });
        }
    }).error(function (data) {
        console.log('Error: ' + JSON.stringify(data));
    });

    $scope.add = function (groupToCreate) {
        var newGroup = {name: groupToCreate.name,
            friends: []};
        newGroup.friends.push($scope.user._id);
        Group.add(newGroup).success(function (data) {
            $scope.response = data;
            console.log('ok: ' + JSON.stringify(data));
            $location.path("/groups").replace();

        })
                .error(function (data) {
                    console.log('Error: ' + JSON.stringify(data));
                });
    };

    $scope.edit = function (group) {
        Group.edit(group).success(function (data) {
            $scope.response = data;
        })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };
    
    $scope.delete = function () {
        Group.delete($scope.group._id).success(function (data) {
            $scope.response = data;
            $location.path("/groups").replace();
            console.log("Deleted group with id : " + id);
        })
                .error(function (data) {
                    console.log('Fail to delete group with id : ' + id + '. Error : ' + data);
                });
    };
    
    $scope.autocompletes = [];
    $scope.addAutocomplete = function () {
      $scope.autocompletes.push({
         oneMore: '',
      });
	};
    $scope.addAutocomplete();

});