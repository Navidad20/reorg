app = angular.module('components', []);
app.component('teacherTaskItem', {
  templateUrl: 'views/teacher/taskItem.html',
  controller: 'TeacherTaskItemCtrl',
  controllerAs: 'vm',
  bindings: {
    task: '=',
    onSet: '&',
    onDelete: '&',
    onEdit: '&'
  }
});
app.component('sidebar', {
  templateUrl: 'views/navigation/sidebar.html',
  controller: 'SideBarCtrl',
  controllerAs: 'vm',
  bindings: {
    user: '<',
    courses: '<',
    onSet: '&',
    onCreate: '&',
    onAdd: '&',
    onRefresh: '&'
  }
});
app.directive('script', function() {
  return {
    restrict: 'E',
    scope: false,
    link: function(scope, elem, attr) {
      if (attr.type === 'text/javascript-lazy') {
        var code = elem.text();
        var f = new Function(code);
        f();
      }
    }
  };
});