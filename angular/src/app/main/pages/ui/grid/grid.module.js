/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('AccessControlSystem.main.pages.ui.grid', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('app.main.pages.ui.grid', {
          url: '/grid',
          templateUrl: 'app/main/pages/ui/grid/grid.html',
          title: 'Grid',
          sidebarMeta: {
            order: 400,
          },
        });
  }

})();
