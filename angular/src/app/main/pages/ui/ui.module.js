/**
 * @author k.danovsky
 * created on 12.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.main.pages.ui', [
    'BlurAdmin.main.pages.ui.typography',
    'BlurAdmin.main.pages.ui.buttons',
    'BlurAdmin.main.pages.ui.icons',
    'BlurAdmin.main.pages.ui.modals',
    'BlurAdmin.main.pages.ui.grid',
    'BlurAdmin.main.pages.ui.alerts',
    'BlurAdmin.main.pages.ui.progressBars',
    'BlurAdmin.main.pages.ui.notifications',
    'BlurAdmin.main.pages.ui.tabs',
    'BlurAdmin.main.pages.ui.slider',
    'BlurAdmin.main.pages.ui.panels',
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
