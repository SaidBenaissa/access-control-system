/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('AccessControlSystem.main.pages.dashboard')
      .directive('popularApp', popularApp);

  /** @ngInject */
  function popularApp() {
    return {
      restrict: 'E',
      templateUrl: 'app/main/pages/dashboard/popularApp/popularApp.html'
    };
  }
})();