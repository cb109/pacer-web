var app = angular.module("pacer_app", []);
app.controller("pacer_ctrl", function($scope) {

    $scope.distance = void 0;  // Kilometers.
    $scope.time = void 0;  // Minutes.
    $scope.speed = void 0;  // Kilometers per hour.
    $scope.pace = void 0;  // Minutes per kilometer.

    $scope.reset = function() {
        $scope.distance = void 0;
        $scope.time = void 0;
        $scope.pace = void 0;
        $scope.speed = void 0;
    }

    $scope.calcPace = function() {
        var pace = $scope.time / $scope.distance;
        return pace;
    }

    $scope.calcPaceUsingSpeed = function() {
        var pace = 60.0 / $scope.speed;
        return pace;
    }

    $scope.calcSpeed = function() {
        var speed = $scope.distance / ($scope.time / 60.0);
        return speed;
    }

    $scope.calcDistance = function() {
        var distance = $scope.time / $scope.pace;
        return distance;
    }

    $scope.calcTime = function() {
        var time = $scope.distance * $scope.pace;
        return time;
    }

    $scope.onChangedDistance = function() {
        $scope.pace = $scope.calcPace();
        $scope.speed = $scope.calcSpeed();
    }

    $scope.onChangedTime = function() {
        $scope.pace = $scope.calcPace();
        $scope.speed = $scope.calcSpeed();
    }

    $scope.onChangedPace = function() {
        $scope.time = $scope.calcTime();
        $scope.speed = $scope.calcSpeed();
    }

    $scope.onChangedSpeed = function() {
        $scope.pace = $scope.calcPaceUsingSpeed();
        $scope.time = $scope.calcTime();
    }
});
