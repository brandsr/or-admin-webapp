'use strict';

//Setting up route
angular.module('datacenters').config(['$stateProvider',
	function($stateProvider) {
		// Datacenters state routing
		$stateProvider.
		state('listDatacenters', {
			url: '/datacenters',
			templateUrl: 'modules/datacenters/views/list-datacenters.client.view.html'
		}).
		state('createDatacenter', {
			url: '/datacenters/create',
			templateUrl: 'modules/datacenters/views/create-datacenter.client.view.html'
		}).
		state('viewDatacenter', {
			url: '/datacenters/:datacenterId',
			templateUrl: 'modules/datacenters/views/view-datacenter.client.view.html'
		}).
		state('editDatacenter', {
			url: '/datacenters/:datacenterId/edit',
			templateUrl: 'modules/datacenters/views/edit-datacenter.client.view.html'
		});
	}
]);