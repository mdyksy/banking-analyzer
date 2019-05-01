(function() {
	'use strict';

	angular.module('banalyzer').controller('OverviewController', overviewController);

	overviewController.$inject = [ 'restFactory' ];
	function overviewController(restFactory) {
		let vm = this;
		let email = "m.dyksy95@gmail.com";
		let bankAccId = 1153;
		let labels = new Set();

    vm.sum = 0;
		vm.bankAccounts = [];
		vm.user = {};
		vm.operations = [];
		vm.colors = ['#ff541c', '#99ff99'];
		vm.labels = ['Wydatki (zł)', 'Przychody (zł)'];
		vm.series = ['Podsumowanie'];
		vm.data = [0, 0];

		let headers = {
				'Content-Type': 'application/json',
				'ApplicationKey': 'qwerty'
		};

		activate();
		
		function activate() {
      getUserByEmail(email);
      getOperations()
        .then(convertOperationsToChart);
      getOperations()
        .then(setAllOperations);
		}

    function getUserByEmail(email) {
		  vm.sum = 0;
      restFactory.getUser(email).then(function(user) {
        vm.user = user;
        vm.sum = user.walletBalance;
      });
    }

    function setAllOperations(operations) {
		  operations.INCOME.forEach(function(inc) {
		    vm.operations.push(inc);
      });
      operations.EXPENSE.forEach(function(exp) {
        vm.operations.push(exp);
      });
    }

    function getOperations() {
      return restFactory.getOperations(email).then(function(op) {
        return op.operations;
      });
    }

		function convertOperationsToChart(operations) {
		  let incomes = operations.INCOME;
      let expenses = operations.EXPENSE;
      vm.data = [0, 0];

      incomes.forEach(function (inc) {
        vm.data[1] += inc.amount;
			});
      expenses.forEach(function (exp) {
        vm.data[0] += exp.amount;
      });
		}
	}
})();
