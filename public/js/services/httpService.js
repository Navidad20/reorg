app = angular.module('httpService', []);
app.factory('Auth', ['$http', '$state',
  function($http, $state) {
  return {
    register: function(userData) {
      return $http.post('/signup', userData);
    },
    login: function(userData) {
      return $http.post('/login', userData);
    }
  }

}]);

app.factory('User', ['$http', '$state', '$q',
function($http, $state, $q) {
  let user = {};
  return {
    get_current: function() {
      if (!user.username) {
        user = $http.get('/api/users/current')
          .then(function(success) {
            return success.data;
          });
      }
      return user;
    },
    get: function(username) {
      return $http.get('/api/users/' + username)
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    }
  }
}]);