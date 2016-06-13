/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.sockets.all')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('app.main.pages.sockets.all', {
                url: '/sockets/all',
                templateUrl: 'app/main/pages/sockets/all/tables.html',
                title: 'All Sockets',
                controller: 'SocketsPageCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 300,
                },
            });
    }

})();
