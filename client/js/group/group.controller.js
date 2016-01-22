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




        $scope.friends = [];
        // for each id in friends, it will get more information than only "id"
        for (var i = 0; i < $scope.user.friends.length; i++) {
            User.get($scope.user.friends[i]).success(function (data) {
                $scope.friends.push(data);

            }).error(function (data) {
                console.log('Error: ' + data);
            });
        }

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