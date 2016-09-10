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
        vm.isBusy = true;

        $http.get("/api/patients")
        .then(function (response) {
            //success
            angular.copy(response.data, vm.patients);
            //zamienia 1 i 0 na płeć u pacjeta który wyświetla sie na poczatku
            if (response.data[0].sex == 0) {
                response.data[0].sex = "Male";
            } else if (response.data[0].sex == 1) {
                response.data[0].sex = "Felame";
            }
            angular.copy(response.data[0], vm.patient); //jak sie wyswietla lista pacjetów to odrazu jeden juz jest wyswietlany cały  

        }, function (error) {
            //failure
            vm.errorMessage = "Failed to load yours patients" + error;
        })
        .finally(function () {
            vm.isBusy = false;
        });

        $scope.ShowPatient = function (patient) {
            // nie dziala zamiana 1 i 0 na plec
            vm.patient = {};

            if (patient.sex == 0) {
                patient.sex = "Male";
            }
            else if(patient.sex == 1) {
                patient.sex = "Female";
            }
            angular.copy(patient, vm.patient);
            
        };

        $scope.deletePatient = function (patientId) {
           var accept = confirm("Patient will be deleted");
           if (accept == true) {
               $http.delete("/api/patients/" + patientId)
               .then(function () {
                   //success
                   location.reload();
               }, function (error) {
                   //failure
                   vm.errorMessage = "Failed to delete patient" + error;
               })
        .finally(function () {
            vm.isBusy = false;
        });
           }
           
        }
            
    }

})();