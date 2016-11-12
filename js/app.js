angular.module("cuppaDatepicker",["cuppaDatepickerDirective"])
.controller("cuppaDatepickerController",function($scope){
        $scope.myDate = "2016-6-12";
        $scope.myDate2 = "1990-04-18";
        $scope.onDateSelect = function(dateVal){
            alert(dateVal);
        }
});