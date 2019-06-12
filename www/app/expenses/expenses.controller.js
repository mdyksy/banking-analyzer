(function () {
	'use strict';
	
	angular.module('banalyzer').controller('ExpensesController', expensesController);
	
	expensesController.$inject = [ 'restFactory', '$ionicModal', '$scope'];
	function expensesController(restFactory, $ionicModal, $scope) {
		let vm = this;
		let email = $scope.login;
    const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec',
      'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
		
		vm.user = {};
		vm.operations = [];
		vm.filteredOperations = [];
		vm.categories = {};
		vm.months = months;
    vm.actualMonth = parseMonth();
		vm.addExpense = addExpense;
		vm.openModal = openModal;
		vm.closeModal = closeModal;
		vm.refresh = activate();
    vm.filterOperations = filterOperations;

		$ionicModal.fromTemplateUrl('app/expenses/expenses.modal.view.html', {
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
        vm.operations = op.operations.EXPENSE;
      });
    }

    function getUserByEmail(email) {
      restFactory.getUser(email).then(function(user) {
        vm.user = user;
      });
    }

		function getCategories() {
		  return restFactory.getCategories().then(function(categories) {
		    vm.categories = categories;
      });
    }

    function filterOperations(month) {
      vm.filteredOperations = vm.operations.filter(function(op) {
        let operationDate = new Date(op.createdOn);
        return operationDate.getMonth() === months.indexOf(month);
      });
    }

		function addExpense(title, amount, category) {
		  restFactory.addOperation(email, title, amount, getCategoryKey(category), 'EXPENSE').then(
		    function() {
          refreshOperations();
          closeModal();

          vm.title = '';
          vm.category = '';
          vm.amount = '';
      });
		}

		function getCategoryKey(category) {
      let categoriesMap = new Map(Object.entries(vm.categories));
      for(const entry of categoriesMap) {
        if(entry[1] === category)
          return entry[0];
      }
    }

		function openModal(){
		  getCategories();
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
