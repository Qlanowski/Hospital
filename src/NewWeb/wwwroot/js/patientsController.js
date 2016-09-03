(function () {

    "use strict";
    //Getting the existing module
    angular.module("app-patients")
        .controller("patientsController", patientsController);

    function patientsController() {

        var vm = this;

        vm.patients = [{
            Name: "Krzysztof",
            Surname: "Kapciak"
        },
        {
            Name: "Alek",
            Surname: "Rokowicz"
        },
        {
            Name: "Beata",
            Surname: "Walczak"
        }]
    }

})();