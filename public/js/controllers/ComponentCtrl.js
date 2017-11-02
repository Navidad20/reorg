app = angular.module('ComponentCtrl', []);
app.controller('TeacherTaskItemCtrl', 
function() {
  var vm = this;

  vm.set = () => {
    console.log(vm.task)
    vm.onSet({item : vm.task});
  }
  vm.edit = () => {
    vm.onEdit(vm.task);
  }

  vm.delete = () => {
    vm.onDelete(vm.task);
  }
});