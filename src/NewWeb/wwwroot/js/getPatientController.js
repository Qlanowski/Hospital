//getPatientController.js
(function () {
    "use strict";

    angular.module("app-patients")
    .controller("getPatientController", getPatientController)

    function getPatientController($http, $scope){
        var vm = this;
        vm.patients = [];
        vm.errorMessage = "";
        vm.isBusy = true;

        $http.get("/api/patients/rest")
        .then(function (response) {
            //success
            angular.copy(response.data, vm.patients);
        }, function (error) {
            //failure
            vm.errorMessage = "Failed to load patients" + error;
        })
        .finally(function () {
            vm.isBusy = false;
        });

        $scope.getPatient = function (patientId) {
            
            $http.post("/api/patients/rest/" + patientId)
            .then(function (response) {
                //success
                location.reload()
            }, function (error) {
                //failure
                vm.errorMessage = "Failed to get new patients" + error;
            })
        .finally(function () {
            vm.isBusy = false;
        });

        }
        
     }
      

})();