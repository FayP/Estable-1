(function(){
  "use strict";
  var wizard = angular.module("wizard"),
  wizardStableController = function($scope, $rootScope, wizardApi){
    var onGetStableComplete = function(data){
      $scope.stable = JSON.parse(data.data.Result);
    },
    onError = function(data){
      console.log(data);
    };

    $scope.postStable = function(stable) {
      var onPostStableComplete = function(data) {
        $rootScope.user.stableName = data.config.data.stableName;
      };

      stable.stableEmail = $rootScope.user.email;

      wizardApi.postStable(stable)
      .then(onPostStableComplete, onError);
    };

    wizardApi.getStable($rootScope.user.email)
    .then(onGetStableComplete, onError);

  };
  wizard.controller("wizardStableController", ["$scope", "$rootScope", "wizardApi", wizardStableController]);
}());
