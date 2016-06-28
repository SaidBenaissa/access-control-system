(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.sockets.permissions')
        .controller('SocketsPermCtrl', SocketsPermCtrl);

    /** @ngInject */
    function SocketsPermCtrl($http, $log, apiBase) {
        var vm = this;

        vm.update = update;

        loadData();

        function loadData() {
            $http.get(apiBase + 'users/permissions').success(function (data) {
                $log.debug(data);
                vm.users = data;
            });
        }

        function update(user) {
            $log.debug(user);
            $http.post(apiBase + 'users/update', user);
        }
    }

})();
