(function () {

    "use strict";
    //Creating the module
    angular.module("app-patients", ["simpleControls", "ngRoute"])
    .config(function ($routeProvider) {

        $routeProvider.when("/", {
            controller: "patientsController",
            controllerAs: "vm",
            templateUrl: "/views/patientsView.html"
        });

        $routeProvider.when("/newpatient", {
            controller: "newPatientController",
            controllerAs: "vm",
            templateUrl: "/views/newPatientController.html"
        });

        $routeProvider.when("/updatepatient/:patientId", {
            controller: "updatePatientController",
            controllerAs: "vm",
            templateUrl: "/views/updatePatientController.html"
        });

        $routeProvider.when("/doctors/:patientId", {
            controller: "doctorController",
            controllerAs: "vm",
            templateUrl: "/views/doctorController.html"
        });


        $routeProvider.otherwise({ redirectTo: "/" });


    });

})();