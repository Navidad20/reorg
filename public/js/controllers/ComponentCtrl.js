app = angular.module('ComponentCtrl', []);
app.controller('TeacherTaskItemCtrl', 
function() {
  var vm = this;

  vm.set = () => {
    vm.onSet(vm.task);
  }
  vm.edit = () => {
    vm.onEdit(vm.task);
  }

  vm.delete = () => {
    vm.onDelete(vm.task);
  }
});