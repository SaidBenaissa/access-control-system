(function () {
    'use strict';

    angular
        .module('AccessControlSystem.main')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('app.main.pages', {
                url: '',
                templateUrl: 'app/main/pages/pages.html',
            });
    }

})();