(function() {
	'use strict';

	angular
		.module('banalyzer')
		.factory('restFactory', restFactory);

	restFactory.$inject = [ '$http', 'config' ];
	function restFactory($http, config) {
		var service = {
			getUser : getUser,
			deleteUser: deleteUser,
			addUser: addUser,
			getLimitByCategory: getLimitByCategory,
			getLimitByUserId: getLimitByUserId,
			addLimit: addLimit,
			deleteLimit: deleteLimit,
			getBankAccount: getBankAccount,
			getOperations: getOperations,
			getOperationsByType: getOperationsByType
		};
		return service;

		function getUser(id) {
			return $http.get(config.beUrl + '/user/get/' + id).then(resolve);
		};
		
		function deleteUser(id) {
			return $http.delete(config.beUrl + '/user/delete/' + id).then(resolve);
		};
		
		function addUser(name, email, password, bankAccountId, walletAccount) {
			var user = {
					'fullName': name,
					'email' : email,
					'password': password,
					'bankAccountId': bankAccountId,
					'walletAccount': walletAccount
			};
			return $http.post(config.beUrl + '/user/add', JSON.stringify(user)).then(resolve);
		};

		function getLimitByCategory(category, user) {
			var limit = {
					'category': category,
					'user': user
			};
			return $http.post(config.beUrl + '/limit/get/category', JSON.stringify(limit)).then(resolve);
		};
		
		function getLimitByUserId(id) {
			return $http.get(config.beUrl + '/limit/get/' + id).then(resolve);
		};
		
		function addLimit(ammount, category, user) {
			var limit = {
					'ammount': ammount,
					'category': category,
					'user': user
			};
			return $http.post(config.beUrl + '/limit/add', JSON.stringify(limit)).then(resolve)
		};
		
		function deleteLimit(id) {
			return $http.delete(config.beUrl + '/limit/delete/' + id).then(resolve);
		};
		
		function getBankAccount(id) {
			return $http.get(config.bankingUrl + '/account/get/' + id).then(resolve);
		};
		
		function getOperations(id) {
			return $http.get(config.bankingUrl + '/operation/get/' + id).then(resolve);
		};
		
		function getOperationsByType(id, type) {
			var operation = {
					'accountId': id,
					'type': type
			};
			return $http.post(config.bankingUrl + '/operation/get/type', JSON.stringify(operation), {headers: {'Content-Type': 'application/json'}}).then(resolve);
		};
		
		function resolve(response) {
			return response.data;
		};
		
	};

})();