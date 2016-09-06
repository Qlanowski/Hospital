(function () {
    "use strict";

    angular.module("app-patients")
    .controller("newPatientController", newPatientController);

    function newPatientController($http) {
        var vm = this;

        vm.errorMessage = "";
        vm.newPatient = {};
        
        vm.addPatient = function () {
            vm.errorMessage = "";

            $http.post("/api/patients", vm.newPatient)
            .then(function () {
                //success
                vm.newPatient = {};
            }, function () {
                //failure
                vm.errorMessage = "Failed to add new patient";
            });
        }
    };

})();