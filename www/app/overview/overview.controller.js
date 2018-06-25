(function() {
	'use strict';

	angular.module('banalyzer').controller('OverviewController', overviewController);

	overviewController.$inject = [ 'restFactory' ];
	function overviewController(restFactory) {
		var vm = this;
		var userId = 291;
		var bankAccId = 1153;
		var labels = new Set();

		vm.sum = 0;
		vm.bankAccounts = [];
		vm.user = {};
		vm.operations = [];
		vm.colors = ['#ff541c', '#99ff99'];
		vm.labels = ['Wydatki', 'Przychody'];
		vm.series = ['Podsumowanie'];
		vm.data = [0, 0];
		
		var headers = {
				'Content-Type': 'application/json',
				'ApplicationKey': 'qwerty'
		};
		
		activate();
		
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
			restFactory.getOperations(bankAccountId).then(function(operations) {
				convertOperationsToChart(operations);
				vm.operations = vm.operations.concat(operations);
			});
		};
		
		function convertOperationsToChart(operations) {
			operations.forEach(function (operation) {
				if(operation.operationType == 'EXPENSE')
					vm.data[0] += operation.ammount;
				else
					vm.data[1] += operation.ammount;
			});
		};
	};
})();