'use strict';

(function() {
	// Datacenters Controller Spec
	describe('Datacenters Controller Tests', function() {
		// Initialize global variables
		var DatacentersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Datacenters controller.
			DatacentersController = $controller('DatacentersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Datacenter object fetched from XHR', inject(function(Datacenters) {
			// Create sample Datacenter using the Datacenters service
			var sampleDatacenter = new Datacenters({
				name: 'New Datacenter'
			});

			// Create a sample Datacenters array that includes the new Datacenter
			var sampleDatacenters = [sampleDatacenter];

			// Set GET response
			$httpBackend.expectGET('datacenters').respond(sampleDatacenters);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.datacenters).toEqualData(sampleDatacenters);
		}));

		it('$scope.findOne() should create an array with one Datacenter object fetched from XHR using a datacenterId URL parameter', inject(function(Datacenters) {
			// Define a sample Datacenter object
			var sampleDatacenter = new Datacenters({
				name: 'New Datacenter'
			});

			// Set the URL parameter
			$stateParams.datacenterId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/datacenters\/([0-9a-fA-F]{24})$/).respond(sampleDatacenter);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.datacenter).toEqualData(sampleDatacenter);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Datacenters) {
			// Create a sample Datacenter object
			var sampleDatacenterPostData = new Datacenters({
				name: 'New Datacenter'
			});

			// Create a sample Datacenter response
			var sampleDatacenterResponse = new Datacenters({
				_id: '525cf20451979dea2c000001',
				name: 'New Datacenter'
			});

			// Fixture mock form input values
			scope.name = 'New Datacenter';

			// Set POST response
			$httpBackend.expectPOST('datacenters', sampleDatacenterPostData).respond(sampleDatacenterResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Datacenter was created
			expect($location.path()).toBe('/datacenters/' + sampleDatacenterResponse._id);
		}));

		it('$scope.update() should update a valid Datacenter', inject(function(Datacenters) {
			// Define a sample Datacenter put data
			var sampleDatacenterPutData = new Datacenters({
				_id: '525cf20451979dea2c000001',
				name: 'New Datacenter'
			});

			// Mock Datacenter in scope
			scope.datacenter = sampleDatacenterPutData;

			// Set PUT response
			$httpBackend.expectPUT(/datacenters\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/datacenters/' + sampleDatacenterPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid datacenterId and remove the Datacenter from the scope', inject(function(Datacenters) {
			// Create new Datacenter object
			var sampleDatacenter = new Datacenters({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Datacenters array and include the Datacenter
			scope.datacenters = [sampleDatacenter];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/datacenters\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDatacenter);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.datacenters.length).toBe(0);
		}));
	});
}());