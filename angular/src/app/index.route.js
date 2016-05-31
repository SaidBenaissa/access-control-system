(function () {
  'use strict';

  angular
    .module('angular')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '',
        abstract:true,
        template: '<div ui-view></div>'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
