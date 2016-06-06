/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.sockets.new')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('app.main.pages.sockets.new', {
                url: '/new',
                templateUrl: 'app/main/pages/sockets/new/wizard.html',
                title: 'Add New Socket',
                controller: 'WizardCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 100,
                },
            });
    }

})();
