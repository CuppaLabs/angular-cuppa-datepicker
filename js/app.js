angular.module("cuppaDatepicker",["cuppaDatepickerDirective"])
.controller("cuppaDatepickerController",function($scope){
        $scope.myDate = "04/18/1990 12:15 AM";
        $scope.myDate2 = "04/18/1990 12:15 AM";
        $scope.onDateSelect = function(dateVal){
            //alert(dateVal);
        }
});