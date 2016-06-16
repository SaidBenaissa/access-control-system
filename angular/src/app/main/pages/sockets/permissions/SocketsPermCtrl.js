/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.sockets.permissions')
        .controller('SocketsPermCtrl', SocketsPermCtrl);

    /** @ngInject */
    function SocketsPermCtrl($http, $log, apiBase) {
        var vm = this;

        $http.get(apiBase + 'users/permissions').success(function (data) {
            $log.debug(data);
            vm.users = data;
        });

        vm.update=function (user) {
            $log.debug(user);
            $http.post(apiBase + 'users/update', user);
        }
    }

})();
