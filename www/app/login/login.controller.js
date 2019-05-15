(function () {
    'use strict';
  
    angular.module('banalyzer').controller('LoginController', loginController);
  
    loginController.$inject = [ 'restFactory', '$ionicModal', '$scope'];
    function loginController(restFactory, $ionicModal, $scope) {
      let vm = this;
      let email = 'm.dyksy95@gmail.com';
  
      vm.openRegisterModal = openRegisterModal;
      vm.closeRegisterModal = closeRegisterModal;
      vm.openResendPassModal = openResendPassModal;
      vm.closeResendPassModal = closeResendPassModal;

      $ionicModal.fromTemplateUrl('app/login/register.modal.view.html', {
        scope: $scope
      }).then(function(modal) {
        vm.registerModal = modal;
      });
  
      $ionicModal.fromTemplateUrl('app/login/resendPass.modal.view.html', {
        scope: $scope
      }).then(function(modal) {
        vm.resendPassModal = modal;
      });
  
      function openRegisterModal(){
        vm.registerModal.show();
      }
  
      function closeRegisterModal() {
        vm.registerModal.hide();
      }

      function openResendPassModal(){
        vm.resendPassModal.show();
      }
  
      function closeResendPassModal() {
        vm.resendPassModal.hide();
      }
    }
  })();
  