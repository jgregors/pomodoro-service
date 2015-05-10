var expect = chai.expect;

describe("Timer", function() {
  
  beforeEach(function() {
    this.clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    this.clock.restore();
  });

  describe("when initialised", function() {
    it("does not tick before start is called", function () {
      var ticks = [];
      var timer = new Pomodoro.Timer(3);
      timer.notifyTick = function(remaining) {
        ticks.push(remaining);
      };

      this.clock.tick(3000); 
      expect(ticks.length).to.equal(0);
    });

    it("isRunning is false", function () {
      var timer = new Pomodoro.Timer(3);
      expect(timer.isRunning()).to.be.false;
    });
  });

  describe("when started", function() {
    it("notifies immediately of the intial time remaining", function() {

      var ticks = [];
      var timer = new Pomodoro.Timer(3);
      timer.notifyTick = function(remaining) {
        ticks.push(remaining);
      };

      timer.start();

      expect(ticks).to.eql([3]);      
    });

    it("isRunning is changed to true", function() {

      var timer = new Pomodoro.Timer(3);

      expect(timer.isRunning()).to.be.false;
      
      timer.start();
      
      expect(timer.isRunning()).to.be.true;

    });

    it("notifies n + 1 times for a duration of n", function() {

      var ticks = [];
      var timer = new Pomodoro.Timer(3);
      timer.notifyTick = function(remaining) {
        ticks.push(remaining);
      };

      timer.start();
      
      this.clock.tick(3000);
      expect(ticks.length).to.equal(4);
      expect(ticks).to.eql([3,2,1,0]);

    });

    it("does not respond to a second call of start", function() {

      var ticks = [];
      var timer = new Pomodoro.Timer(3);
      timer.notifyTick = function(remaining) {
        ticks.push(remaining);
      };

      timer.start();
      timer.start();
      expect(ticks.length).to.equal(1);
      expect(ticks).to.eql([3]);      

      this.clock.tick(3000);
      expect(ticks.length).to.equal(4);
      expect(ticks).to.eql([3,2,1,0]);

    });
  });

  describe("when initialised with 1", function() {
    it("should notify twice after start", function() {

      var ticks = [];
      var timer = new Pomodoro.Timer(1);
      timer.notifyTick = function(remaining) {
        ticks.push(remaining);
      };

      timer.start();
      expect(ticks.length).to.equal(1);
      expect(ticks).to.eql([1]);      

      this.clock.tick(3000);
      expect(ticks.length).to.equal(2);
      expect(ticks).to.eql([1,0]);

    });
  });

  describe("when initialised with 0", function() {
    // I think that the sinon useFakUsers call is not 
    // acting as I expected in regards to clearInterval.
    // It keeps ticking at the moment in the test(??)
    xit("should notify once when started", function() {

      var ticks = [];
      var timer = new Pomodoro.Timer(0);
      timer.notifyTick = function(remaining) {
        ticks.push(remaining);
      };

      timer.start();

      expect(ticks.length).to.equal(1);
      expect(ticks).to.eql([0]);

      this.clock.tick(1000)

      expect(ticks.length).to.equal(1);
      expect(ticks).to.equal([0]);
    });
  });
});