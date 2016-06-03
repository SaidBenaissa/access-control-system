(function () {
    'use strict';

    angular
        .module('BlurAdmin.main')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('app.main', {
                abstract: true,
                url: '',
                template: '<div ui-view></div>'
            });
    }

})();