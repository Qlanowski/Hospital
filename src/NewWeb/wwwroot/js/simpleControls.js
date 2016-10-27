(function () {
    "use strict";

    angular.module("simpleControls", [])
    .directive("waitCursor", waitCursor); //zapisywane est w html jako wait-cursor

    function waitCursor() {
        return {
            scope:{
                show: "=displayWhen" //zapisywane jest w html jako display-when
            },
            restrict: "E", // musi byc <wait-cursor> a nie moze byc <div wait-cursor>
            templateUrl: "/views/waitCursor.html"
        };
    }

})();