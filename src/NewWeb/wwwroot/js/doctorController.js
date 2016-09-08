//doctorController.js
(function () {

    "use strict";
    //Getting the existing module
    angular.module("app-patients")
        .controller("doctorController", doctorController);

    function doctorController($routeParams, $http) {
        var vm = this;
        vm.patientId = $routeParams.patientId
        vm.doctors = [];
        vm.errorMessage = "";
        vm.isBusy = true;

        $http.get("/api/doctors/" + vm.patientId)
        .then(function (response) {
            //success
            angular.copy(response.data, vm.doctors)
        }, function (error) {
            //failure
            vm.errorMessage = "Failed to get patient's doctors" + error;
        })
        .finally(function () {
            vm.isBusy = false;
        });


    }



})();