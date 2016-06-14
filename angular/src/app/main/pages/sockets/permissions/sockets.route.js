/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.sockets.permissions')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('app.main.pages.sockets.permissions', {
                url: '/sockets/permissions',
                templateUrl: 'app/main/pages/sockets/permissions/tables.html',
                title: 'Permissions',
                controller: 'SocketsPermCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 300,
                },
            });
    }

})();
