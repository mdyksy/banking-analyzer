(function() {
	'use strict';

	angular
		.module('banalyzer')
		.factory('restFactory', restFactory);

	restFactory.$inject = [ '$http', 'config', '$state' ];
	function restFactory($http, config, $state) {
		let service = {
			getUser : getUser,
      		getCategories: getCategories,
      		addOperation: addOperation,
			deleteUser: deleteUser,
			addUser: addUser,
			getLimits: getLimits,
			addLimit: addLimit,
			deleteLimit: deleteLimit,
			getBankAccount: getBankAccount,
			getOperations: getOperations,
			login: login,
			resendPassword: resendPassword,
			resetPassword: resetPassword,
			activateAccount: activateAccount
		};
		return service;

		function resendPassword(email) {
			return $http.get(config.beUrl + '/password/reset/' + email).then(onSuccess, onError);
		}

		function activateAccount(email, token) {
			let data = {
				'email': email,
				'token': token				
			};
			return $http.post(config.beUrl + '/user/activate', data).then(onSuccess, onError);
		}

		function resetPassword(email, token, password) {
			let data = {
				'email': email,
				'token': token,
				'password': password
			};
			return $http.post(config.beUrl + '/password/reset', data).then(onSuccess, onError);
		}

		function login(email, password) {
			let user = {
				'email': email,
				'password': password
			};
			return $http.post(config.beUrl + '/user/login', user).then(onSuccess, onError);
		}

		function getCategories() {
		  return $http.get(config.beUrl + '/dict/categories').then(onSuccess, onError);
    }

		function getUser(email) {
			if (email == null) {
				$state.go('login');		
			}
			return $http.get(config.beUrl + '/user/get/' + email).then(onSuccess, onError);
		}
		
		function deleteUser(id) {
			return $http.delete(config.beUrl + '/user/delete/' + id).then(onSuccess, onError);
		}
		
		function addUser(email, firstName, surname, password, walletBalance) {
			let user = {
				'firstName': firstName,
				'surname': surname,
				'email' : email,
				'password': password,
				'walletBalance': walletBalance
			};
			return $http.post(config.beUrl + '/user/register', user).then(onSuccess, onError);
		}
		
		function getLimits(email) {
      let getAllLimitsReq = {
        'email': email
      };

			return $http.post(config.beUrl + '/limits/get', getAllLimitsReq ).then(onSuccess, onError);
		}
		
		function addLimit(maxAmount, category, email, dateFrom, dateTo) {
			let addLimitReq = {
			  'email': email,
			  'limit': {
          'maxAmount': maxAmount,
          'category': category,
          'dateFrom': dateFrom,
          'dateTo': dateTo
        }
			};
			return $http.post(config.beUrl + '/limits/add', addLimitReq).then(onSuccess, onError);
		}
		
		function deleteLimit(id) {
			return $http.delete(config.beUrl + '/limit/delete/' + id).then(onSuccess, onError);
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

      return $http.post(config.beUrl + '/operations/add', operation).then(onSuccess, onError)
    }
		
		function getBankAccount(id) {
			return $http.get(config.bankingUrl + '/account/get/' + id).then(onSuccess, onError);
		}
		
		function getOperations(email) {
		  let getAllOpReq = {
		    'email': email
      };

			return $http.post(config.beUrl+ '/operations/get', getAllOpReq).then(onSuccess, onError);
		}
		
		function onSuccess(response) {
			return response.data;
		}

		function onError(response) {
			return null;
		}
	}

})();
