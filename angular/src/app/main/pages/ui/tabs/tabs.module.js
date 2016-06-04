/**
 * @author v.lugovsky
 * created on 21.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.main.pages.ui.tabs', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('app.main.pages.ui.tabs', {
          url: '/tabs',
          templateUrl: 'app/main/pages/ui/tabs/tabs.html',
          title: 'Tabs & Accordions',
          sidebarMeta: {
            order: 800,
          },
        });
  }

})();
