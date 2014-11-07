'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Datacenter = mongoose.model('Datacenter'),
	_ = require('lodash');

/**
 * Create a Datacenter
 */
exports.create = function(req, res) {
	var datacenter = new Datacenter(req.body);
	datacenter.user = req.user;

	datacenter.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(datacenter);
		}
	});
};

/**
 * Show the current Datacenter
 */
exports.read = function(req, res) {
	res.jsonp(req.datacenter);
};

/**
 * Update a Datacenter
 */
exports.update = function(req, res) {
	var datacenter = req.datacenter ;

	datacenter = _.extend(datacenter , req.body);

	datacenter.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(datacenter);
		}
	});
};

/**
 * Delete an Datacenter
 */
exports.delete = function(req, res) {
	var datacenter = req.datacenter ;

	datacenter.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(datacenter);
		}
	});
};

/**
 * List of Datacenters
 */
exports.list = function(req, res) { Datacenter.find().sort('-created').populate('user', 'displayName').exec(function(err, datacenters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(datacenters);
		}
	});
};

/**
 * Datacenter middleware
 */
exports.datacenterByID = function(req, res, next, id) { Datacenter.findById(id).populate('user', 'displayName').exec(function(err, datacenter) {
		if (err) return next(err);
		if (! datacenter) return next(new Error('Failed to load Datacenter ' + id));
		req.datacenter = datacenter ;
		next();
	});
};

/**
 * Datacenter authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.datacenter.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};