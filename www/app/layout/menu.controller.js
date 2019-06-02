(function() {
	'use strict';

	angular.module('banalyzer').controller('MenuController', menuController);

	menuController.$inject = [ '$state'];
	function menuController($state) {
    let vm = this;
        
    vm.logout = logout;

    function logout() {       
        console.log('log');
        $state.go('app.user');
    }
  }
})();