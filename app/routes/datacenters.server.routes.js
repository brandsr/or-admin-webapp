'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var datacenters = require('../../app/controllers/datacenters');

	// Datacenters Routes
	app.route('/datacenters')
		.get(datacenters.list)
		.post(users.requiresLogin, datacenters.create);

	app.route('/datacenters/:datacenterId')
		.get(datacenters.read)
		.put(users.requiresLogin, datacenters.hasAuthorization, datacenters.update)
		.delete(users.requiresLogin, datacenters.hasAuthorization, datacenters.delete);

	// Finish by binding the Datacenter middleware
	app.param('datacenterId', datacenters.datacenterByID);
};