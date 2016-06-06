/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.sockets')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('app.main.pages.sockets', {
                url: '/sockets',
                abstract: true,
                title: 'Sockets',
                template: '<ui-view></ui-view>',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 200,
                },
            });
    }

})();
