/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/index/main");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Example view' }
        })

        //USER MODULE - ROUTES
        // .state('profile', {
        //     url: '/settings/profile',
        //     templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
        // })
        // .state('password', {
        //     url: '/settings/password',
        //     templateUrl: 'modules/users/views/settings/change-password.client.view.html'
        // })
        // .state('accounts', {
        //     url: '/settings/accounts',
        //     templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
        // })
        .state('index.signup', {
            url: "/signup",
            templateUrl: 'views/signup.html'
        })
        .state('index.signin', {
            url: "/signin",
            templateUrl: 'views/signin.html'
        })
        // .state('forgot', {
        //     url: '/password/forgot',
        //     templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
        // })
        // .state('reset-invalid', {
        //     url: '/password/reset/invalid',
        //     templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
        // })
        // .state('reset-success', {
        //     url: '/password/reset/success',
        //     templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
        // })
        // .state('reset', {
        //     url: '/password/reset/:token',
        //     templateUrl: 'modules/users/views/password/reset-password.client.view.html'
        // })
        ;

        //USER MODULE - CONFIG
        // Set the httpProvider "not authorized" interceptor
        $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
            function($q, $location, Authentication) {
                return {
                    responseError: function(rejection) {
                        switch (rejection.status) {
                            case 401:
                                // Deauthenticate the global user
                                Authentication.user = null;

                                // Redirect to signin page
                                $location.path('signin');
                                break;
                            case 403:
                                // Add unauthorized behaviour 
                                break;
                        }

                        return $q.reject(rejection);
                    }
                };
            }
        ]);
}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
