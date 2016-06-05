/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.main.pages.users')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('app.main.pages.users', {
                url: '/users',
                abstract: true,
                title: 'Users',
                template: '<ui-view></ui-view>',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 200,
                },
            });
    }

})();
