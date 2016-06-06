(function () {
    'use strict';

    angular
        .module('AccessControlSystem')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            url: '',
            template: '<ui-view></ui-view>',
        });
    }

})();