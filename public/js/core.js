// public/js/app.js
angular.module('reOrg', [
  'ngRoute',
  'ngSanitize',
  'ui.router',
  'ngMaterial',
  'appRoutes', 
  'httpService',
  'components',
  'AuthCtrl',
  'ComponentCtrl',
  'NavCtrl',
  'UserCtrl'
])
.run(function ($rootScope, $state, Auth) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    function redirect() {
      $state.transitionTo("home.login");
      event.preventDefault();
    };
    function notAuthorized() {
      $state.transitionTo("home.no-auth");
      event.preventDefault();
    };

    if (toState.authenticate) {
      const user = Auth.getUser()
      const role = toState.authenticate;
      if (!user) redirect();

      if (role === 'teacher' && Auth.student())
        notAuthorized();
      else if (role === 'student' && Auth.teacher())
        notAuthorized();
    };
  });
});

