'use strict';

document.getElementById('startButton')
.addEventListener('click', startTimer);

document.getElementById('stopButton')
.addEventListener('click', stopTimer);

var timer = new Pomodoro.Timer(5);
timer.notifyTick = updateDisplay;

function startTimer() {
	timer.start();   
}

function stopTimer() {
	timer.stop();   
}

function updateDisplay(remaining) {
	var display = Util.toMinuteFormat(remaining);
	document.getElementById("timerDisplay").innerHTML = display;
}

