(function () {
    'use strict';

    angular
        .module('BlurAdmin.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($auth, $state, $rootScope) {
        var vm = this;

        vm.credentials = {};

        vm.login = login;

        function login() {
            $auth.login(vm.credentials).then(function (data) {
                $rootScope.user = data.data;
                $state.go('app.main.pages.dashboard', {}, {reload: true});
            });
        }
    }
})();