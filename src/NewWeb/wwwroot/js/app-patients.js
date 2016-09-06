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


        $routeProvider.otherwise({ redirectTo: "/" });


    });

})();