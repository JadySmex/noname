/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * Module - Core
 * MainCtrl - controller
 */
function MainCtrl($scope, Authentication) {

	// This provides Authentication context.
	$scope.authentication = Authentication;

    $scope.userName = 'Example user';
    $scope.helloText = 'Welcome in SeedProject, this is a test';
    $scope.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

};

/**
 * Module - Core
 * HeaderController - controller
 */
function HeaderController($scope, Authentication, Menus) {

    $scope.authentication = Authentication;
	$scope.isCollapsed = false;
	$scope.menu = Menus.getMenu('topbar');

	$scope.toggleCollapsibleMenu = function() {
		$scope.isCollapsed = !$scope.isCollapsed;
	};

	// Collapsing the menu after navigation
	$scope.$on('$stateChangeSuccess', function() {
		$scope.isCollapsed = false;
	});
};

/**
 * Module - Users
 * AuthenticationController - controller
 */
function AuthenticationController($scope, $http, $location, Authentication) {
	$scope.authentication = Authentication;

	// If user is signed in then redirect back home
	if ($scope.authentication.user) $location.path('/');

	$scope.signup = function() {
		$http.post('/auth/signup', $scope.credentials).success(function(response) {
			// If successful we assign the response to the global user model
			$scope.authentication.user = response;

			// And redirect to the index page
			$location.path('/');
		}).error(function(response) {
			$scope.error = response.message;
		});
	};

	$scope.signin = function() {
		$http.post('/auth/signin', $scope.credentials).success(function(response) {
			// If successful we assign the response to the global user model
			$scope.authentication.user = response;

			// And redirect to the index page
			$location.path('/');
		}).error(function(response) {
			$scope.error = response.message;
		});
	};
};

angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('HeaderController', HeaderController)
    .controller('AuthenticationController', AuthenticationController);

