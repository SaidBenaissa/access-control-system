(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.users.new')
        .controller('WizardCtrl1', WizardCtrl1);

    /** @ngInject */
    function WizardCtrl1($scope, $log, $http, apiBase) {
        var vm = this;

        vm.personalInfo = {};
        vm.cardInfo = {};

        vm.save = function () {
            console.log('som v callbacku');
            $http({
                url: apiBase + 'users/register',
                method: "POST",
                data: {
                    personalInfo: vm.personalInfo,
                    cardInfo: vm.cardInfo
                }
            }).then(function (data) {
                $log.debug(data);
            })
        }

    }

})();

