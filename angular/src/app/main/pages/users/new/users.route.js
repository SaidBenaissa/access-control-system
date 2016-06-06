/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.users.new')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('app.main.pages.users.new', {
                url: '/new',
                templateUrl: 'app/main/pages/users/new/wizard.html',
                title: 'Add New User',
                controller: 'WizardCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 100,
                },
            });
    }

})();
