/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('AccessControlSystem.main.pages.ui.icons', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('app.main.pages.ui.icons', {
          url: '/icons',
          templateUrl: 'app/main/pages/ui/icons/icons.html',
          controller: 'IconsPageCtrl',
          title: 'Icons',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
