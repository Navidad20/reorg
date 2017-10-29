app = angular.module('NavCtrl', []);

app.controller('NavCtrl', ['$state', 'User', '$rootScope',
function($state, User, $rootScope) {
	var vm = this;
	
	const getUser = () => {
		User.getCurrent().then(function(success) {
			vm.user = success;
		});
	};

	vm.logout = () => {
		console.log('Not Implemented');
	};

	$rootScope.$on('userLoggedIn', function () {
    getUser();
	});
	
	getUser();
}]);