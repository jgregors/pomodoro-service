'use strict';

var Util = Util || new function() {

	this.padZero = function(num, padding) {

		var numberString = num.toString();
		if( numberString.length > padding) {
			throw new Error('padding was ' + padding + ' and number was ' + numberString  +
				'. The padding has to be >= the number of digits in the number');
		}

		return ('0' + numberString).slice(-padding);
	}

	this.toMinuteFormat = function(seconds) {

		if(seconds < 0) {
			throw new Error('seconds must be positive');
		}

		if(seconds >= 3600) {
			throw new Error('seconds must be less than 3600 (an hour)');
		}

		var quot = Math.floor(seconds / 60);
		var rem = seconds % 60;
		return this.padZero(quot, 2) + ':' + this.padZero(rem, 2);
	}
};