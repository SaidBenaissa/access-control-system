/**
 * @author a.demeshko
 * created on 12.21.2015
 */
(function () {
  'use strict';

  angular.module('AccessControlSystem.main.pages.components.tree', [])
    .config(routeConfig)
    .config(function(){
      $.jstree.defaults.core.themes.url = true;
      $.jstree.defaults.core.themes.dir = "assets/img/theme/vendor/jstree/dist/themes";
    });

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('app.main.pages.components.tree', {
          url: '/tree',
          templateUrl: 'app/main/pages/components/tree/tree.html',
          title: 'Tree View',
          sidebarMeta: {
            order: 200,
          },
        });
  }

})();
