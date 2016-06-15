/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.tables')
        .controller('SocketsPermCtrl', SocketsPermCtrl);

    /** @ngInject */
    function SocketsPermCtrl($http, $log, apiBase) {
        var vm = this;

        vm.users = [{
            name: "Usr1",
            dev1: 1,
            dev2: 0,
            dev3: 1,
            dev4: 1,
            dev5: 1,
            dev6: 1,
        },
        {
            name: "Usr2",
            dev1: 0,
            dev2: 1,
            dev3: 1,
            dev4: 0,
            dev5: 1,
            dev6: 1,
        },
        {
            name: "Usr3",
            dev1: 1,
            dev2: 0,
            dev3: 1,
            dev4: 0,
            dev5: 0,
            dev6: 0,
        },];

        vm.sockets = [{
            id: "0",
            name: "Dev0",
            activeUser: "Usr0",
            color: "0",
            state: true
        }, {
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
                switch: socket.state ? "1" : "0",
                deviceId: socket.id
            }).then(function (data) {
                $log.debug(data);
            });
        }
    }

})();
