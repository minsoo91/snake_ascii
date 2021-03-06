(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }
  
  var Snake = Snakes.Snake = function () {
    this.segments = [new Snakes.Coord(5, 5)];
    this.dir = "S";
  };
  
  Snake.prototype.move = function () {
    this.segments.unshift(this.segments[0].plus(this.dir));
  };
  
  Snake.prototype.turn = function (newDir) {
    this.dir = newDir;
  };

  Snake.prototype.segmentUpdate = function () {

  }
  
  var Coord = Snakes.Coord = function (row, col) {
    this.row = row;
    this.col = col;
  };
  
  Coord.prototype.plus = function (dir) {
    var row = this.row;
    var col = this.col;
    if (dir === "N") {
      row = this.row - 1;
    } else if (dir === "S") {
      row = this.row + 1;
    } else if (dir === "E") {
      col = this.col + 1;
    } else if (dir === "W") {
      col = this.col - 1;
    }
    
    return new Coord(row, col);
  };
  
  var Board = Snakes.Board = function ($el) {
    this.snake = new Snake();
    this.grid = Board.makeGrid();
    this.seeded = 0;
    this.$el = $el;
    this.points = 0;
  }
  
  Board.makeGrid = function () {
    var grid = [];

    for (var i = 0; i < 20; i++) {
      grid.push([]);
      for (var j = 0; j < 20; j++) {
        grid[i].push(null);
      }
    }

    return grid;
  };
  //
  //if typeof Coord(i, j).exists? in this.snake.segment
  
  Board.prototype.render = function () {
    var megaString = "";
    this.$el.empty();
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        if (this.grid[i][j] === null) {
          megaString = "<div class='square' id='empty'></div>";
        } else if (this.grid[i][j] == "S"){
          megaString = "<div class='square' id='snake'></div>";
        } else if (this.grid[i][j] == "A"){
          megaString = "<div class='square' id='apple'></div>";
        }
        this.$el.append(megaString)
      }
    }
  };
  
  Board.prototype.seedApples = function() {

    while (this.seeded !== 2) {
      if (row && col && this.grid[row][col] === null) {
        this.grid[row][col] = "A"
        this.seeded += 1
      } 
      var row = Math.floor(Math.random() * 20);
      var col = Math.floor(Math.random() * 20);
    }
  }

  Board.prototype.tick = function(){
    this.snake.move();

    var that = this;
    if (this.snake.segments[0].row >= 0 && this.snake.segments[0].row < 20 
     && this.snake.segments[0].col >= 0 && this.snake.segments[0].col < 20) {
      if (this.grid[this.snake.segments[0].row][this.snake.segments[0].col] === "S") {
        return false
      } else if (!(this.grid[this.snake.segments[0].row][this.snake.segments[0].col] === "A")) {
        this.snake.segments.pop();
      } else if (this.grid[this.snake.segments[0].row][this.snake.segments[0].col] === "A") {
        this.seeded = 1
        this.points += 1
        $('div').find(".points-display").text("Score: " + this.points)
      } 
      for (i = 0; i < 20; i++) {
        for (j = 0; j < 20; j++) {
          if (that.grid[i][j] === "S") {
            that.grid[i][j] = null
            this.snake.segments.forEach(function(segment) {
              if (i === segment.row && j === segment.col) {
                that.grid[i][j] = "S"
              }
            })
          }
        }
      }
      this.snake.segments.forEach(function(segment){
        that.grid[segment.row][segment.col] = "S"
      })
      this.seedApples();
      return true
    } else {
      console.log("out of range!!!")
      return false
    }
  };
})();

