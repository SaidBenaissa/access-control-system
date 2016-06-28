/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.sockets.all')
        .controller('SocketsPageCtrl', SocketsPageCtrl);

    /** @ngInject */
    function SocketsPageCtrl($http, $log, apiBase, socket) {
        var vm = this;


        vm.changeColor = changeColor;

        vm.switch = switchSocket;

        socket.on('sockets', function (data) {
            loadData();
        });

        loadData();

        function changeColor(socket) {
            $log.debug(socket);
            $http.post(apiBase + 'sockets/color', {
                color: socket.color.value,
                deviceId: socket.socket_id
            }).success(function (data) {
                $log.debug(data);
            });
        }

        function switchSocket(socket) {
            $log.debug(socket);
            $http.post(apiBase + 'sockets/switch', {
                switch: socket.active ? "1" : "0",
                deviceId: socket.socket_id
            }).success(function (data) {
                $log.debug(data);
            });
        }

        function loadData() {
            $http.get(apiBase + 'sockets/').success(function (data) {
                $log.debug(data);
                vm.sockets = data;
            });
        }
    }

})();
