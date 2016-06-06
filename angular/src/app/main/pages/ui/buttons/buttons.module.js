/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('AccessControlSystem.main.pages.ui.buttons', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('app.main.pages.ui.buttons', {
          url: '/buttons',
          templateUrl: 'app/main/pages/ui/buttons/buttons.html',
          controller: 'ButtonPageCtrl',
          title: 'Buttons',
          sidebarMeta: {
            order: 100,
          },
        });
  }

})();
