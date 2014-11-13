(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }
  var View = Snakes.View = function ($el) {
    this.$el = $el;
    this.board = new Snakes.Board($el);
    this.listener = this.bindKeyHandlers();
    this.interval = setInterval(this.step.bind(this), 100);
  };
  
  View.prototype.bindKeyHandlers = function () {
    var that = this;
    this.$el.on("keydown", function(event) {
      that.handleKeyEvent(event);
    });
  }
  
  View.prototype.step = function () {
    if (!this.board.tick()) {
      $('div').find(".game-over").text("Game Over! ('r' to restart)")
      clearInterval(this.interval);
    }
    this.board.render();
  }
  
  View.prototype.handleKeyEvent = function (event) {
    if (event.keyCode === 37) {
      this.board.snake.turn("W");
    } else if (event.keyCode === 38) {
      this.board.snake.turn("N");
    } else if (event.keyCode === 39) {
      this.board.snake.turn("E");
    } else if (event.keyCode === 40) {
      this.board.snake.turn("S");
    } else if (event.keyCode === 82) {
      location.reload();
    }
  }
})();