/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.tables')
        .controller('SocketsPageCtrl', SocketsPageCtrl);

    /** @ngInject */
    function SocketsPageCtrl($filter, editableOptions, editableThemes) {
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

        vm.test = function (socket) {
            console.log(socket);
        }
    }

})();
