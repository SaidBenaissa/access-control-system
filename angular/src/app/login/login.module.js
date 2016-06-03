/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.login', [
        'ui.router',
        'oc.lazyLoad',
        'satellizer'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('app.login', {
                url: '/login',
                templateUrl: 'app/login/auth.html',
                title: 'Login',
                controller: 'LoginController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            files: [
                                'app/auth.css'
                            ]
                        }]);
                    }]
                }
            });
    }

})();
