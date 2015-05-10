var expect = chai.expect;

describe("Util", function() {

	describe("pad zero", function() {
		describe("given a single digit number and a padding of 2", function() {
			it("converts number to string with a leading 0", function () {
				var result = Util.padZero(1,2);
				expect(result).to.equal('01');
			});
		});

		describe("given a 2 digit number and a padding of 2", function() {
			it("converts number to string", function () {
				var result = Util.padZero(11,2);
				expect(result).to.equal('11');
			});
		});

		describe("given a padding smaller than the number of digits", function() {
			it("throws an error", function () {
				expect(function() { Util.padZero(111, 2)}).to.throw(Error);
			});
		});
	});

	describe("to minute format", function() {
		describe("given a single digit number", function() {
			it("converts it to mm:ss string format", function () {
				var result = Util.toMinuteFormat(1);
				expect(result).to.equal('00:01');
			});
		});

		describe("given a number less than 60", function() {
			it("converts it to mm:ss string format", function () {
				var result = Util.toMinuteFormat(30);
				expect(result).to.equal('00:30');
			});
		});

		describe("given a number >= 60 but less than 600", function() {
			it("converts it to mm:ss string format", function () {
				var result = Util.toMinuteFormat(301);
				expect(result).to.equal('05:01');
			});
		});

		describe("given a number >= 600 but less than 3600", function() {
			it("converts it to mm:ss string format", function () {
				var result = Util.toMinuteFormat(1931);
				expect(result).to.equal('32:11');
			});
		});

		describe("given a negative number", function() {
			it("throws an exception", function () {
				expect(function(){Util.toMinuteFormat(-1)}).to.throw(Error);
			});
		});

		describe("given a number >= 3600", function() {
			it("throws an exception", function () {
				expect(function(){Util.toMinuteFormat(3600)}).to.throw(Error);
			});
		});
	});
});
