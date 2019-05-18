(function () {
    'use strict';
  
    angular.module('banalyzer').controller('UserController', userController);
  
    userController.$inject = [ 'restFactory', '$ionicModal', '$scope', '$state'];
    function userController(restFactory, $ionicModal, $scope, $state) {
      let vm = this;

      vm.openRegisterModal = openRegisterModal;
      vm.closeRegisterModal = closeRegisterModal;
      vm.openResendPassModal = openResendPassModal;
      vm.closeResendPassModal = closeResendPassModal;
      vm.register = register;
      vm.login = login;

      function login(email, password) {
        restFactory.login(email, password).then(
          function(val) {
            if(val !== null) {
              $state.go('app.overview');
              
              vm.email = '';
              vm.password = '';
            } else {
              
            }
          });
      }

      function register(email, firstName, surName, password, walletBalance) {
        restFactory.addUser(email, firstName, surName, password, walletBalance).then(
          function(val) {
            if(val !== null) {
              closeRegisterModal();
              $state.go('app.overview');
              
              vm.email = '';
              vm.firstName = '';
              vm.surName = '';
              vm.password = '';
              vm.walletBalance = '';
            } else {
              
            }
          });
      }
      
      $ionicModal.fromTemplateUrl('app/user/register.modal.view.html', {
        scope: $scope
      }).then(function(modal) {
        vm.registerModal = modal;
      });
  
      $ionicModal.fromTemplateUrl('app/user/resendPass.modal.view.html', {
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
  