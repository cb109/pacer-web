// The pacer module implements all calculations.

var pacer = (function() {

    var _distance = 0.0;  // Kilometers.
    var _time = 0.0;  // Minutes.
    var _speed = 0.0;  // Kilometers per hour.
    var _pace = 0.0;  // Minutes per kilometer.

    function _calcPace() {
        var pace = _time / _distance;
        return pace;
    }

    function _calcPaceUsingSpeed() {
        var pace = 60.0 / _speed;
        return pace;
    }

    function _calcSpeed() {
        var speed = _distance / (_time / 60.0);
        return speed;
    }

    function _calcTime() {
        var time = _distance * _pace;
        return time;
    }

    function _calcDistance() {
        var distance = _time / _pace;
        return distance;
    }

    function _debug() {
        var msg = "time: " + _time + " mins\n";
        msg += "distance: " + _distance.toFixed(2) + " km\n";
        msg += "pace: " + _pace.toFixed(2) + " min/km\n";
        msg += "speed: " + _speed.toFixed(2) + " km/h\n";
        alert(msg);
    }

    // Public methods.

    function init(distance, time) {
        _distance = distance;
        _time = time;
    }

    function calc() {
        _pace = _calcPace();
        _speed = _calcSpeed();
    }

    function reset() {
        _distance = 0.0;
        _time = 0.0;
        _pace = 0.0;
        _speed = 0.0;
    }

    function getDistance() {
        return _distance;
    }

    function getTime() {
        return _time;
    }

    function getPace() {
        return _pace;
    }

    function getSpeed() {
        return _speed;
    }

    var _API = {
        init: init,
        calc: calc,
        reset: reset,
        getDistance: getDistance,
        getTime: getTime,
        getPace: getPace,
        getSpeed: getSpeed
    };

    return _API;
})();
