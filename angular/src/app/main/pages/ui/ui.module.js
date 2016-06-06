/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('AccessControlSystem.main.pages.ui', [
    'AccessControlSystem.main.pages.ui.typography',
    'AccessControlSystem.main.pages.ui.buttons',
    'AccessControlSystem.main.pages.ui.icons',
    'AccessControlSystem.main.pages.ui.modals',
    'AccessControlSystem.main.pages.ui.grid',
    'AccessControlSystem.main.pages.ui.alerts',
    'AccessControlSystem.main.pages.ui.progressBars',
    'AccessControlSystem.main.pages.ui.notifications',
    'AccessControlSystem.main.pages.ui.tabs',
    'AccessControlSystem.main.pages.ui.slider',
    'AccessControlSystem.main.pages.ui.panels',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('app.main.pages.ui', {
          url: '/ui',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'UI Features',
          sidebarMeta: {
            icon: 'ion-android-laptop',
            order: 200,
          },
        });
  }

})();
