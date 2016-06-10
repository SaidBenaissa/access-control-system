(function () {
    'use strict';

    angular.module('AccessControlSystem.factories', [
        'btford.socket-io'
    ])
        .factory('socket', SocketFactory);

    /** @ngInject */
    function SocketFactory(socketFactory, WEBSOCKET, io) {
        return socketFactory({
            ioSocket: io.connect(WEBSOCKET.HOST)
        });
    }
})();
