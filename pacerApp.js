(function() {
  'use strict'

  angular.module("pacerApp", [])

    .controller("PacerController", function() {
      this.distance = void 0;  // Kilometers.
      this.time = void 0;
      this.speed = void 0;  // Kilometers per hour.
      this.pace = void 0;;

      this.clamp = function(num) {
        return Number(num.toFixed(2));
      }

      this.reset = function() {
        this.distance = void 0;
        this.time = void 0;
        this.speed = void 0;
        this.pace = void 0;
      }

      this.calcPace = function() {
        var pace = this.time / this.distance;
        return this.clamp(pace);
      }

      this.calcPaceUsingSpeed = function() {
        var pace = 60.0 / this.speed;
        return this.clamp(pace);
      }

      this.calcSpeed = function() {
        var speed = this.distance / (this.time / 60.0);
        return this.clamp(speed);
      }

      this.calcDistance = function() {
        var distance = this.time / this.pace;
        return this.clamp(distance);
      }

      this.calcTime = function() {
        var time = this.distance * this.pace;
        return this.clamp(time);
      }

      // Based on the formula here: http://de.wikipedia.org/wiki/Laufsport
      this.estimateTime = function(knownDistance, knownTime, newDistance) {
        var factor = newDistance / knownDistance;
        var predictedTime = knownTime * Math.pow(factor, 1.07);
        return this.clamp(predictedTime);
      }

      this.onChangedDistance = function() {
        this.pace = this.calcPace();
        this.speed = this.calcSpeed();
      }

      this.onChangedTime = function() {
        this.pace = this.calcPace();
        this.speed = this.calcSpeed();
      }

      this.onChangedPace = function() {
        this.time = this.calcTime();
        this.speed = this.calcSpeed();
      }

      this.onChangedSpeed = function() {
        this.pace = this.calcPaceUsingSpeed();
        this.time = this.calcTime();
      }
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