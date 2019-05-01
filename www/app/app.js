(function() {
	'use strict';

	angular.module('banalyzer', [ 'ionic', 'chart.js' ])

		.run(function($ionicPlatform) {
			$ionicPlatform.ready(function() {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				if (window.cordova && window.cordova.plugins.Keyboard) {
					cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
					cordova.plugins.Keyboard.disableScroll(true);

				}
				if (window.StatusBar) {
					// org.apache.cordova.statusbar required
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
							templateUrl : 'app/limits/limits.view.html'
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
			// if none of the above states are matched, use this as the fallback
			$urlRouterProvider.otherwise('/app/overview');
		});

})();
