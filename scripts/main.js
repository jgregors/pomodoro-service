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

	document.getElementById('startButton').disabled = false;
	document.getElementById('resetButton').disabled = false;
}

function startTimer() {
	timer.start();
	document.getElementById('setButton').disabled = true;
	document.getElementById('startButton').disabled = true;
	document.getElementById('stopButton').disabled = false;
	document.getElementById('resetButton').disabled = false;
}

function stopTimer() {
	timer.stop();
	document.getElementById('startButton').disabled = false;
	document.getElementById('setButton').disabled = false;
	document.getElementById('stopButton').disabled = true;
}

function resetTimer() {
	timer.reset();
	document.getElementById('startButton').disabled = false;
	document.getElementById('setButton').disabled = false;
	document.getElementById('stopButton').disabled = true;
}

function updateDisplay(remaining) {
	var display = Util.toMinuteFormat(remaining);
	document.getElementById("timerDisplay").innerHTML = display;
}

