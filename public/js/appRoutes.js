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
        authenticate: { require: false },
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
        authenticate: { require: false },
        views: {
          'content@': {
            templateUrl: 'views/auth/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'vm'
          }
        }
      })

      // Splash Page Home
      .state('home.student', {
        url: 'student',
        authenticate: { require: true, role: 'student' },
        views: {
          'content@': {
            templateUrl: 'views/student.html',
            controller: 'StudentCtrl',
            controllerAs: 'vm'
          }
        }
      })

      // Splash Page Home
      .state('home.teacher', {
        url: 'teacher',
        authenticate: { require: true, role: 'teacher' },
        views: {
          'content@': {
            templateUrl: 'views/teacher.html',
            controller: 'TeacherCtrl',
            controllerAs: 'vm'
          }
        }
      })
  
    $locationProvider.html5Mode(true);
  
  }]);