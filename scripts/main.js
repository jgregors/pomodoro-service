'use strict';

document.getElementById('startButton')
.addEventListener('click', startTimer);

document.getElementById('stopButton')
.addEventListener('click', stopTimer);

document.getElementById('resetButton')
.addEventListener('click', resetTimer);

var timer = new Pomodoro.Timer(5, updateDisplay);

function startTimer() {
	timer.start();   
}

function stopTimer() {
	timer.stop();   
}

function resetTimer() {
	timer.reset();   
}

function updateDisplay(remaining) {
	var display = Util.toMinuteFormat(remaining);
	document.getElementById("timerDisplay").innerHTML = display;
}

