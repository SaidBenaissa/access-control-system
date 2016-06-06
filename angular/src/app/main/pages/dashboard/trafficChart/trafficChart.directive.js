/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('AccessControlSystem.main.pages.dashboard')
      .directive('trafficChart', trafficChart);

  /** @ngInject */
  function trafficChart() {
    return {
      restrict: 'E',
      controller: 'TrafficChartCtrl',
      templateUrl: 'app/main/pages/dashboard/trafficChart/trafficChart.html'
    };
  }
})();