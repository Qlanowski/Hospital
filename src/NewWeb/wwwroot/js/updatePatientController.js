﻿(function () {
    "use strict";

    angular.module("app-patients")
        .controller("updatePatientController", updatePatientController);

    function updatePatientController($routeParams, $http) {
        var vm = this;

        
        vm.patient = {};// Patient which will be updated
        
        vm.patientId = $routeParams.patientId;
         

        vm.errorMessage = "";
        vm.isBusy = true;

        $http.get("/api/patients/" + vm.patientId)
        .then(function (response) {
            //success
            angular.copy(response.data, vm.patient)
        }, function (error) {
            //failure
            vm.errorMessage = "Failed to get patient which will be updated" + error;
        })
        .finally(function () {
            vm.isBusy = false;
        });

        vm.editPatient = function () {
            vm.isBusy = true;
            vm.errorMessage = "";
            vm.updatePatient.patientId = vm.patientId;
            $http.put("/api/patients/" + vm.patientId, vm.updatePatient)
             .then(function () {
                 //success
                 vm.errorMessage= "Succesfully updated patient";
             }, function () {
                 //failure
                 vm.errorMessage = "Failed to update patient";
             })
            .finally(function () {
                vm.isBusy = false;
            });

        }
        
    };
})();