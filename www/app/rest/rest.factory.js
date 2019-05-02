(function() {
	'use strict';

	angular
		.module('banalyzer')
		.factory('restFactory', restFactory);

	restFactory.$inject = [ '$http', 'config' ];
	function restFactory($http, config) {
		let service = {
			getUser : getUser,
      getCategories: getCategories,
      addOperation: addOperation,
			deleteUser: deleteUser,
			addUser: addUser,
			getLimitByCategory: getLimitByCategory,
			getLimits: getLimits,
			addLimit: addLimit,
			deleteLimit: deleteLimit,
			getBankAccount: getBankAccount,
			getOperations: getOperations,
			getOperationsByType: getOperationsByType
		};
		return service;

		function getCategories() {
		  return $http.get(config.beUrl + '/categories').then(resolve);
    }

		function getUser(email) {
			return $http.get(config.beUrl + '/user/get/' + email).then(resolve);
		}
		
		function deleteUser(id) {
			return $http.delete(config.beUrl + '/user/delete/' + id).then(resolve);
		}
		
		function addUser(firstName, surname, email, password, bankAccountId, walletAccount) {
			let user = {
					'firstName': firstName,
          'surname': surname,
					'email' : email,
					'password': password,
					'bankAccountId': bankAccountId
			};
			return $http.post(config.beUrl + '/user/add', JSON.stringify(user)).then(resolve);
		}

		function getLimitByCategory(category, user) {
			let limit = {
					'category': category,
					'user': user
			};
			return $http.post(config.beUrl + '/limit/get/category', JSON.stringify(limit)).then(resolve);
		}
		
		function getLimits(email) {
      let getAllLimitsReq = {
        'email': email
      };

			return $http.post(config.beUrl + '/limits/get', getAllLimitsReq ).then(resolve);
		}
		
		function addLimit(amount, category, email, dateFrom, dateTo) {
			let addLimitReq = {
			  'limit': {
          'amount': amount,
          'category': category,
          'email': email,
          'dateFrom': dateFrom,
          'dateTo': dateTo
        }
			};
			return $http.post(config.beUrl + '/limits/add', addLimitReq).then(resolve)
		}
		
		function deleteLimit(id) {
			return $http.delete(config.beUrl + '/limit/delete/' + id).then(resolve);
		}

		function addOperation(email, title, amount, category, type) {
		  let operation = {
        'operation': {
          'email': email,
          'title': title,
          'amount': amount,
          'category': category,
          'type': type
        }
		  };

      return $http.post(config.beUrl + '/addOperation', operation).then(resolve)
    }
		
		function getBankAccount(id) {
			return $http.get(config.bankingUrl + '/account/get/' + id).then(resolve);
		}
		
		function getOperations(email) {
		  let getAllOpReq = {
		    'email': email
      };

			return $http.post(config.beUrl+ '/operations', getAllOpReq).then(resolve);
		}
		
		function getOperationsByType(id, type) {
			let operation = {
					'accountId': id,
					'type': type
			};
			return $http.post(config.bankingUrl + '/operation/get/type', JSON.stringify(operation), {headers: {'Content-Type': 'application/json'}}).then(resolve);
		}
		
		function resolve(response) {
			return response.data;
		}
		
	}

})();
