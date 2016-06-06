/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('AccessControlSystem.main.pages.profile', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('app.main.pages.profile', {
          url: '/profile',
          title: 'Profile',
          templateUrl: 'app/main/pages/profile/profile.html',
          controller: 'ProfilePageCtrl',
        });
  }

})();
