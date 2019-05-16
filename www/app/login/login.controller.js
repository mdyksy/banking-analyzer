(function () {
    'use strict';
  
    angular.module('banalyzer').controller('LoginController', loginController);
  
    loginController.$inject = [ 'restFactory', '$ionicModal', '$scope', '$state'];
    function loginController(restFactory, $ionicModal, $scope, $state) {
      let vm = this;

      vm.openRegisterModal = openRegisterModal;
      vm.closeRegisterModal = closeRegisterModal;
      vm.openResendPassModal = openResendPassModal;
      vm.closeResendPassModal = closeResendPassModal;
      vm.registerUser = registerUser;

      function registerUser(email, firstName, surName, password, walletBalance) {
        restFactory.addUser(email, firstName, surName, password, walletBalance).then(
          function() {

            closeRegisterModal();
            $state.go('app.overview');
            
            vm.email = '';
            vm.firstName = '';
            vm.surName = '';
            vm.password = '';
            vm.walletBalance = '';
          });
      }
      
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
  