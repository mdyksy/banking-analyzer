(function () {
	'use strict';
	
	angular.module('banalyzer').controller('ExpensesController', expensesController);
	
	expensesController.$inject = [ 'restFactory', '$ionicModal', '$scope'];
	function expensesController(restFactory, $ionicModal, $scope) {
		var vm = this;
		var userId = 291;
		var bankAccId = 1153;
		
		vm.sum = 0;
		vm.bankAccounts = [];
		vm.user = {};
		vm.operations = [];
		vm.addExpense = addExpense;
		vm.openModal = openModal;
		vm.refresh = refresh;
		vm.categories = ['CLOTHES', 'EDUCATION'];
		
		$ionicModal.fromTemplateUrl('app/expenses/expenses.modal.view.html', {
			scope: $scope
		}).then(function(modal) {
			vm.modal = modal;
		});
		
		activate();
		
		function addExpense(ammount, category) {
			console.log(ammount, category);
			closeModal();
		};
		
		function refresh() {
			console.log('refreshing');
		}
		
		function openModal(){
			vm.modal.show();
	 	};
	 	
	 	function closeModal() {
	 		vm.modal.hide();
	 	};
		
		function activate() {
			getUSerById(userId)
				.then(getBankAccountById)
				.then(calculateBankAccountsBalance);
		};
		
		function getUSerById(userId) {
			return restFactory.getUser(userId).then(function(user) {
				vm.user = user;
				vm.sum = user.walletAccount;
				return user.bankAccountId;
			});
		};
		
		function getBankAccountById(id) {
			return restFactory.getBankAccount(id).then(function(bankAccounts) {
				vm.bankAccounts = bankAccounts;
				return bankAccounts;
			});
		};
		
		function calculateBankAccountsBalance(bankAccounts) {
			bankAccounts.forEach(function (bankAccount) {
				getOperationsByBankAccountId(bankAccount.id);
				vm.sum += bankAccount.balance;
			});
		};

		function getOperationsByBankAccountId(bankAccountId) {
			restFactory.getOperationsByType(bankAccountId, "EXPENSE").then(function(operations) {
				vm.operations = vm.operations.concat(operations);
			});
		};
	 	
//		var labels = new Set();
		
		
		/*function convertOperationsToChart(op) {
			var shopSum = 500;
			var restSum = 100;
			op.forEach(function(operation) {
				switch(operation.operationCategory) {
					case 'CLOTHES':
						labels.add('CLOTHES');
						vm.data.push(operation.ammount);
						break;
					case 'EDUCATION':
						labels.add('EDUCATION');
						vm.data.push(operation.ammount);
						break;
					case 'FOOD':
						labels.add('FOOD');
						vm.data.push(operation.ammount);
						break;
					case 'HEALTH':
						labels.add('HEALTH');
						vm.data.push(operation.ammount);
						break;
					case 'HOME':
						labels.add('HOME');
						vm.data.push(operation.ammount);
						break;
					case 'CAR':
						labels.add('CAR');
						vm.data.push(operation.ammount);
						break;
					case 'SHOPPING':
						labels.add('SHOPPING');
						vm.data.push(operation.ammount);
						break;
					case 'TRANSFER':
						labels.add('TRANSFER');
						vm.data.push(operation.ammount);
						break;
					case 'TRAVEL':
						labels.add('TRAVEL');
						vm.data.push(operation.ammount);
						break;
					case 'REST':
						labels.add('REST');
						vm.data.push(operation.ammount);
						break;
				};
			});
			// SET 
			vm.labels = [...labels];
		};*/
	};
})();