﻿(function () {
    "use strict";
    var wizard = angular.module("wizard"),
    BaseController = function ($scope, $rootScope) {
        var user = {
            email : "",
            stableName: ""
        };
        
        $rootScope.user = user;
        $scope.title = "eStable Creation";
    };

    wizard.controller("BaseController", ["$scope", "$rootScope", BaseController]);
}());
