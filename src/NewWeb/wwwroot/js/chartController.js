(function () {
    "use strict";
    angular.module("app-patients")
    .controller("chartController",

    function ($scope, $rootScope) {
        $scope.$on("dataChange", function (event, passData) {
            $scope.options = {
                chart: {
                    type: 'lineChart',
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 40,
                        left: 55
                    },
                    xAxis: {
                        tickFormat: function (d) { return d3.time.format("%x")(new Date(d)); } // format daty mm/dd/yyyy
                    },
                    x: function (d) { return new Date(d.x); },
                    y: function (d) { return d.y; },
                    useInteractiveGuideline: true,


                    yAxis: {
                        tickFormat: function (d) {
                            return d3.format('.02f')(d);
                        }
                    }
                },

            };

            $scope.data = [
              {
                  values: passData,
                  key: "Troponiny",
                  color: '#ff7f0e'
              }
            ];
        });
    });

})();