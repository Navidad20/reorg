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