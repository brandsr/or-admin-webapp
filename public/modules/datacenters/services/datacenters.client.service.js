'use strict';

//Datacenters service used to communicate Datacenters REST endpoints
angular.module('datacenters').factory('Datacenters', ['$resource',
	function($resource) {
		return $resource('datacenters/:datacenterId', { datacenterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);