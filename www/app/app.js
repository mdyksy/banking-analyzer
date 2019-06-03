(function() {
	'use strict';

	angular.module('banalyzer', [ 'ionic', 'chart.js' ])

		.run(function($ionicPlatform) {
			$ionicPlatform.ready(function() {
				if (window.cordova && window.cordova.plugins.Keyboard) {
					cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
					cordova.plugins.Keyboard.disableScroll(true);

				}
				if (window.StatusBar) {
					StatusBar.styleDefault();
				}
			});
		})

		.constant('config', {
			'beUrl' : 'http://localhost:8090',
			'bankingUrl' : 'http://localhost:8096'
		})

		.config(function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('login', {
					url : '/',		
					templateUrl : 'app/user/login.view.html',
					controller : 'UserController',
					controllerAs : 'vm'
				})

				.state('app', {
						url : '/app',
						abstract : true,
						templateUrl : 'app/layout/menu.html'
					})

				.state('app.overview', {
					url : '/overview',
					views : {
						'menuContent' : {
							templateUrl : 'app/overview/overview.view.html',
							controller : 'OverviewController',
							controllerAs : 'vm'
						}
					}
				})

				.state('app.incomes', {
					url : '/incomes',
					views : {
						'menuContent' : {
							templateUrl : 'app/incomes/incomes.view.html',
              controller: 'IncomesController',
              controllerAs: 'vm'
						}
					}
				})

				.state('app.expenses', {
					url : '/expenses',
					views : {
						'menuContent' : {
							templateUrl : 'app/expenses/expenses.view.html',
							controller: 'ExpensesController',
							controllerAs: 'vm'
						}
					}
				})

				.state('app.limits', {
					url : '/limits',
					views : {
						'menuContent' : {
							templateUrl : 'app/limits/limits.view.html',
              controller: 'LimitsController',
              controllerAs: 'vm'
						}
					}
				})

				.state('app.raports', {
					url : '/raports',
					views : {
						'menuContent' : {
							templateUrl : 'app/raports/raports.view.html'
						}
					}
				});
			$urlRouterProvider.otherwise('/');
		});
})();