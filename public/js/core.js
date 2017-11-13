// public/js/app.js

var types = [
  { id: 'sliding-puzzle', title: 'Sliding puzzle' },
  { id: 'word-search-puzzle', title: 'Word search puzzle' }
];
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
  'UserCtrl',
  'GameCtrl'
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
})
.run(function($rootScope, $route, $filter) {
  $rootScope.types = types;
  $rootScope.type = types[0].id;

  // set type on route change
  $rootScope.$on('$routeChangeSuccess', function(event, route) {
      $rootScope.type = ($filter('filter')(types, { id: route.params.type }).length ? route.params.type : types[0].id);
  });
});

