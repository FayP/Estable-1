(function () {
  "use strict";
    var wizard = angular.module("wizard"),
    wizardChargeController = function($scope, $rootScope, wizardApi) {
    	var onGetChargeComplete = function(data){
            $scope.charge = JSON.parse(data.data);
            $scope.charge.TaxDate = new Date($scope.charge.TaxDate);
    	},
      onError = function(data){
	      console.log(data);
	    },
      activeRow = null,
      activeRowform = null,
      hideRow = function(row, rowform){
        if(!activeRow || !rowform) return;
        rowform.$cancel();
        var trimmedName = row.className.split('editing-row')[1];
        activeRow.className = trimmedName;
      };

      $scope.hideRow = function(event){
        console.log('blur');
        hideRow(activeRow, this.rowform);
      };

      $scope.showRow= function(event){
        //remove detail from previous active row
        hideRow(activeRow, activeRowform);
        //reassign active row.
        activeRowform = this.rowform
        activeRow = (event.target.parentElement.nodeName !== "TR") ? event.target.parentElement.parentElement : event.target.parentElement;
        activeRowform.$show();
        activeRow.className += ' editing-row';
      };

      $scope.stableCharges = [
        {id: 1, description: 'awesome user1', unit: 2, rate: 4, inStable: true},
        {id: 2, description: 'awesome user2', unit: 3, rate: 4, inStable: true},
        {id: 3, description: 'awesome user3', unit: 4, rate: 7, inStable: false},
        {id: 4, description: null, unit: 2, rate: 4, inStable: true},
      ];

      $scope.standardCharges = [];

      //wizard dropdown for units
      $scope.units = [
        {value: 0, text: "Daily"},
        {value: 1, text: "Weekly"},
        {value: 2, text: "Fortnightly"},
        {value: 3, text: "Monthly"},
        {value: 4, text: "Quarterly"},
        {value: 5, text: "Yearly"}
      ];

      $scope.addStableRow = function(){
        $scope.stableCharges.push({
          id: $scope.standardCharges.length+1,
          description: null,
          unit: 0,
          rate: 0,
          inStable: false
        });
      };

      $scope.addStandardRow = function(){
        $scope.standardCharges.push({
          id: $scope.standardCharges.length+1,
          description: null,
          rate: 0
        });
      };

      // remove user
      $scope.removeStableRow = function(index) {
        $scope.stableCharges.splice(index, 1);
      };

      // remove standard row
      $scope.removeStandardRow = function(index) {
        $scope.standardCharges.splice(index, 1);
      };

      $scope.postcharge = function(charge) {
      	var onPostChargeComplete = function(data){
      		console.log(data);
      	};

      	charge.stableEmail = $rootScope.user.email;

      	wizardApi.postData(charge, "chargetypes")
      	.then(onPostChargeComplete, onError);
      };

        wizardApi.getData("chargetypes", $rootScope.user.email)
        .then(onGetChargeComplete, onError);
    };

    wizard.controller("wizardChargeController", ["$scope", "$rootScope", "wizardApi", wizardChargeController]);
}());
