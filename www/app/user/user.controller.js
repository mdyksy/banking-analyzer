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
    vm.openResetPassModal = openResetPassModal;
    vm.closeResetPassModal = closeResetPassModal;
    vm.openActivateModal = openActivateModal;
    vm.closeActivateModal = closeActivateModal;
    vm.register = register;
    vm.login = login;
    vm.resend = resend;
    vm.resetPassword = resetPassword;
    vm.activateAccount = activateAccount;

    function activateAccount(email, token) {
      restFactory.activateAccount(email, token).then(
        function(val) {
          if(val !== null) {
            $state.go('app.overview');
            closeActivateModal();

            vm.email = '';
            vm.token = '';
          } else {
            
          }
        }); 
    }

    function login(email, password) {
      restFactory.login(email, password).then(
        function(val) {
          if(val !== null) {
            $state.go('app.overview');
            $scope.login = email;
            
            vm.email = '';
            vm.password = '';
          } else {
            console.log('error');
          }
        });
    }

    function resend(email) {
      restFactory.resendPassword(email).then(
        function(val) {
          if(val !== null) {
            closeResendPassModal();
            openResetPassModal();
            vm.email = '';
          } else {

          }
        });
    }

    function resetPassword(email) {
      restFactory.resetPassword(email).then(
        function(val) {
          if(val !== null) {
            closeResetPassModal();
            
            vm.email = '';
          } else {
            
          }
        });
    }

    function register(email, firstName, surName, password, walletBalance) {
      restFactory.addUser(email, firstName, surName, password, walletBalance).then(
        function(val) {
          if(val !== null) {
            closeRegisterModal();
            openActivateModal();
            
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

    $ionicModal.fromTemplateUrl('app/user/resetPass.modal.view.html', {
      scope: $scope
    }).then(function(modal) {
      vm.resetPassModal = modal;
    });

    $ionicModal.fromTemplateUrl('app/user/activate.modal.view.html', {
      scope: $scope
    }).then(function(modal) {
      vm.activateModal = modal;
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

    function openResetPassModal(){
      vm.resetPassModal.show();
    }

    function closeResetPassModal() {
      vm.resetPassModal.hide();
    }

    function openActivateModal(){
      vm.activateModal.show();
    }

    function closeActivateModal() {
      vm.activateModal.hide();
    }
  }
})();
  