/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.main.pages.ui.alerts', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('app.main.pages.ui.alerts', {
          url: '/alerts',
          templateUrl: 'app/main/pages/ui/alerts/alerts.html',
          title: 'Alerts',
          sidebarMeta: {
            order: 500,
          },
        });
  }

})();
