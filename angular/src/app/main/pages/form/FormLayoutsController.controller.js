(function () {
    'use strict';

    angular
        .module('BlurAdmin.main.pages.form')
        .controller('FormLayoutsController', FormLayoutsController);

    /** @ngInject */
    function FormLayoutsController($log, $http, apiBase) {
        var vm = this;

        vm.obj = {
            socket_id: "ahoj",
            name: "2",
            color: "dddd"
        };

        vm.save = save;

        function save() {
            $http({
                url: apiBase + 'barsco',
                method: "POST",
                data: vm.obj
            }).then(function (data) {
                $log.debug(data);
            })
        }
    }
})();