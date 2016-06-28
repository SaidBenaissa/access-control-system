(function () {
  'use strict';

  angular.module('AccessControlSystem.main.pages.sockets')
      .controller('SwitchPanelCtrl', SwitchPanelCtrl);

  /** @ngInject */
  function SwitchPanelCtrl() {
    var vm = this;

    vm.switcherValues = {
      primary: true,
      warning: true,
      danger: true,
      info: true,
      success: true
    };
  }

})();