(function () {
    "use strict";

    angular.module("app-patients")
    .controller("newPatientController", newPatientController);

    function newPatientController() {
        var vm = this;

        vm.name = "Karol"
    };

})();