var app = angular.module("pacer_app", []);
app.controller("pacer_ctrl", function($scope) {

    $scope.distance = void 0;  // Kilometers.
    $scope.time = void 0;  // Minutes.
    $scope.speed = void 0;  // Kilometers per hour.
    $scope.pace = void 0;  // Minutes per kilometer.

    $scope.clamp = function(num) {
        return Number(num.toFixed(2));
    }

    $scope.reset = function() {
        $scope.distance = void 0;
        $scope.time = void 0;
        $scope.pace = void 0;
        $scope.speed = void 0;
    }

    $scope.calcPace = function() {
        var pace = $scope.time / $scope.distance;
        return $scope.clamp(pace);
    }

    $scope.calcPaceUsingSpeed = function() {
        var pace = 60.0 / $scope.speed;
        return $scope.clamp(pace);
    }

    $scope.calcSpeed = function() {
        var speed = $scope.distance / ($scope.time / 60.0);
        return $scope.clamp(speed);
    }

    $scope.calcDistance = function() {
        var distance = $scope.time / $scope.pace;
        return $scope.clamp(distance);
    }

    $scope.calcTime = function() {
        var time = $scope.distance * $scope.pace;
        return $scope.clamp(time);
    }

    // Based on the formula here: http://de.wikipedia.org/wiki/Laufsport
    $scope.estimateTime = function(knownDistance, knownTime, newDistance) {
        var factor = newDistance / knownDistance;
        var predictedTime = knownTime * Math.pow(factor, 1.07);
        return $scope.clamp(predictedTime);
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
