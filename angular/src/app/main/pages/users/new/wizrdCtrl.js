(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.users.new')
        .controller('WizardCtrl1', WizardCtrl1);

    /** @ngInject */
    function WizardCtrl1(socket, $log, $http, apiBase) {
        var vm = this;

        vm.personalInfo = {};
        vm.cardInfo = {};

        vm.save = function () {
            $log.debug("Saving user");
            $http({
                url: apiBase + 'users/register',
                method: "POST",
                data: {
                    personalInfo: vm.personalInfo,
                    cardInfo: vm.cardInfo
                }
            }).then(function (data) {
                $log.debug(data);
            });
        };

        socket.on('card', function (data) {
            vm.cardInfo.chipId = data.card;
        });

    }

})();

