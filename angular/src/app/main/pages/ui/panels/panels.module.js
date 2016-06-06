/**
 * @author v.lugovsky
 * created on 23.12.2015
 */
(function () {
  'use strict';

  angular.module('AccessControlSystem.main.pages.ui.panels', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('app.main.pages.ui.panels', {
          url: '/panels',
          templateUrl: 'app/main/pages/ui/panels/panels.html',
          controller: 'NotificationsPageCtrl',
          title: 'Panels',
          sidebarMeta: {
            order: 1100,
          },
        });
  }

})();
