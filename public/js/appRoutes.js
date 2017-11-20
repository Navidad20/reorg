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
            controller: 'NavCtrl',
            controllerAs: 'vm'
          },
          'content': {
            templateUrl: 'views/splash.html',
            controller: 'RegCtrl',
            controllerAs: 'vm'
          }
        }
      })

      // Login Page
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

      // Main student page
      .state('home.student', {
        url: 'student',
        authenticate: 'student',
        views: {
          'content@': {
            templateUrl: 'views/student.html',
            controller: 'StudentCtrl',
            controllerAs: 'vm'
          }
        }
      })

      // Main teacher page
      .state('home.teacher', {
        url: 'teacher',
        authenticate:'teacher',
        views: {
          'content@': {
            templateUrl: 'views/teacher.html',
            controller: 'TeacherCtrl',
            controllerAs: 'vm'
          }
        }
      })
      // Game page
      .state('home.game', {
        url: 'game',
        authenticate:'student',
        views: {
          'content@': {
            templateUrl: 'views/game/main.html',
            controller: 'slidingAdvancedCtrl',
            controllerAs: 'vm'
          }
        }
      })

      // Not authorized page
      .state('home.no-auth', {
        url: 'no-auth',
        views: {
          'content@': {
            templateUrl: 'views/auth/notAuthorized.html',
          }
        }
      })
  
    $locationProvider.html5Mode(true);
  
  }]);