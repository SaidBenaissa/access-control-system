/**
 * @author k.danovsky
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('AccessControlSystem.main.pages.components', [
    'AccessControlSystem.main.pages.components.mail',
    'AccessControlSystem.main.pages.components.timeline',
    'AccessControlSystem.main.pages.components.tree',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('app.main.pages.components', {
          url: '/components',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Components',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 800,
          },
        });
  }

})();
