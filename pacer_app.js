(function() {

  angular.module("pacerApp", [])

    .controller("PacerController", function($scope) {
      $scope.distance = void 0;  // Kilometers.
      $scope.time = {hours: void 0, minutes: void 0, seconds: void 0};
      $scope.speed = void 0;  // Kilometers per hour.
      $scope.pace = {minutes: void 0, seconds: void 0};

      $scope.clamp = function(num) {
        return Number(num.toFixed(2));
      }

      $scope.reset = function() {
        $scope.distance = void 0;
        $scope.time = {hours: void 0, minutes: void 0, seconds: void 0};
        $scope.speed = void 0;
        $scope.pace = {minutes: void 0, seconds: void 0};
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
  })

  .controller("PacerDateController", function() {
    this.example = {
      value: new Date(1970, 0, 0, 0, 0, 0)
    };
  })

  .filter("minutesToTimeString", function() {
    return function(minutes) {
      var hours = Math.floor(minutes / 60.0);
      var restMinutes = minutes % 60.0;
      var seconds = restMinutes * 60.0;
      var restSeconds = seconds % 60.0;
      var timeString = "";
      timeString = hours + "h ";
      timeString += Math.floor(restMinutes) + "m ";
      timeString += Math.floor(restSeconds) + "s";
      return timeString;
    }
  });

})();