/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem')
        .run(themeRun);

    /** @ngInject */
    function themeRun($rootScope, $state, baSidebarService, $websocket, $log, WEBSOCKET) {

        $rootScope.$baSidebarService = baSidebarService;
        $rootScope.$on('$routeChangeStart', function (event) {
            checkAuthentification();
        });
        checkAuthentification();

        var dataStream = $websocket(WEBSOCKET.HOST + ':' + WEBSOCKET.PORT);
        dataStream.send(JSON.stringify({action: 'get'}));

        dataStream.onMessage(function (message) {
            $log.debug(message);
        });


        function checkAuthentification() {
            /*if (!$rootScope.user) {
             $state.go('app.login');
             }*/
        }

    }

})();