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

app.factory('User', ['$http', '$state',
function($http, $state) {
return {
  get_current: function() {
    return $http.get('/api/users/current');
  },
  get: function(username) {
    return $http.get('/api/users/' + username);
  }
}

}]);