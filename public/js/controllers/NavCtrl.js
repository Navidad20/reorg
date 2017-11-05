app = angular.module('NavCtrl', []);

app.controller('NavCtrl', ['$state', '$rootScope', 'User', 'Auth',
function($state, $rootScope, User, Auth) {
	var vm = this;
	vm.user = Auth.getUser();

	vm.logout = () => {
		Auth.logout().then(function(success) {
			if (success) $state.go('home');
		})
	};

	$rootScope.$on('userLoggedIn', function () {
    vm.user = Auth.getUser();
	});
	
	
}]);