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
            controller: 'MainController',
            controllerAs: 'vm'
          },
          'content': {
            templateUrl: 'views/home.html',
            controller: 'MainController',
            controllerAs: 'vm'
          }
        }
      })

      // Splash Page Home
      .state('login', {
        url: '/login',
        views: {
          'header': {
            templateUrl: 'views/header.html',
            controller: 'MainController',
            controllerAs: 'vm'
          },
          'content': {
            templateUrl: 'views/login.html',
            controller: 'MainController',
            controllerAs: 'vm'
          }
        }
      })
  
    $locationProvider.html5Mode(true);
  
  }]);