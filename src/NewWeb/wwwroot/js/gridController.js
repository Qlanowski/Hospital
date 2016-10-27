(function () {
    "use strict";

    angular.module("app-patients")
    .controller("gridController", gridController);

    function gridController($scope, $rootScope, uiGridExporterService, uiGridExporterConstants) {
        var vm = this;
        vm.chartData = [];
        var passData = [];

        $scope.gridOptions =
        {
            enableGridMenu: true,
            enableSorting: true,
            enableRowSelection: true,
            selectionRowHeaderWidth: 35,
            enableSelectAll: true,
            multiSelect: true,
            columnDefs: [
              { name: 'Trial', field: 'Trial' },
              { name: 'Date', field: 'Date', type: "date", cellFilter: "date:'dd-MM-yyyy HH:mm'" },
              { name: 'Result', field: 'Result' }
            ],
            data: [
                {
                    "Trial": "Troponiny",
                    "Date": "2015-02-03T05:49:54.850Z",
                    "Result": 3
                },
                {
                    "Trial": "Troponiny",
                    "Date": "2015-02-07T12:30:54.850Z",
                    "Result": 5
                },
                {
                    "Trial": "Troponiny",
                    "Date": "2015-02-12T16:23:54.850Z",
                    "Result": 8
                },
                {
                    "Trial": "Troponiny",
                    "Date": "2015-02-14T14:29:54.850Z",
                    "Result": 6
                },
                {
                    "Trial": "Troponiny",
                    "Date": "2015-02-18T23:49:54.850Z",
                    "Result": 2
                }
            ]
        };

        $scope.pushAll = function () {
            passData = [];
            vm.chartData = [];
            var grid = $scope.gridApi.grid
            vm.chartData.push(uiGridExporterService.getData(grid, uiGridExporterConstants.SELECTED, uiGridExporterConstants.VISIBLE, false));


            for (var i = 0; i < vm.chartData[0].length; i++) {
                var obj1 = {};
                var obj2 = {};
                obj1.x = vm.chartData[0][i][0].value;
                obj2.y = vm.chartData[0][i][1].value;
                var obj3 = angular.merge(obj1, obj2);
                //vm.cleanData.push(obj3); 
                passData.push(obj3);
            }
            $rootScope.$broadcast("dataChange", passData)

        };
        $scope.gridOptions.onRegisterApi = function (gridApi) { //musi być na dole bo się wywala = nie rozumie gridApi
            //set gridApi on scope
            $scope.gridApi = gridApi;
        };


    }

})();
