'use strict';

// Configuring the Articles module
angular.module('datacenters').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Datacenters', 'datacenters', 'dropdown', '/datacenters(/create)?');
		Menus.addSubMenuItem('topbar', 'datacenters', 'List Datacenters', 'datacenters');
		Menus.addSubMenuItem('topbar', 'datacenters', 'New Datacenter', 'datacenters/create');
	}
]);