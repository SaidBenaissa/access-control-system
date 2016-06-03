/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin')
        .run(themeRun);

    /** @ngInject */
    function themeRun($rootScope, $state, baSidebarService) {

        $rootScope.$baSidebarService = baSidebarService;
        $rootScope.$on('$routeChangeStart', function (event) {
            checkAuthentification();
        });
        checkAuthentification();

        function checkAuthentification() {
            if (!$rootScope.user) {
                $state.go('app.login');
            }
        }

    }

})();