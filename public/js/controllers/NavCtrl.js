app = angular.module('NavCtrl', []);

app.controller('NavCtrl', ['$state', 'User', '$rootScope',
function($state, User, $rootScope) {
	var vm = this;
	
	const get_user = () => {
		User.get_current().then(function(success) {
			vm.user = success;
		});
	};

	vm.logout = () => {
		console.log('Not Implemented');
	};

	$rootScope.$on('userLoggedIn', function () {
    get_user();
	});
	
	get_user();
}]);