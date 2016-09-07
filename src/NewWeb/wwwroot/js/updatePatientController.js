(function () {
    "use strict";

    angular.module("app-patients")
        .controller("updatePatientController", updatePatientController);

    function updatePatientController($routeParams, $http) {
        var vm = this;

        vm.patient = {};
        vm.patientId = $routeParams.patientId;

        vm.errorMessage = "";
        vm.isBusy = false;
        
    };
})();