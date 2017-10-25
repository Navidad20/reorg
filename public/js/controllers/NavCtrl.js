app = angular.module('NavCtrl', []);

app.controller('NavCtrl', ['$state',
function($state) {
	var vm = this;
	
	User.get_current().then(function(success) {
		vm.user = success;
		console.log(success)
	});
	
}]);