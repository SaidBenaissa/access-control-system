(function () {
    'use strict';

    angular.module('AccessControlSystem.main.pages.users.new')
        .controller('WizardCtrl1', WizardCtrl1);

    /** @ngInject */
    function WizardCtrl1($scope, $log, $http, apiBase) {
        var vm = this;

        vm.personalInfo = {};
        vm.productInfo = {};

        vm.save = function () {
            console.log('som v callbacku');
            $http({
                url: apiBase + 'barsco',
                method: "POST",
                data: {
                    personalInfo: vm.personalInfo,
                    productInfo: vm.productInfo
                }
            }).then(function (data) {
                $log.debug(data);
            })
        }

    }

})();

