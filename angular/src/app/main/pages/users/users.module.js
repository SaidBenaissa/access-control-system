/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.main.pages.users', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('app.main.pages.users', {
                url: '/users',
                templateUrl: 'app/main/pages/users/table/tables.html',
                title: 'Users',
                controller: 'UsersPageCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 100,
                },
            });
    }

})();
