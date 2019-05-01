(function () {
	'use strict';
	
	angular.module('banalyzer').controller('IncomesController', incomesController);
	
	incomesController.$inject = [ 'restFactory', '$ionicModal', '$scope'];
	function incomesController(restFactory, $ionicModal, $scope) {
		let vm = this;
		let email = 'm.dyksy95@gmail.com';
    const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec',
      'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
		
		vm.user = {};
		vm.operations = [];
		vm.filteredOperations = [];
		vm.months = months;
    vm.actualMonth = parseMonth();
		vm.addIncome = addIncome;
		vm.openModal = openModal;
		vm.closeModal = closeModal;
		vm.refresh = activate();
    vm.filterOperations = filterOperations;

		$ionicModal.fromTemplateUrl('app/incomes/incomes.modal.view.html', {
			scope: $scope
		}).then(function(modal) {
			vm.modal = modal;
		});

		activate();

    function activate() {
      refreshOperations();
      getUserByEmail(email);
    }

    function refreshOperations() {
      restFactory.getOperations(email).then(function(op) {
        vm.operations = op.operations.INCOME;
      });
    }

    function getUserByEmail(email) {
      restFactory.getUser(email).then(function(user) {
        vm.user = user;
      });
    }

    function filterOperations(month) {
      vm.filteredOperations = vm.operations.filter(function(op) {
        let operationDate = new Date(op.createdOn);
        return operationDate.getMonth() === months.indexOf(month);
      });
    }

		function addIncome(title, amount, category) {
		  restFactory.addOperation(email, title, amount, "CASH", 'INCOME').then(
        function() {
          refreshOperations();
          closeModal();

          vm.title = '';
          vm.amount = '';
      });
		}

		function openModal(){
			vm.modal.show();
	 	}

	 	function closeModal() {
		  vm.modal.hide();
	 	}

		function parseMonth() {
		  let curMonth = new Date().getMonth();
		  return months[curMonth];
    }
	}
})();
