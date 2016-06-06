/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('AccessControlSystem.main.pages.dashboard')
      .directive('dashboardTodo', dashboardTodo);

  /** @ngInject */
  function dashboardTodo() {
    return {
      restrict: 'EA',
      controller: 'DashboardTodoCtrl',
      templateUrl: 'app/main/pages/dashboard/dashboardTodo/dashboardTodo.html'
    };
  }
})();