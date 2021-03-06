app = angular.module('GameCtrl', []);
app.controller('slidingAdvancedCtrl', ['$scope', 'Auth', 'User',
function($scope, Auth, User) {
  var vm = this;
  vm.user = Auth.getUser();
  vm.showSizes = true;
  vm.store = {
    sizes: [
      {title: '3x3', rows: 3, cols: 3, cost: 0, value: 'three'},
      {title: '4x4', rows: 4, cols: 4, cost: 10, value: 'four'},
      {title: '5x5', rows: 5, cols: 5, cost: 20, value: 'five'}
    ],
    images: [
      {title: 'GT Logo', src:'../../img/gatech-logo.png', cost:0, value: 'gt'},
      {title: 'Educational Technology', src:'../../img/edu-tech.png', cost:10, value: 'edu'},
      {title: 'David Joyner', src:'../../img/david-joyner.png', cost:20, value: 'joyner'}
    ]
  }
  vm.puzzle = {
    size: '3x3',
    src: '../../img/gatech-logo.png',
    title: 'GT Logo'
  }

  vm.getData = () => {
    User.get(vm.user.username).then(function(success) {
      vm.userData = success;
    })
  };

  vm.getData();

  vm.updateUser = () => {
    User.put(vm.userData).then(function(success) {
      console.log('Updated User!')
    });
  };

  vm.flipShowSize = () => {
    vm.showSizes = !vm.showSizes;
  }

  vm.purchase = (item) => {
    if (vm.userData.totalReward < item.cost) {
      alert('Insufficent Reward Available!');
    } else {
      vm.userData.totalReward -= item.cost;
      vm.userData.game.store[item.value] = true;
      vm.updateUser();
    }
  }

  vm.setSize = (size) => {
    vm.puzzle.api.solve();
    vm.puzzle.size = size.title;
  }
  vm.setImage = (image) => {
    vm.puzzle.api.solve();
    vm.puzzle.src = image.src;
    vm.puzzle.title = image.title;
  }
}]);
app.factory('slidingPuzzle', function() {
  function shuffle(a) {
    var q;
    for (var j, x, i = a.length; i; j = parseInt(Math.random() * i, 10), x = a[--i], a[i] = a[j], a[j] = x) { q = 0; }
    return a;
  }

  function SlidingPuzzle(rows, cols) {
    /**
     * Puzzle grid
     * @type {Array}
     */
    this.grid = [];

    /**
     * Moves count
     * @type {Number}
     */
    this.moves = 0;

    /**
     * Moves tile
     * @param srow
     * @param scol
     */
    this.move = function(srow, scol) {
      var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]],
          tref, trow, tcol;

      for (var d = 0; d < dirs.length; d++) {
        trow = srow + dirs[d][0];
        tcol = scol + dirs[d][1];
        if (this.grid[trow] && this.grid[trow][tcol] && this.grid[trow][tcol].empty) {
          tref = this.grid[srow][scol];
          this.grid[srow][scol] = this.grid[trow][tcol];
          this.grid[trow][tcol] = tref;
          this.moves++;
        }
      }
    };

    /**
     * Shuffles grid
     */
    this.shuffle = function() {
      var tiles = [];
      this.traverse(function(tile) {
        tiles.push(tile);
      });
      shuffle(tiles);
      this.traverse(function(tile, row, col) {
        this.grid[row][col] = tiles.shift();
      });
      this.moves = 0;
      if (!this.isSolvable())
        this.shuffle();
    };

    /**
     * Checks if puzzle is solvable
     */
    this.isSolvable = function() {
      let tiles = [];
      let inversions = 0;
      this.traverse(function(tile, row, col) {
        tiles.push(tile.id);
      });
      for (let i = 0; i < tiles.length; i++) {
        for (let j = i + 1; j < tiles.length; j++) {
          if (tiles[j] > tiles[i]) {
            inversions++;
          }
        }
      }
      return inversions % 2 === 0;
    };


    /**
     * Solves puzzle
     */
    this.solve = function() {
      var tiles = [];
      this.traverse(function(tile) {
        tiles.push(tile);
      });
      tiles.sort(function(x, y) {
        return (x.id - y.id);
      });
      this.traverse(function(tile, row, col) {
        this.grid[row][col] = tiles.shift();
      });
    };

    /**
     * Is solved?
     * @type {Boolean}
     */
    this.isSolved = function() {
      var id = 1;
      for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
          if (this.grid[row][col].id !== id++) {
              return false;
          }
        }
      }
      return true;
    };

    /**
     * Traverses grid and executes fn on every tile
     * @param fn
     */
    this.traverse = function(fn) {
      for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
          fn.call(this, this.grid && this.grid[row] ? this.grid[row][col] : undefined, row, col);
        }
      }
    };

    // initialize grid
    var id = 1;
    this.traverse(function(tile, row, col) {
      if (!this.grid[row]) {
        this.grid[row] = [];
      }
      this.grid[row][col] = {
        id: id++,
        empty: (row === rows - 1) && (col === cols - 1)
      };
      if (this.grid[row][col].empty) {
        this.empty = this.grid[row][col];
      }
    });
  }

  return function(rows, cols) {
    return new SlidingPuzzle(rows, cols);
  };
});