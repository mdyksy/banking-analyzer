(function () {
  'use strict';

  angular.module('banalyzer').controller('LimitsController', limitsController);

  limitsController.$inject = [ 'restFactory', '$ionicModal', '$scope'];
  function limitsController(restFactory, $ionicModal, $scope) {
    let vm = this;
    let email = 'm.dyksy95@gmail.com';

    vm.categories = {};
    vm.limits = [];
    vm.openModal = openModal;
    vm.closeModal = closeModal;
    vm.addLimit = addLimit;
    vm.refresh = activate;

    $ionicModal.fromTemplateUrl('app/limits/limits.modal.view.html', {
      scope: $scope
    }).then(function(modal) {
      vm.modal = modal;
    });

    activate();

    function activate() {
      refreshLimits();
    }

    function refreshLimits() {
      console.log('ref');
      restFactory.getLimits(email).then(function(l) {
        vm.limits = l.limits;
      });
    }

    function getCategories() {
      return restFactory.getCategories().then(function(categories) {
        vm.categories = categories;
      });
    }

    function getCategoryKey(category) {
      let categoriesMap = new Map(Object.entries(vm.categories));
      for(const entry of categoriesMap) {
        if(entry[1] === category)
          return entry[0];
      }
    }

    function addLimit(amount, category, dateFrom, dateTo) {
      restFactory.addLimit(amount, getCategoryKey(category), email, dateFrom, dateTo).then(
        function() {
          refreshLimits();
          closeModal();

          vm.amount = '';
          vm.category = '';
          vm.dateFrom = '';
          vm.dateTo = '';
        });
    }

    function openModal(){
      getCategories();
      vm.modal.show();
    }

    function closeModal() {
      vm.modal.hide();
    }
  }
})();
