(function () {
  "use strict";
    var wizard = angular.module("wizard"),
    wizardChargeController = function($scope, $rootScope, wizardApi) {
    	var onGetChargeComplete = function(response){
        console.log("response", response.data);
        if(response.data){
          var chargeData = JSON.parse(response.data);
            $scope.stableCharges = chargeData.StableChargeTypes;
            $scope.standardCharges = chargeData.StandardChargeTypes;
            data = chargeData;
        }
    	},
      onError = function(data){
	      console.log(data);
	    },
      activeRow = null,
      data = {
        StableEmail: $rootScope.user.email,
        StableName: $rootScope.user.stableName,
        StableChargeTypes: [
          { Id: 1, Description: null, Unit: 1, Rate: 0, InStable: true }
        ],
        StandardChargeTypes: [
          {Id: 1, Description: null, Rate: 0 }
        ]
      },
      hideRow = function(row, form){
        if(!activeRow || !form) return;

        saveRow(form);
        form.$cancel();
        var trimmedName = row.className.split('editing-row')[1];
        activeRow.className = trimmedName;
      };

      /**
      * Sort through the row data, if that row already esists (being edited by user), overrite the rows data.
      **/
      var storeRowData = function(form, chargesArray){
        var id = form.$data.Id,
        inChargesArray = false;

        chargesArray.forEach(function(row, i){
          if(row.Id === id){
            chargesArray[i] = form.$data;
            inChargesArray = true;
          }
          return;
        });

        if(!inChargesArray){
          chargesArray.push(form.$data);
        }
        return;
      };

      var saveRow = function(form){
        var chargesArray = (form.$name === "stable") ? data.StableChargeTypes : data.StandardChargeTypes;
        storeRowData(form, chargesArray);

        $scope.stableCharges = data.StableChargeTypes;
        $scope.standardCharges = data.StandardChargeTypes;
        $scope.postcharge();
      };


      $scope.showRow= function(event, form){
        //remove detail from previous active row
        hideRow(activeRow, form);
        //reassign active row.
        activeRow = (event.target.parentElement.nodeName !== "TR") ? event.target.parentElement.parentElement : event.target.parentElement;
        form.$show();
        activeRow.className += ' editing-row';
      };

      $scope.stableCharges = data.StableChargeTypes;

      $scope.standardCharges = data.StandardChargeTypes;

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
        data.StableChargeTypes.push({
          id: data.StableChargeTypes.length+1,
          description: null,
          unit: 0,
          rate: 0,
          inStable: false
        });
      };

      $scope.addStandardRow = function(){
        data.StandardChargeTypes.push({
          id: data.StandardChargeTypes.length+1,
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

      //Save Date request
      $scope.postcharge = function() {
      	var onPostChargeComplete = function(response){

      	};

      	wizardApi.postData(data, "chargetypes")
      	.then(onPostChargeComplete, onError);
      };

        if($rootScope.user.email){
          wizardApi.getData("chargetypes", $rootScope.user.email)
            .then(onGetChargeComplete, onError);
          }
    };

    wizard.controller("wizardChargeController", ["$scope", "$rootScope", "wizardApi", wizardChargeController]);
}());
