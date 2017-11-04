app = angular.module('NavCtrl', []);

app.controller('NavCtrl', ['$state', '$rootScope', 'User', 'Auth',
function($state, $rootScope, User, Auth) {
	var vm = this;
	
	const getUser = () => {
		User.getCurrent().then(function(success) {
			vm.user = success;
		});
	};

	vm.logout = () => {
		Auth.logout().then(function(success) {
			if (success) $state.go('home');
		})
	};

	$rootScope.$on('userLoggedIn', function () {
    getUser();
	});
	
	getUser();
}]);