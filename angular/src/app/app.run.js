/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem')
        .run(themeRun);

    /** @ngInject */
    function themeRun($rootScope, baSidebarService, socket) {

        $rootScope.$baSidebarService = baSidebarService;
        $rootScope.$on('$routeChangeStart', function (event) {
            checkAuthentification();
        });
        checkAuthentification();

        socket.on('card', function (data) {
            console.log(data);
        });

        function checkAuthentification() {
            /*if (!$rootScope.user) {
             $state.go('app.login');
             }*/
        }

    }

})();