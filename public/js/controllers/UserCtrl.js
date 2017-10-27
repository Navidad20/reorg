app = angular.module('UserCtrl', []); 

app.controller('StudentCtrl', ['$timeout', '$mdSidenav', 'User',
function($timeout, $mdSidenav, User) {
  var vm = this;

  User.get_current().then(function(success) {
    vm.user = success;
  });

  vm.close = function () {
    $mdSidenav('left').close()
  };
  
  vm.toggleLeft = buildDelayedToggler('left');
  
  function debounce(func, wait, context) {
    var timer;
    return function debounced() {
       var context = vm;
       var args = Array.prototype.slice.call(arguments);
       $timeout.cancel(timer);
       timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
       }, wait || 10);
    };
  }

  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID).toggle();
    }, 200);
  };
}]);

app.controller('TeacherCtrl', function($scope) {

});