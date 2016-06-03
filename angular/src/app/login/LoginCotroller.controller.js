(function () {
    'use strict';

    angular
        .module('BlurAdmin.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($auth, $state) {
        var vm = this;

        vm.credentials = {};

        vm.login = login;

        function login() {
            $auth.login(vm.credentials).then(function (data) {
                $state.go('app.main.pages.dashboard');
            });
        }
    }
})();