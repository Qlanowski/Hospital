(function () {

    "use strict";
    //Getting the existing module
    angular.module("app-patients")
        .controller("patientsController", patientsController);

    function patientsController($scope, $http) {

        var vm = this;

        vm.patients = [];
        vm.patient = {};
        
        vm.errorMessage = "";
        //vm.isBusy = true;

        $http.get("/api/patients")
        .then(function (response) {
            //success
            angular.copy(response.data, vm.patients);
        }, function (error) {
            //failure
            vm.errorMessage = "Failed to load yours patients" + error;
        })
        .finally(function () {
            vm.isBusy = false;
        });

        $scope.ShowPatient = function (patient) {
            // nie dziala zamiana 1 i 0 na plec
            //vm.patient = {};
            //var newpatient = {}
            //newpatient = patient;
            //if (newpatient.sex == 0) {
            //    newpatient.sex = "Male";
            //}
            //else {
            //    newpatient.sex = "Female"
            //}
            angular.copy(patient, vm.patient);
            
        };
    }

})();