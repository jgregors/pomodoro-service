'use strict';

var Pomodoro = Pomodoro || new function() {

    this.Timer = function(duration) {

        var _id = null;
        var _remaining = duration;

        this.notifyTick = function(i) {};

        this.start = function() {

            var obj = this;

            if(obj.isRunning()) {
                return;
            }

            obj.notifyTick(_remaining--);

            _id = setInterval(function() {
                if(_remaining === 0) {
                   obj.stop();   
                }

                obj.notifyTick(_remaining);
                _remaining--;

           }, 1000);
        }

        this.stop = function() {
            if(this.isRunning()){
                clearInterval(_id);
            }
        }

        this.isRunning = function() {
            return _id != null ? true : false;
        }
    }
};