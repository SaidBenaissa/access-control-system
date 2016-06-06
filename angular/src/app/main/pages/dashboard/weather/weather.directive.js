/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('AccessControlSystem.main.pages.dashboard')
      .directive('weather', weather);

  /** @ngInject */
  function weather() {
    return {
      restrict: 'EA',
      controller: 'WeatherCtrl',
      templateUrl: 'app/main/pages/dashboard/weather/weather.html'
    };
  }
})();