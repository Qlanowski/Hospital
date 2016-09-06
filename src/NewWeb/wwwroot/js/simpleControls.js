(function () {
    "use strict";

    angular.module("simpleControls", [])
    .directive("waitCursor", waitCursor);

    function waitCursor() {
        return {
            scope:{
                show: "=displayWhen"
            },
            restrict: "E", // musi byc <wait-cursor> a nie moze byc <div wait-cursor>
            templateUrl: "/views/waitCursor.html"
        };
    }

})();