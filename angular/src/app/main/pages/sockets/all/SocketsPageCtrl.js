/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.tables')
        .controller('SocketsPageCtrl', SocketsPageCtrl);

    /** @ngInject */
    function SocketsPageCtrl($http, $log, apiBase) {
        var vm = this;

        vm.colors = [{
            value: 2,
            label: "white"
        }, {
            value: 3,
            label: "red"
        }, {
            value: 4,
            label: "green"
        }, {
            value: 5,
            label: "blue"
        }, {
            value: 6,
            label: "yellow"
        }, {
            value: 7,
            label: "cyan"
        }, {
            value: 8,
            label: "magenta"
        }];

        vm.sockets = [{
            id: "1",
            name: "Dev1",
            activeUser: "Usr1",
            color: "0",
            state: true
        }, {
            id: "2",
            name: "Dev2",
            activeUser: "Usr2",
            color: "1",
            state: false
        }, {
            id: "3",
            name: "Dev3",
            activeUser: "Usr3",
            color: 6,
            state: true
        }];

        vm.changeColor = function (socket) {
            $log.debug(socket);
            $http.post(apiBase + 'sockets/color', {
                color: socket.color.value,
                deviceId: socket.id
            }).then(function (data) {
                $log.debug(data);
            });
        };

        vm.switch = function (socket) {
            $log.debug(socket);
            $http.post(apiBase + 'sockets/switch', {
                color: socket.color.value,
                deviceId: socket.id
            }).then(function (data) {
                $log.debug(data);
            });
        }
    }

})();
