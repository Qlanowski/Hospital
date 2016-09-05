(function () {

    "use strict";
    //Getting the existing module
    angular.module("app-patients")
        .controller("registerController", registerController);

    function registerController($http) {
        var vm = this;
          
        vm.errorMessage = "";
          
        vm.doctors = [];

        vm.newDoctor = {};

        vm.registerDoctor = function () {
            vm.errorMessage = "";

            $http.post("/Auth/Register", vm.newDoctor)
                .then(function () {
                    //success
                    vm.newDoctor = {};
                    
                }, function () {
                    //failure
                    vm.errorMessage = "Failed to register";
                })
        };

    }

})();