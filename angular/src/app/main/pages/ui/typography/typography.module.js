/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('AccessControlSystem.main.pages.ui.typography', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('app.main.pages.ui.typography', {
          url: '/typography',
          templateUrl: 'app/main/pages/ui/typography/typography.html',
          title: 'Typography',
          sidebarMeta: {
            order: 0,
          },
        });
  }

})();
