app = angular.module('components', []);
app.directive('slidingPuzzle', function(slidingPuzzle) {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'views/game/puzzle.html',
    scope: {
      size: '@',
      src: '@',
      api: '='
    },
    link: function(scope, element, attrs) {
      let rows;
      let cols;
      let loading = true;
      let image = new Image();

      function create() {
        scope.puzzle = slidingPuzzle(rows, cols);
        if (attrs.api) scope.api = scope.puzzle;
        tile();
      }

      function tile() {
        if (loading) return;
        let width = image.width / cols;
        let height = image.height / rows;

        scope.puzzle.traverse(function(tile, row, col) {
          tile.style = {
            width: width + 'px',
            height: height + 'px',
            background: (tile.empty ? 'none' : "url('" + scope.src + "') no-repeat -" + (col * width) + 'px -' + (row * height) + 'px')
          };
        });
        scope.puzzle.shuffle();
      }

      attrs.$observe('size', function(size) {
        size = size.split('x');
        if (size[0] >= 2 && size[1] >= 2) {
          rows = size[0];
          cols = size[1];
          create();
        }
      });

      attrs.$observe('src', function(src) {
        loading = true;
        image.src = src;
        image.onload = function() {
          loading = false;
          scope.$apply(function() {
            tile();
          });
        };
      });
    }
  };
});