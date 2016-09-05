(function () {

    "use strict";
    //Getting the existing module
    angular.module("app-patients")
        .controller("patientsController", patientsController);

    function patientsController($scope, $http) {

        var vm = this;

        vm.patients = [];
        
        vm.errorMessage = "";
        //vm.isBusy = true;

        $http.get("/api/patients")
        .then(function (response) {
            //success
            angular.copy(response.data, vm.patients);
        }, function (error) {
            //failure
            vm.errorMessage = "Failed to load yours patients"
        })
        .finally(function () {
            vm.isBusy = false;
        });

       $scope.ShowPatient = function () {
            alert("Did you really think that would work??? :-)");
        };


    }

})();