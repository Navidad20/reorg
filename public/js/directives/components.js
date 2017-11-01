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
// app.component('sidebar', {
//   templateUrl: 'views/navigation/sidebar.html',
//   controller: 'SideBarCtrl',
//   controllerAs: 'vm',
//   bindings: {
//     user: '<',
//     courses: '<',
//     onSet: '&',
//     onCreate: '&',
//     onAdd: '&',
//     onRefresh: '&'
//   }
// });