(function(){
  "use strict";
  var wizard = angular.module("wizard"),
  wizardHorseController = function($scope, $rootScope, wizardApi) {
    var onGetHorsesComplete = function(response){
      $scope.horses = response.data;
    },
    activeRow = null,
    hideRow = function(row, form){
      if(!activeRow || !form) return;

      //saveRow(form);
      form.$cancel();
      var trimmedName = row.className.split('editing-row')[1];
      activeRow.className = trimmedName;
    };

    $scope.genders = [
      {value: 0, text: "Female"},
      {value: 1, text: "Male"}
    ];

    $scope.showRow= function(event, form){
      //remove detail from previous active row
      hideRow(activeRow, form);
      //reassign active row.
      activeRow = (event.target.parentElement.nodeName !== "TR") ? event.target.parentElement.parentElement : event.target.parentElement;
      form.$show();
      activeRow.className += ' editing-row';
      //display extra row.
      activeRow.nextSibling.style.display = "block";
    };

    //Save Date request
    $scope.posthorses = function() {
      var postHorsesComplete = function (response){};
      wizardApi.postData(data, "horses")
      .then(onPostHorsesComplete, onError);
    };

    if($rootScope.user.email){
      wizardApi.getData("horses", $rootScope.user.email)
        .then(onGetHorsesComplete, onError);
      }
  };

  wizard.controller("wizardHorseController", ["$scope", "$rootScope", "wizardApi", wizardHorseController]);
}());
