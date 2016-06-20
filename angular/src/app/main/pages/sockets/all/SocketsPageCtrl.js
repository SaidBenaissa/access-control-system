/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.sockets.all')
        .controller('SocketsPageCtrl', SocketsPageCtrl);

    /** @ngInject */
    function SocketsPageCtrl($http, $log, apiBase) {
        var vm = this;

        $http.get(apiBase + 'sockets/').success(function (data) {
            $log.debug(data);
            vm.sockets = data;
        });

        /*[{
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
         }];*/

        vm.changeColor = function (socket) {
            $log.debug(socket);
            $http.post(apiBase + 'sockets/color', {
                color: socket.color.value,
                deviceId: socket.socketId
            }).then(function (data) {
                $log.debug(data);
            });
        };

        vm.switch = function (socket) {
            $log.debug(socket);
            $http.post(apiBase + 'sockets/switch', {
                switch: socket.state ? "1" : "0",
                deviceId: socket.socketId
            }).then(function (data) {
                $log.debug(data);
            });
        }
    }

})();
