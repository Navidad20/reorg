// public/js/appRoutes.js
app = angular.module('appRoutes', []);
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $urlRouterProvider.rule(function($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path[path.length-1] === '/';
      if(hasTrailingSlash) {
        var newPath = path.substr(0, path.length - 1);
        return newPath;
      }
    });

    $stateProvider

      // Splash Page Home
      .state('home', {
        url: '/',
        views: {
          'header': {
            templateUrl: 'views/header.html',
            controller: 'RegCtrl',
            controllerAs: 'vm'
          },
          'content': {
            templateUrl: 'views/splash.html',
            controller: 'RegCtrl',
            controllerAs: 'vm'
          }
        }
      })

      // Splash Page Home
      .state('home.login', {
        url: 'login',
        views: {
          'content@': {
            templateUrl: 'views/auth/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'vm'
          }
        }
      })
  
    $locationProvider.html5Mode(true);
  
  }]);