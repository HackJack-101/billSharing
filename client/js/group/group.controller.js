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

groupControllers.controller('groupController', function ($scope, $cookies, $location, $routeParams, Group) {
    
    // Get logged user
    $scope.user = $cookies.getObject('user');
    if ($cookies.getObject('user'))
        $scope.user = $cookies.getObject('user');
    else
        $location.path("/login").replace();

    var id = $routeParams.id;
    Group.get(id).success(function (data) {
        $scope.group = data;
    }).error(function (data) {
        console.log('Error: ' + JSON.stringify(data));
    });

    Group.getBills(id).success(function (data) {
        $scope.bills = data;
    }).error(function (data) {
        console.log('Error: ' + JSON.stringify(data));
    });


    $scope.add = function (groupToCreate) {
        alert("hello" + JSON.stringify(groupToCreate));
        var newGroup = {name: groupToCreate.name,
                        friends: []};
        newGroup.friends.push($scope.user._id);
        Group.add(newGroup).success(function (data) {
            $scope.response = data;
            console.log('ok: ' + JSON.stringify(data));
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
    $scope.delete = function (id) {
        Group.delete(id).success(function (data) {
            $scope.response = data;
            console.log("Deleted group with id : " + id);
        })
                .error(function (data) {
                    console.log('Fail to delete group with id : ' + id + '. Error : ' + data);
                });
    };

});