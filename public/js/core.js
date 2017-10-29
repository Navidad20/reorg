// public/js/app.js
angular.module('reOrg', [
  'ngRoute',
  'ngSanitize',
  'ui.router',
  'ngMaterial',
  'appRoutes', 
  'httpService',
  'AuthCtrl',
  'NavCtrl',
  'UserCtrl'
])
.run(function ($rootScope, $state, User) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    function redirect() {
      $state.transitionTo("home.login");
      event.preventDefault();
    };

    if (toState.authenticate.require) {
      User.getCurrent().then(function(user) {
        if (angular.equals({}, user)) {
          console.log('hit')
          redirect();
        } else {
          const role = toState.authenticate.role;
          if (role === 'teacher' && !user.isTeacher) {
            redirect();
          } else if (role === 'student' && user.isTeacher) {
            redirect();
          };
        }
      });
    };
  });
});

