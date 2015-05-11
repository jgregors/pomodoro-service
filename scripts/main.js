'use strict';

document.getElementById('startButton')
.addEventListener('click', startTimer);

document.getElementById('stopButton')
.addEventListener('click', stopTimer);

document.getElementById('resetButton')
.addEventListener('click', resetTimer);

document.getElementById('setButton')
.addEventListener('click', setTimer);

var timer;

function setTimer() {
	var duration = parseInt(document.getElementById('duration').value);
	if(isNaN(duration)) {
		throw new Error('duration entered is not a number');
	}
	timer = new Pomodoro.Timer(duration, updateDisplay);
}

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

