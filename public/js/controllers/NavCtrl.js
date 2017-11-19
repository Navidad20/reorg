app = angular.module('NavCtrl', []);

app.controller('NavCtrl', ['$state', '$rootScope', 'User', 'Auth',
function($state, $rootScope, User, Auth) {
	var vm = this;
	vm.user = Auth.getUser();

	vm.logout = () => {
		Auth.logout().then(function(success) {
      Auth.setUser(null);
      vm.user = null;
      if (success) 
        $state.go('home');
		})
  };
  
  vm.taskManager = () => {
    if (vm.user.isTeacher) {
      $state.go('home.teacher')
    } else {
      $state.go('home.student')
    }
  }

	$rootScope.$on('userLoggedIn', function () {
    vm.user = Auth.getUser();
	});
	
	
}]);