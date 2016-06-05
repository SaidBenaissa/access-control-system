/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.main.pages.users.all')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('app.main.pages.users.all', {
                url: '/all',
                templateUrl: 'app/main/pages/users/all/tables.html',
                title: 'All Users',
                controller: 'UsersPageCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 200,
                },
            });
    }

})();
