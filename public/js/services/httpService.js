app = angular.module('httpService', []);
app.factory('Auth', ['$http', '$state',
function($http, $state) {
  let user;
  return {
    register: function(userData) {
      return $http.post('/signup', userData);
    },
    login: function(userData) {
      return $http.post('/login', userData);
    },
    logout: function() {
      return $http.get('/logout');
    },
    getUser: function() {
      return user ? user : null;
    },
    setUser: function(newUser) {
      user = newUser;
    },
    student: function() {
      if (!user) return false;
      return !user.isTeacher;
    },
    teacher: function() {
      if (!user) return false;
      return user.isTeacher;
    }
  }

}]);

app.factory('User', ['$http', '$state', '$q',
function($http, $state, $q) {
  let user;
  return {
    getCurrent: function() {
      if (!user) {
        $http.get('/api/users/current').then(function(success) {
          user = success.data;
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
    },
    getCourses: function(username) {
      return $http.get('/api/users/' + username + '/courses')
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    },
    getTasks: function(username) {
      return $http.get('/api/users/' + username + '/mytasks')
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    },
    put: function(user) {
      return $http.put('/api/users', user)
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    },
    putCourse: function(username, course) {
      const package = { username: username, course: course };
      return $http.put('/api/users/course', package)
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    }
  }
}]);

app.factory('Course', ['$http', '$state', '$q',
function($http, $state, $q) {
  return {
    get: function(course) {
      return $http.get('/api/courses/' + course)
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    },
    getAll: function() {
      return $http.get('/api/courses')
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    },
    getTasks: function(course) {
      return $http.get('/api/courses/' + course + '/tasks')
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    },
    post: function(course) {
      return $http.post('/api/courses', course)
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    },
    put: function(course) {
      return $http.put('/api/courses', course)
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    },
    putTask: function(course, task) {
      const package = {course: course, task: task};
      return $http.put('/api/courses/task', package)
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    },
    delete: function(course) {
      return $http.delete('/api/courses/' + course)
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    },
  }
}]);

app.factory('Task', ['$http', '$state', '$q',
function($http, $state, $q) {
  return {
    get: function(taskID) {
      return $http.get('/api/tasks/' + taskID)
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    },
    post: function(task) {
      return $http.post('/api/tasks', task)
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    },
    put: function(task) {
      return $http.put('/api/tasks', task)
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    },
    delete: function(taskID) {
      return $http.delete('/api/tasks/' + taskID)
      .then(function(success) {
          return success.data;
      }, function(error) {
          return $q.reject(error);
      });
    },
  }
}]);