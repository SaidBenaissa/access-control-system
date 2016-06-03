(function () {
    'use strict';

    angular
        .module('BlurAdmin')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider.state('app', {
            abstract: true,
            url: '',
            template: '<div ui-view></div>'
        });

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }

})();