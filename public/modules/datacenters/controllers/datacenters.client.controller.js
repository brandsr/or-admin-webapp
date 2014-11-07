'use strict';

// Datacenters controller
angular.module('datacenters').controller('DatacentersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Datacenters',
	function($scope, $stateParams, $location, Authentication, Datacenters ) {
		$scope.authentication = Authentication;

		// Create new Datacenter
		$scope.create = function() {
			// Create new Datacenter object
			var datacenter = new Datacenters ({
				name: this.name
			});

			// Redirect after save
			datacenter.$save(function(response) {
				$location.path('datacenters/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Datacenter
		$scope.remove = function( datacenter ) {
			if ( datacenter ) { datacenter.$remove();

				for (var i in $scope.datacenters ) {
					if ($scope.datacenters [i] === datacenter ) {
						$scope.datacenters.splice(i, 1);
					}
				}
			} else {
				$scope.datacenter.$remove(function() {
					$location.path('datacenters');
				});
			}
		};

		// Update existing Datacenter
		$scope.update = function() {
			var datacenter = $scope.datacenter ;

			datacenter.$update(function() {
				$location.path('datacenters/' + datacenter._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Datacenters
		$scope.find = function() {
			$scope.datacenters = Datacenters.query();
		};

		// Find existing Datacenter
		$scope.findOne = function() {
			$scope.datacenter = Datacenters.get({ 
				datacenterId: $stateParams.datacenterId
			});
		};
	}
]);