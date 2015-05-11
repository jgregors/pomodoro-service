var expect = chai.expect;

describe("Timer", function() {
  
  var clock;
  var ticks;
  var addTick;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    ticks = [];
    addTick = function(remaining) {ticks.push(remaining)};
  });

  afterEach(function() {
    clock.restore();
    ticks = [];
  });

  describe("when initialised", function() {
    it("ticks once with initial value", function () {
      
      var timer = new Pomodoro.Timer(3, [addTick]);

      clock.tick(3000); 
      expect(ticks.length).to.equal(1);
      expect(ticks).to.eql([3]);
    });

    it("isRunning is false", function () {
      var timer = new Pomodoro.Timer(3, [addTick]);
      expect(timer.isRunning()).to.be.false;
    });
  });

  describe("when started", function() {
    it("notifies immediately of the intial time remaining", function() {
      
      var timer = new Pomodoro.Timer(3, [addTick]);
      
      timer.start();

      expect(ticks).to.eql([3]);      
    });

    it("isRunning is changed to true", function() {

      var timer = new Pomodoro.Timer(3, [addTick]);

      expect(timer.isRunning()).to.be.false;
      
      timer.start();
      
      expect(timer.isRunning()).to.be.true;

    });

    it("notifies n + 1 times for a duration of n", function() {

      var timer = new Pomodoro.Timer(3, [addTick]);
      
      timer.start();
      
      clock.tick(3000);
      expect(ticks.length).to.equal(4);
      expect(ticks).to.eql([3,2,1,0]);

    });

    it("does not respond to a second call of start", function() {

      var timer = new Pomodoro.Timer(3, [addTick]);
      
      timer.start();
      timer.start();
      expect(ticks.length).to.equal(1);
      expect(ticks).to.eql([3]);      

      clock.tick(3000);
      expect(ticks.length).to.equal(4);
      expect(ticks).to.eql([3,2,1,0]);

    });
  });

  describe("when stopped", function() {
    it("does not notify", function() {

      var timer = new Pomodoro.Timer(3, [addTick]);
      
      timer.start();
      
      clock.tick(1000);
      expect(ticks.length).to.equal(2);
      expect(ticks).to.eql([3,2]);

      timer.stop();
      clock.tick(2000);
      expect(ticks.length).to.equal(2);
      expect(ticks).to.eql([3,2]);
    });

    it("has no affect when stop is called again", function() {

      var timer = new Pomodoro.Timer(3, [addTick]);
      
      timer.start();
      
      clock.tick(1000);
      expect(ticks.length).to.equal(2);
      expect(ticks).to.eql([3,2]);

      timer.stop();
      timer.stop();

      clock.tick(2000);
      expect(ticks.length).to.equal(2);
      expect(ticks).to.eql([3,2]);

    });
  });

  describe("when reset", function() {
    it("stops and returns to the initial value", function () {
      
      var timer = new Pomodoro.Timer(3, [addTick]);
      
      timer.start();
      clock.tick(2000); 
      expect(ticks.length).to.equal(3);
      expect(ticks).to.eql([3,2,1]);

      timer.reset();
      clock.tick(4000);
      expect(ticks.length).to.equal(4);
      expect(ticks).to.eql([3,2,1,3]);
    });

    it("isRunning is false", function () {
      
      var timer = new Pomodoro.Timer(3, [addTick]);
      
      timer.start();
      clock.tick(2000); 
      
      timer.reset();
      expect(timer.isRunning()).to.be.false;
    });
  });


  describe("when initialised with 1", function() {
    it("should notify twice after start", function() {

      var timer = new Pomodoro.Timer(1, [addTick]);
      
      timer.start();
      expect(ticks.length).to.equal(1);
      expect(ticks).to.eql([1]);      

      clock.tick(3000);
      expect(ticks.length).to.equal(2);
      expect(ticks).to.eql([1,0]);
    });
  });

  describe("when initialised with 0", function() {
    it("should notify once when started", function() {

      var timer = new Pomodoro.Timer(0, [addTick]);
      
      timer.start();

      expect(ticks.length).to.equal(1);
      expect(ticks).to.eql([0]);

      clock.tick(1000);

      expect(ticks.length).to.equal(1);
      expect(ticks).to.eql([0]);
    });
  });

  describe("when initialised with multiple subscribers", function() {
    it("should notify all subscribers", function() {

      var spy1 = sinon.spy();
      var spy2 = sinon.spy();
      var spy3 = sinon.spy();
      var timer = new Pomodoro.Timer(1, [spy1, spy2, spy3]);
      
      timer.start();
      clock.tick(1000);

      expect(spy1.calledTwice).to.be.true;
      expect(spy2.calledTwice).to.be.true;
      expect(spy3.calledTwice).to.be.true;
    });
  });
});